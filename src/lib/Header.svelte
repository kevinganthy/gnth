<script lang="ts">
	import { actualSection } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a');

		actualSection.subscribe((value) => {
			links.forEach((link) => {
				if (link.dataset?.id === value) {
					link.classList.add('activ');
				} else {
					link.classList.remove('activ');
				}
			});
		});
	});
</script>

<header>
	<h1>GNTH Agence web</h1>
	<img loading="eager" src="/gnth.svg" alt="Logo de GNTH Agence web" />
	<span aria-hidden="true">Agence web</span>
	<nav>
		<ul>
			<li><a href="#welcome" data-id="welcome" class="activ">L'agence</a></li>
			<li><a href="#site" data-id="site">Site internet</a></li>
			<li><a href="#graphic" data-id="graphic">Identité graphique</a></li>
			<li><a href="#application" data-id="application">Applications web</a></li>
			<li><a href="#dev" data-id="dev">Développement sur mesure</a></li>
		</ul>
	</nav>
	<address>
		<a href="mailto:contact@gnth.fr">contact@gnth.fr</a>
		<a href="tel:+33668285197">06 68 28 51 97</a>
	</address>
</header>

<style lang="scss">
	@use '@styles/mixins';
	@use '@styles/vars';

	$factor: 1.5;
	$delay: 1.5;
	$timing: ease-in-out;

	header {
		background: vars.$color-bg-dark;
		display: flex;
		flex-direction: column;
		animation: 1s * $factor $timing 1s * $delay forwards header-size;
		height: 100dvh;
		position: relative;
		box-sizing: border-box;

		@include mixins.large {
			width: 100vw;
			position: sticky;
			top: 0;
		}

		h1 {
			display: none;
		}

		img {
			animation: 1s * $factor $timing 1s * $delay forwards header-logo;
			border-radius: vars.$radius;
			aspect-ratio: 1/1;
			width: min-content;
			height: 50vw;
			margin: calc(50vh - 25vw) auto 0 25vw;
			z-index: 2;

			@include mixins.large {
				width: 50%;
				height: auto;
				max-height: 520px;
				max-width: 520px;
				margin: calc(50vh - 260px) auto 1rem;
			}
		}

		span {
			color: vars.$color-green-light;
			text-transform: uppercase;
			font-size: 6vw;
			margin: 1rem auto auto 50%;
			transform: translateX(-50%);
			opacity: 1;
			animation: 1s * $factor $timing 1s * $delay forwards header-title;

			@include mixins.large {
				margin: 1rem auto auto auto;
				transform: none;
				font-size: 48px;
			}
		}

		nav {
			display: none;

			@include mixins.large {
				display: block;
				opacity: 0;
				gap: 1rem;
				margin: auto 0 0 0;
				animation: 1s * $factor $timing 1s * $delay forwards appear;

				ul {
					display: flex;
					flex-direction: column;
					gap: 2rem;
					list-style: none;
					padding: 0;
					margin: 0;
				}

				li {
					margin: 0;
				}

				a {
					color: vars.$color-bg-light;
					text-decoration: none;

					&.activ {
						color: vars.$color-green-light;
						font-weight: bold;
					}
				}
			}
		}

		address {
			opacity: 0;
			display: flex;
			gap: 1rem;
			align-items: end;
			animation: 1s * $factor $timing 1s * $delay forwards appear;
			margin: 0 0 0 auto;

			@include mixins.large {
				margin: auto auto 0 auto;
			}

			a {
				color: vars.$color-bg-light;
				text-decoration: none;
			}
		}
	}

	@keyframes header-logo {
		to {
			height: 80px;
			margin: 0 auto 0 0px;
		}
	}

	@keyframes header-size {
		to {
			padding: 20px;
			height: 135px;
		}
	}

	@keyframes header-title {
		from {
			opacity: 1;
		}
		10% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
			position: absolute;
			top: 1rem;
			font-size: clamp(2rem, 6vw, 2rem);
			margin: 0 auto auto 100px;
			padding: 0;
			height: 0;
			transform: none;
		}
	}

	@keyframes appear {
		from {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@include mixins.large {
		@keyframes header-logo {
			to {
				margin: 3rem auto 0;
			}
		}

		@keyframes header-size {
			to {
				padding: 20px;
				width: 420px;
			}
		}

		@keyframes header-title {
			to {
				font-size: 32px;
				margin: 1rem auto;
				padding: 0;
				height: 0;
				transform: none;
			}
		}
	}
</style>
