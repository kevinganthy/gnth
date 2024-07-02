import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Rate from './Rate.svelte';

describe('Environnement variables', () => {
	test('VITE_HOURLY_RATE must be defined', () => {
		const value = import.meta.env.VITE_HOURLY_RATE;
		expect(value).toBeDefined();
	});

	test('VITE_HOURLY_RATE must be greater than 0', () => {
		const value = import.meta.env.VITE_HOURLY_RATE ?? 0;
		expect(Number(value)).toBeGreaterThan(0);
	});
});

describe('Behaviour', () => {
	afterEach(() => {
		cleanup();
	});

	test('If 1 hours, the total must be equal to "the_hourly_rate €"', () => {
		const hourlyRate = import.meta.env.VITE_HOURLY_RATE ?? 0;
		const text = `${hourlyRate} €`;

		render(Rate, { hours: 1, title: 'Total' });

		expect(document.querySelector('article strong')).toHaveTextContent(text);
	});

	test('If 1 hours, the component must have "(soit 1 heure)"', () => {
		render(Rate, { hours: 1, title: 'Total' });

		expect(document.querySelector('article small')).toHaveTextContent('(soit 1 heure)');
	});

	test('If 2 hours, the total must be equal to "the_hourly_rate x 2 €"', () => {
		const hourlyRate = import.meta.env.VITE_HOURLY_RATE ?? 0;
		const text = `${hourlyRate * 2} €`;

		render(Rate, { hours: 2, title: 'Total' });

		expect(document.querySelector('article strong')).toHaveTextContent(text);
	});

	test('If 2 hours, the component must have "(soit 2 heures)"', () => {
		render(Rate, { hours: 2, title: 'Total' });

		expect(document.querySelector('article small')).toHaveTextContent('(soit 2 heures)');
	});

	test('If main rate, the component must not have h3 with title', () => {
		render(Rate, { hours: 2, title: 'Total', mainRate: true });

		expect(document.querySelector('article h3')).toBeNull();
	});

	test('If main rate and asterisk, the component must have small with asterisk', () => {
		render(Rate, { hours: 2, title: 'Total', mainRate: true, asterisk: 'test' });

		expect(document.querySelector('article > small')).toHaveTextContent('test');
	});

	test('If is option, the rate must begin with "+ "', () => {
		render(Rate, { hours: 2, title: 'Total', isOption: true });

		expect(document.querySelector('article strong')).toHaveTextContent('+ ');
	});
});
