<script lang="ts">
	import { toBeContacted } from '$lib/store';
	import { onMount } from 'svelte';

	export const FORM_STATUS_SENDING = 'sending';
	export const FORM_STATUS_SUCCESS = 'success';
	export const FORM_STATUS_ERROR = 'error';

	export let formStatus: null | string = null;
	export let email = '';
	export let phone = '';

	const onCancel = () => {
		toBeContacted.set(false);
		formStatus = null;
	};

	const onFormSubmit = async (event: Event) => {
		event.preventDefault();
		formStatus = FORM_STATUS_SENDING;

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const data = {
			service_id: import.meta.env.VITE_SERVICE_ID as string,
			template_id: import.meta.env.VITE_TEMPLATE_ID as string,
			user_id: import.meta.env.VITE_USER_ID as string,
			template_params: {
				email: formData.get('email') as string,
				phone: formData.get('phone') as string
			}
		};

		try {
			if (formData.get('civility') != '0' || (!formData.get('email') && !formData.get('phone')))
				throw new Error('Invalid form data.');

			const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			formStatus = response.ok ? FORM_STATUS_SUCCESS : FORM_STATUS_ERROR;
		} catch (error) {
			formStatus = FORM_STATUS_ERROR;
		}
	};

	onMount(() => {
		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') onCancel();
		});
	});
</script>

{#if $toBeContacted}
	<section id="comp-contact" aria-label="Etre recontacté">
		<div>
			<button class="close" on:click={onCancel}>Annuler</button>

			<hr />
			<p>Laissez-nous vos coordonnées pour que nous vous contactions rapidement.</p>

			{#if formStatus === null}
				<form on:submit={onFormSubmit}>
					<div>
						<label for="civility">Civilité</label>
						<select id="civility" name="civility">
							<option value="0">--</option>
							<option value="M">Monsieur</option>
							<option value="Mme">Madame</option>
						</select>
					</div>

					<label for="email">Email</label>
					<input
						bind:value={email}
						type="email"
						id="email"
						name="email"
						placeholder="Adresse email"
					/>

					<label for="phone">Téléphone</label>
					<input
						bind:value={phone}
						type="tel"
						id="phone"
						name="phone"
						placeholder="Numéro de téléphone"
					/>

					<button disabled={email === '' && phone === ''} type="submit">Envoyer</button>
				</form>
			{:else if formStatus === FORM_STATUS_SENDING}
				<div class="form-status--sending">
					<p>Votre demande est en cours d'envoi...</p>
				</div>
			{:else if formStatus === FORM_STATUS_SUCCESS}
				<div class="form-status--success">
					<p>
						✅ Votre demande a bien été envoyée. Nous vous recontacterons dans les plus brefs délais.
					</p>
					<button class="close" on:click={onCancel}>Fermer</button>
				</div>
			{:else if formStatus === FORM_STATUS_ERROR}
				<div class="form-status--error">
					<p>❌ Une erreur est survenue. Merci de réessayer ultérieurement.</p>
				</div>
			{/if}

			<hr />

			<p>
				Vous pouvez également nous contacter par téléphone au <a href="tel:+33668285197"
					>06 68 28 51 97</a
				>
				ou par email à <a href="mailto:kevin.ganthy@gmail.com">kevin.ganthy@gmail.com</a>
			</p>
		</div>
	</section>
{/if}

<style lang="scss">
	@use '@styles/vars';
	@use '@styles/mixins';
	@use 'sass:math';

	section {
		z-index: 3;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100dvh;
		background: vars.$color-bg-backdrop;
		display: flex;
		justify-content: center;
		animation: appear 0.5s ease forwards;

		> div {
			background: vars.$color-white;
			padding: 2rem 1.5rem;
			border-radius: vars.$radius;
			margin: auto 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 25rem;
			width: 100%;
			box-shadow: 0 0 1rem rgba(vars.$color-bg-dark, 0.25);

			.close {
				background: none;
				border: none;
				cursor: pointer;
				color: vars.$color-red;
				font-weight: bold;
				font-size: 1.25rem;
				align-self: flex-end;
				transition: all 0.25s;

				&:hover {
					transform: scale(1.1);
				}
			}

			form {
				display: flex;
				flex-direction: column;
				padding: 0 1rem;

				> div {
					display: none;
				}

				input {
					padding: 0.5rem;
					border: 1px solid vars.$color-bg-dark;
					border-radius: math.div(vars.$radius, 2);
					margin-bottom: 1rem;
					background: vars.$color-bg-light;
				}

				button {
					background: vars.$color-green-light;
					border: none;
					cursor: pointer;
					color: vars.$color-green;
					font-weight: bold;
					font-size: 1.25rem;
					padding: 0.5rem 1rem;
					border-radius: math.div(vars.$radius, 2);
					margin: 1rem 0 0 auto;

					&:disabled {
						background: vars.$color-bg-light;
						color: vars.$color-bg-dark;
						cursor: not-allowed;
					}
				}
			}

			.form-status--success {
				display: flex;
				flex-direction: column;
			}
			.form-status--error {
				font-weight: bold;
			}

			hr {
				margin: 0 0 1rem;
				&:last-of-type {
					margin: 2rem 0 0;
				}
			}
		}
	}

	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
