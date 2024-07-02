import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Footer from './Footer.svelte';

describe('Behaviour', () => {
	test('should render', async () => {
		render(Footer);

		const footer = document.querySelector('footer');
		expect(footer).toBeInTheDocument();
	});
});
