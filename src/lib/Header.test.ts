import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Header from './Header.svelte';
import { actualSection } from './store';

describe('Behaviour', () => {
	test('should render', async () => {
		render(Header);

		const header = document.querySelector('header');
		expect(header).toBeInTheDocument();
	});

	test('should render with the first link active by default', async () => {
		render(Header);

		const a = document.querySelector('nav li:nth-child(1) a') as HTMLAnchorElement;
		actualSection.set(a.dataset?.id ?? '');

		expect(a).toHaveClass(/activ/);
	});

	test('should update active link on section change', async () => {
		render(Header);

		const a = document.querySelector('nav li:nth-child(3) a') as HTMLAnchorElement;
		actualSection.set(a.dataset?.id ?? '');

		expect(a).toHaveClass(/activ/);
	});
});
