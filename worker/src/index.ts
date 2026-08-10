export interface Env {
	BREVO_API_KEY: string;
	BREVO_LIST_ID: string;
	ALLOWED_ORIGINS: string;
}

interface ContactPayload {
	nombre?: string;
	apellidos?: string;
	empresa?: string;
	email?: string;
	locale?: "ES" | "EN";
	wantsGuide?: boolean;
	consent?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string | null, env: Env): HeadersInit {
	const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
	const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0];
	return {
		"Access-Control-Allow-Origin": allowOrigin,
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	};
}

function json(data: unknown, status: number, headers: HeadersInit): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { ...headers, "Content-Type": "application/json" },
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = request.headers.get("Origin");
		const headers = corsHeaders(origin, env);
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers });
		}

		if (url.pathname !== "/contact" || request.method !== "POST") {
			return json({ ok: false, error: "not_found" }, 404, headers);
		}

		let body: ContactPayload;
		try {
			body = await request.json();
		} catch {
			return json({ ok: false, error: "invalid_json" }, 400, headers);
		}

		const nombre = (body.nombre ?? "").trim();
		const apellidos = (body.apellidos ?? "").trim();
		const empresa = (body.empresa ?? "").trim();
		const email = (body.email ?? "").trim();
		const locale = body.locale === "EN" ? "EN" : body.locale === "ES" ? "ES" : null;

		if (!nombre || !apellidos || !empresa || !email || !locale || !body.consent) {
			return json({ ok: false, error: "missing_fields" }, 400, headers);
		}
		if (!EMAIL_RE.test(email)) {
			return json({ ok: false, error: "invalid_email" }, 400, headers);
		}

		const brevoHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
			"api-key": env.BREVO_API_KEY,
		};

		const attributes: Record<string, string | boolean> = {
			FIRSTNAME: nombre,
			LASTNAME: apellidos,
			EMAIL_LANGUAGE: locale,
		};
		// Only set on guide-page submissions, never on regular contact
		// submissions — lets Brevo segment "wants the guide" vs not.
		if (body.wantsGuide === true) {
			attributes.WANTS_GUIDE = true;
		}

		const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
			method: "POST",
			headers: brevoHeaders,
			body: JSON.stringify({
				email,
				attributes,
				listIds: [Number(env.BREVO_LIST_ID)],
				updateEnabled: true,
			}),
		});

		if (!contactRes.ok) {
			const detail = await contactRes.text();
			console.error("Brevo contact create error", contactRes.status, detail);
			return json({ ok: false, error: "brevo_error" }, 502, headers);
		}

		// New contact: 201 with {id}. Existing contact (updateEnabled): 204, no body — look it up.
		let contactId: number | null = null;
		if (contactRes.status === 201) {
			const created = (await contactRes.json()) as { id?: number };
			contactId = created.id ?? null;
		}
		if (contactId === null) {
			const lookupRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
				headers: brevoHeaders,
			});
			if (lookupRes.ok) {
				const found = (await lookupRes.json()) as { id?: number };
				contactId = found.id ?? null;
			}
		}

		if (contactId === null) {
			console.error("Could not resolve Brevo contact id for", email);
			return json({ ok: false, error: "brevo_error" }, 502, headers);
		}

		const companyRes = await fetch("https://api.brevo.com/v3/companies", {
			method: "POST",
			headers: brevoHeaders,
			body: JSON.stringify({
				name: empresa,
				linkedContactsIds: [contactId],
			}),
		});

		if (!companyRes.ok) {
			const detail = await companyRes.text();
			console.error("Brevo company create error", companyRes.status, detail);
			return json({ ok: false, error: "brevo_error" }, 502, headers);
		}

		return json({ ok: true }, 200, headers);
	},
} satisfies ExportedHandler<Env>;
