import { describe, expect, test } from 'vitest';
import { serializeSchema } from './index';

describe('serializeSchema', () => {
	test('should serialize a Schema object into a JSON-LD script tag', () => {
		const schema = {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'John Doe',
			descritpion: 'An example person',
			url: 'https://example.com/johndoe'
		};

		const expectedOutput = `<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "descritpion": "An example person",
  "url": "https://example.com/johndoe"
}</script>`;

		expect(serializeSchema(schema)).toEqual(expectedOutput);
	});
});
