import { act, render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Animate from './Animate.test.svelte';

describe('Behaviour', () => {
	test('should render', () => {
		render(Animate);

		const container = document.querySelector('.animated');
		expect(container).toBeInTheDocument();
	});

	test('first child should have class activ', () => {
		render(Animate);

		const container = document.querySelector('.animated') as HTMLElement;
		expect(container.children[0]).toHaveClass('activ');
	});

	test('second child should not have class activ', () => {
		render(Animate);

		const container = document.querySelector('.animated') as HTMLElement;
		expect(container.children[1]).not.toHaveClass('activ');
	});

	test('if next called, second child should have class activ', () => {
		const { component } = render(Animate);

		setTimeout(async () => {
			await act(() => {
				component.next();
			});

			const container = document.querySelector('.animated') as HTMLElement;
			expect(container.children[1]).toHaveClass('activ');
		}, 1000);
	});
});
