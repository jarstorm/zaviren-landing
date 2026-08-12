export interface Post {
	href: string;
	title: string;
	excerpt: string;
	date: string;
	dateLabel: string;
	readingTime: string;
	tag: string;
}

export const postsEs: Post[] = [
	{
		href: "/blog/ia-privada-vs-chatgpt",
		title: "IA privada vs ChatGPT: comparativa honesta",
		excerpt:
			"Ocho criterios cara a cara, incluidas las desventajas de montar la IA en tu propio servidor. Tres los gana la nube, cuatro la IA privada, uno queda en empate.",
		date: "2026-08-11",
		dateLabel: "11 ago 2026",
		readingTime: "7 min",
		tag: "Comparativa",
	},
	{
		href: "/blog/ia-privada-ingenieria-arquitectura",
		title: "IA privada para consultoras de ingeniería y arquitectura",
		excerpt:
			"Memorias técnicas que se reescriben desde cero, licitaciones contrarreloj y NDAs de cliente que prohíben mover la documentación fuera del estudio.",
		date: "2026-08-04",
		dateLabel: "4 ago 2026",
		readingTime: "6 min",
		tag: "Sector",
	},
	{
		href: "/blog/puede-empresa-usar-ia-sin-nube",
		title: "¿Puede una empresa usar IA sin enviar datos a la nube?",
		excerpt:
			"Sí: con un servidor propio y RAG local puedes dar IA a tu equipo sin que un solo documento salga de tu red. Qué hace falta y cómo funciona.",
		date: "2026-07-15",
		dateLabel: "15 jul 2026",
		readingTime: "5 min",
		tag: "Guía",
	},
	{
		href: "/blog/ia-privada-inmobiliarias-administracion-fincas",
		title: "IA privada para inmobiliarias y administración de fincas",
		excerpt:
			"Actas de junta que nadie encuentra, propietarios preguntando lo mismo cada semana y cientos de contratos de arrendamiento sin indexar.",
		date: "2026-06-24",
		dateLabel: "24 jun 2026",
		readingTime: "6 min",
		tag: "Sector",
	},
	{
		href: "/blog/ia-privada-clinicas",
		title: "IA privada para clínicas médicas y dentales",
		excerpt:
			"Protocolos que nadie encuentra, recepción saturada de preguntas repetidas y rotación constante de personal, sin sacar ni un dato de salud a la nube.",
		date: "2026-06-10",
		dateLabel: "10 jun 2026",
		readingTime: "6 min",
		tag: "Sector",
	},
	{
		href: "/blog/ia-privada-gestorias-asesorias",
		title: "IA privada para gestorías y asesorías fiscales",
		excerpt:
			"Consultas repetidas de clientes, criterios internos que solo conocen dos personas y campañas que colapsan el despacho entero.",
		date: "2026-05-27",
		dateLabel: "27 may 2026",
		readingTime: "6 min",
		tag: "Sector",
	},
	{
		href: "/blog/ia-privada-despachos-abogados",
		title: "IA privada para despachos de abogados",
		excerpt:
			"Buscar en el fondo documental, rehacer escritos que ya existen y responder las mismas consultas internas, sin que un expediente salga de la red.",
		date: "2026-05-13",
		dateLabel: "13 may 2026",
		readingTime: "6 min",
		tag: "Sector",
	},
];

export const postsEn: Post[] = [
	{
		href: "/en/blog/private-ai-vs-chatgpt",
		title: "Private AI vs ChatGPT: an honest comparison",
		excerpt:
			"Eight criteria head to head, including the downsides of running AI on your own server. The cloud wins three, private AI wins four, one is a tie.",
		date: "2026-08-11",
		dateLabel: "11 Aug 2026",
		readingTime: "7 min",
		tag: "Comparison",
	},
	{
		href: "/en/blog/private-ai-engineering-architecture-firms",
		title: "Private AI for engineering and architecture firms",
		excerpt:
			"Technical reports rewritten from scratch, tenders against the clock, and client NDAs that forbid moving documentation out of the practice.",
		date: "2026-08-04",
		dateLabel: "4 Aug 2026",
		readingTime: "6 min",
		tag: "Industry",
	},
	{
		href: "/en/blog/can-a-company-use-ai-without-sending-data-to-the-cloud",
		title: "Can a company use AI without sending data to the cloud?",
		excerpt:
			"Yes: with your own server and local RAG you can give your team AI without a single document leaving your network. What it takes and how it works.",
		date: "2026-07-15",
		dateLabel: "15 Jul 2026",
		readingTime: "5 min",
		tag: "Guide",
	},
	{
		href: "/en/blog/private-ai-real-estate-property-management",
		title: "Private AI for real estate and property management",
		excerpt:
			"Meeting minutes nobody can find, owners asking the same thing every week, and hundreds of unindexed lease agreements.",
		date: "2026-06-24",
		dateLabel: "24 Jun 2026",
		readingTime: "6 min",
		tag: "Industry",
	},
	{
		href: "/en/blog/private-ai-medical-dental-clinics",
		title: "Private AI for medical and dental clinics",
		excerpt:
			"Protocols nobody can find, a front desk drowning in repeat questions, and constant staff turnover, with no health data going to the cloud.",
		date: "2026-06-10",
		dateLabel: "10 Jun 2026",
		readingTime: "6 min",
		tag: "Industry",
	},
	{
		href: "/en/blog/private-ai-accounting-firms",
		title: "Private AI for accounting and tax firms",
		excerpt:
			"Repeated client questions, internal know-how held by two people, and filing seasons that block the whole practice.",
		date: "2026-05-27",
		dateLabel: "27 May 2026",
		readingTime: "6 min",
		tag: "Industry",
	},
	{
		href: "/en/blog/private-ai-law-firms",
		title: "Private AI for law firms",
		excerpt:
			"Searching the archive, rewriting filings that already exist and answering the same internal questions, without a case file leaving the network.",
		date: "2026-05-13",
		dateLabel: "13 May 2026",
		readingTime: "6 min",
		tag: "Industry",
	},
];
