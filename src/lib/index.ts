interface Schema {
	'@context': string;
	'@type': string;
	name: string;
	descritpion: string;
	url: string;
}

export const serializeSchema = (schema: Schema) => {
	return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
};
