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
		href: "/blog/puede-empresa-usar-ia-sin-nube",
		title: "¿Puede una empresa usar IA sin enviar datos a la nube?",
		excerpt:
			"Sí: con un servidor propio y RAG local puedes dar IA a tu equipo sin que un solo documento salga de tu red. Qué hace falta y cómo funciona.",
		date: "2026-07-15",
		dateLabel: "15 jul 2026",
		readingTime: "5 min",
		tag: "Guía",
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
		href: "/en/blog/can-a-company-use-ai-without-sending-data-to-the-cloud",
		title: "Can a company use AI without sending data to the cloud?",
		excerpt:
			"Yes: with your own server and local RAG you can give your team AI without a single document leaving your network. What it takes and how it works.",
		date: "2026-07-15",
		dateLabel: "15 Jul 2026",
		readingTime: "5 min",
		tag: "Guide",
	},
];
