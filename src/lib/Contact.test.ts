import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { toBeContacted } from '$lib/store';

import Contact from './Contact.svelte';

describe('Environnement variables', () => {
	test('VITE_SERVICE_ID must be defined', () => {
		const value = import.meta.env.VITE_SERVICE_ID;
		expect(value).toBeDefined();
	});

	test('VITE_TEMPLATE_ID must be defined', () => {
		const value = import.meta.env.VITE_TEMPLATE_ID;
		expect(value).toBeDefined();
	});

	test('VITE_USER_ID must be defined', () => {
		const value = import.meta.env.VITE_USER_ID;
		expect(value).toBeDefined();
	});
});

describe('Behaviour', () => {
	afterEach(() => {
		cleanup();
	});

	test('If toBeContacted is false, document must not have #comp-contact', () => {
		toBeContacted.set(false);
		render(Contact);

		expect(document.querySelector('#comp-contact')).toBeNull();
	});

	test('If toBeContacted is true, document must have #comp-contact', () => {
		toBeContacted.set(true);
		render(Contact);

		expect(document.querySelector('#comp-contact')).not.toBeNull();
	});

	test('If email and phone empty, the button must be disabled', async () => {
		toBeContacted.set(true);
		render(Contact);

		const button = document.querySelector('button[type="submit"]');
		expect(button).toBeDisabled();
	});

	test('If email or phone filled, the button must be enabled', async () => {
		toBeContacted.set(true);
		render(Contact, { email: 'test@test.fr' });

		const button = document.querySelector('button[type="submit"]');
		expect(button).not.toBeDisabled();
	});

	test('If formstatus is null, document must have a form', () => {
		toBeContacted.set(true);
		render(Contact, { formStatus: null });

		expect(document.querySelector('form')).not.toBeNull();
	});

	test('If formstatus is "success", document must have a success message', () => {
		toBeContacted.set(true);
		render(Contact, { formStatus: 'success' });

		expect(document.querySelector('.form-status--success')).not.toBeNull();
	});

	test('If formstatus is "error", document must have a error message', () => {
		toBeContacted.set(true);
		render(Contact, { formStatus: 'error' });

		expect(document.querySelector('.form-status--error')).not.toBeNull();
	});

	test('If formstatus is "sending", document must have a sending message', () => {
		toBeContacted.set(true);
		render(Contact, { formStatus: 'sending' });

		expect(document.querySelector('.form-status--sending')).not.toBeNull();
	});
});
