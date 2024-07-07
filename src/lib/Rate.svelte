<script lang="ts">
	export let hours: number;
	export let title: string;
	export let unit: string = '€';
	export let mainRate: boolean = false;
	export let asterisk: string | null = null;
	export let isOption: boolean = false;

	const price = import.meta.env.VITE_HOURLY_RATE * hours;

	// Step required for accessible text in DOM
	const displayedRate = `${isOption ? '+' : ''} ${price} ${unit}`;
	const hoursEquivalent = `(soit ${hours} heure${hours > 1 ? 's' : ''})`;
</script>

<article class={mainRate ? 'main' : ''} aria-label="{title} {price} {unit}">
	{#if !mainRate}
		<h3>{title}</h3>
	{/if}
	<strong>{displayedRate}</strong>
	{#if mainRate && asterisk}
		<small>{asterisk}</small>
	{/if}
	<div>
		<slot />
		<small>{hoursEquivalent}</small>
	</div>
</article>

<style lang="scss">
	@use '@styles/vars';
	@use '@styles/mixins';

	article {
		display: grid;
		grid-template-columns: max-content 1fr;
		background: vars.$color-white;
		box-shadow: 0 0 10px rgba(vars.$color-black, 0.5);
		margin: 0.5rem 1rem;
		padding: 1rem;
		border-radius: vars.$radius;
		box-sizing: border-box;

		@include mixins.large {
			padding: 1.5rem;
			max-width: 780px;
			margin: 0.5rem 0;
		}
		@include mixins.xl {
			margin: 0.25rem 0;
		}

		strong {
			font-size: 2rem;
			color: vars.$color-green;
			grid-column: 1;
			grid-row: 1;
		}

		> small {
			margin: auto 0 auto 1rem;
		}

		h3 {
			margin: 0.6rem 0 auto 1rem;
			grid-column: 2;
			text-align: right;
		}

		div {
			grid-column: span 2;
		}

		&.main {
			background: vars.$color-bg-dark;
			color: vars.$color-bg-light;
			margin: 3rem 1rem;
			padding: 1rem 2rem;
			box-shadow: none;

			@include mixins.large {
				padding: 3rem;
				margin: 3rem auto;
			}
			@include mixins.xl {
				padding: 3rem 5rem;
				margin: auto;
			}

			strong {
				font-size: 3.5rem;
				color: vars.$color-green-light;
			}

			h3 {
				display: none;
			}
		}
	}
</style>
