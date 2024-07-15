<script lang="ts">
	import { actualSection } from '$lib/store';
	import { onMount } from 'svelte';


	const adjustHeader = () => {
		const header: HTMLElement = document.querySelector('header') as HTMLElement;
		const nav: HTMLElement = header.querySelector('nav') as HTMLElement;
		const address: HTMLElement = header.querySelector('address') as HTMLElement;
		const img: HTMLImageElement = header.querySelector('img') as HTMLImageElement;
		const span: HTMLElement = header.querySelector('span') as HTMLElement;

		const isMobile = window.innerWidth < 1240;

		const width = window.innerWidth - window.scrollY;
		const margin = window.innerHeight / 4 - window.scrollY / 4;
		const opacity = 1 - width / window.innerWidth;

		if ( !isMobile) {
			if ( width < 420 ) {
				nav.style.opacity = address.style.opacity = '1';
				span.style.opacity = '0';
			 	header.style.width = `${420}px`;
			 	img.style.marginTop = `3rem`;
			} else {
			 	header.style.width = `${width}px`;
			 	img.style.marginTop = `calc(${margin}px + 3rem)`;
				nav.style.opacity = address.style.opacity = `${opacity}`;
				span.style.opacity = `${1 - opacity}`;
			}
		}

	};

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

		document.addEventListener('scroll', adjustHeader);
		adjustHeader();
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


	span, nav {
		transition: opacity 0.5s;
	}

	header {
		background: vars.$color-bg-dark;
		display: flex;
		flex-direction: column;
		height: 100dvh;
		box-sizing: border-box;
		width: 100vw;
		padding: .5rem 2rem;
		
		@include mixins.large {
			position: sticky;
			top: 0;
			padding: .5rem;
		}

		h1 {
			display: none;
		}

		img {
			border-radius: vars.$radius;
			aspect-ratio: 1/1;
			width: 50vw;
			max-width: 240px;
			margin: auto auto 0 auto;
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
				gap: 1rem;
				opacity: 0;

				ul {
					display: flex;
					flex-direction: column;
					gap: 2rem;
					list-style: none;
					margin: 0;
					align-items: flex-start;
					padding-left: .5rem;
				}

				li {
					margin: 0;
					&:hover {
						transform: scale(1.1);
					}
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
			display: flex;
			gap: 1rem;
			align-items: end;
			margin: 0 0 0 auto;
			opacity: 0;

			@include mixins.large {
				margin: auto auto 1rem auto;
			}

			a {
				color: vars.$color-bg-light;
				text-decoration: none;
			}
		}
	}
</style>
