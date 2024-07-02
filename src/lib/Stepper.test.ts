import { act, cleanup, fireEvent, render } from '@testing-library/svelte';
import { afterEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Stepper from './Stepper.svelte';

describe('Behaviour', () => {
	afterEach(() => {
		cleanup();
	});

	test('Stepper must have 2 steps minimun', () => {
		render(Stepper);
		expect(document.querySelectorAll('.step').length).toBeGreaterThanOrEqual(2);
	});

	test('The first step must have class activ', () => {
		render(Stepper);
		expect(document.querySelector('.step:first-child')).toHaveClass(/activ/);
	});

	test('The second step must not have class activ', () => {
		render(Stepper);
		expect(document.querySelector('.step:nth-child(2)')).not.toHaveClass(/activ/);
	});

	test('If click on the second step, it must have class activ', async () => {
		render(Stepper);

		const button = document.querySelector('.step:nth-child(2) button');
		if (button) {
			fireEvent.click(button);
		}

		const step = document.querySelector('.step:nth-child(2)');
		expect(step).toHaveClass(/activ/);
	});

	test('If next called, the second step must have class activ', async () => {
		const { component } = render(Stepper);

		await act(() => {
			component.next();
		});

		const step = document.querySelector('.step:nth-child(2)');
		expect(step).toHaveClass(/activ/);
	});
});
