<script lang="ts">
	import { onMount } from 'svelte';
	import '@styles/main.scss';
	import Header from '@lib/Header.svelte';
	import Footer from '@lib/Footer.svelte';
	import Rate from '@lib/Rate.svelte';
	import Stepper from '@lib/Stepper.svelte';
	import Contact from '@lib/Contact.svelte';
	import { toBeContacted, actualSection } from '$lib/store';
	import { serializeSchema } from '@lib/index';
	import Animate from '@lib/Animate.svelte';

	let isScrolled = false;

	const onScrollClick = () => {
		if ( isScrolled ) {
			document.querySelector("#welcome").scrollIntoView( {behavior: "smooth"});
		} else {
			document.querySelector("#site").scrollIntoView( {behavior: "smooth"});
		}
	};

	const onVisible = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				actualSection.set(entry.target.id);
			}
		});
	};

	onMount(() => {
		isScrolled = window.scrollY > window.innerHeight + (window.innerHeight * .75);
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > window.innerHeight + (window.innerHeight * .75);
		});

		const sections = document.querySelectorAll('section');
		const observer = new IntersectionObserver(onVisible, { threshold: 0.5 });
		sections.forEach((element) => observer.observe(element));
	});

	const title = 'Agence web GNTH en Charente-Maritime, Loire et Savoie';
	const description = 'Des services de qualité à des tarifs abordables. Une équipe joyeuse et passionnée pour vos projets les plus audacieux, près de chez vous ou à distance.';
	const url = 'https://gnth.fr';
	const icon = '/gnth.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={icon} />
	<meta property="og:site_name" content={title} />

	{@html serializeSchema({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: title,
		descritpion: description,
		url: url
	})}
</svelte:head>

<Header />

<main>
	<button on:click={onScrollClick} class="scroll {isScrolled ? 'scrolled' : ''}">
		<img
			height="50"
			width="50"
			loading="lazy"
			src="/caret-down-solid.svg"
			alt="Flèche vers le {isScrolled ? 'haut' : 'bas'}"
		/>
		<span>{isScrolled ? 'Remonter en haut' : 'Continuer la navigation'}</span>
	</button>

	<section class="welcome" id="welcome">
		<h2>Bienvenue,</h2>

		<div class="kevin">
			<img
				height="480"
				width="480"
				loading="lazy"
				src="/kevin.webp"
				alt="Kévin, fondateur de l'agence web, Le Gua en Charente-Maritime (17)"
			/>
			<p aria-hidden="true">Kévin, Le Gua 17</p>
		</div>

		<p>
			Dans une agence web où l'humain est notre priorité absolue et où nous proposons des services
			de qualité à des tarifs abordables.
		</p>
		<p>
			Avec une équipe joyeuse et passionnée, nous sommes prêts à concrétiser vos projets web les
			plus audacieux, près de chez vous ou à distance.
		</p>
		<p>
			Autour d'une solution interne et novatrice, nous façonnons des sites et applications web qui
			correspondent à vos besoins. Bénéficiez d'un accompagnement pro, efficace et précis.
		</p>

		<address aria-hidden="true">
			🌊 Charente-Maritime (17)<br>
			🌲 Loire (42)<br>
			🏔 Savoie (73)
		</address>

		<div class="team">
			<img
				height="220"
				width="220"
				loading="lazy"
				src="/aurelie.webp"
				alt="Aurélie, interlocutrice à Chambéry en Savoie (73)"
			/>
			<p aria-hidden="true">Aurélie</p>
			<address aria-hidden="true">Chambéry 73</address>
			<img
				height="220"
				width="220"
				loading="lazy"
				src="/emilie.webp"
				alt="Emilie, interlocutrice à Royan en Charente-Maritime (17)"
			/>
			<p aria-hidden="true">Emilie</p>
			<address aria-hidden="true">Royan 17</address>
			<img
				height="220"
				width="220"
				loading="lazy"
				src="/faustine.webp"
				alt="Faustine, interlocutrice à Marennes en Charente-Maritime (17)"
			/>
			<p aria-hidden="true">Faustine</p>
			<address aria-hidden="true">Marennes 17</address>
			<img
				height="220"
				width="220"
				loading="lazy"
				src="/laura.webp"
				alt="Laura, interlocutrice à Roanne dans la Loire (42)"
			/>
			<p aria-hidden="true">Laura</p>
			<address aria-hidden="true">Roanne 42</address>
		</div>
	</section>

	<button on:click={() => toBeContacted.set(true)} class="to-be-contacted">
		Etre recontacté
	</button>

	<Contact />

	<section class="site" id="site">
		<h2>Site internet</h2>

		<p>
			Avec notre offre de site internet simple, vous bénéficiez d'un design moderne et épuré, ainsi
			que d'un contenu clair et structuré.
		</p>
		<p>
			Vous choisissez les fonctionnalités qui vous seront vraiment utiles, pour un prix plus juste.
		</p>

		<div>
			<Rate hours={12} title="Tarif de base" mainRate>
				<p>Une landing page simple et efficace, pour un contenu percutant.</p>
				<p>
					Tout ce dont vous aurez besoin pour présenter votre activité de manière claire et concise.
				</p>
			</Rate>
		</div>

		<div>
			<Rate hours={7} isOption title="Option page supplémentaire">
				<p>
					Organisez votre contenu comme bon vous semble en présentant vos produits ou services en
					détail. Offrez une expérience complète à vos visiteurs, sans compromis.
				</p>
			</Rate>
		</div>

		<div>
			<Rate hours={8} isOption title="Option articles de blog">
				<p>
					Attirez davantage de visiteurs. Renforcez votre crédibilité, établissez une présence
					solide sur le web et communiquez de manière authentique.
				</p>
			</Rate>
		</div>

		<div>
			<Rate hours={5} isOption title="Option édition de contenu">
				<p>
					Prenez la main vous même sur le contenu de votre site pour le faire vivre, via notre
					interface de gestion de contenu simple et efficace.
				</p>
			</Rate>
		</div>

		<p>Autres options possibles suivant vos besoins.</p>
	</section>

	<section class="graphic" id="graphic">
		<h2>Identité graphique</h2>

		<p>
			GNTH propose un accompagnement complet pour la création de votre logo, de votre charte
			graphique ou de vos supports de communication.
		</p>
		<p>
			Chaque prestation inclut une analyse de votre marque, vos valeurs et vos objectifs, ainsi que
			3 itérations pour chaque proposition.
		</p>

		<Animate>
			<Rate hours={12} title="Logo">
				<p>
					Un logo unique et personnalisé, qui vous ressemble et qui vous permettra de vous
					démarquer.
				</p>
			</Rate>
			<Rate hours={14} title="Maquette">
				<p>
					Une maquette de site internet ou d’application web, pour une vision claire et précise de
					votre projet pour une expérience utilisateur appréciée.
				</p>
			</Rate>
			<Rate hours={9} title="Charte graphique">
				<p>
					Une charte graphique complète pour une communication cohérente et professionnelle, adaptée
					à votre image de marque.
				</p>
			</Rate>
		</Animate>
	</section>

	<section class="application" id="application">
		<h2>Application web</h2>

		<p>Votre activité nécessite une approche plus spécifique ?</p>
		<p>
			L’agence web GNTH répond à vos besoins, en gardant sa signature : performance, fiabilité et
			des prix honnêtes. Tous les cas de figure sont envisageables, c’est pourquoi le mieux est d’en
			discuter directement.
		</p>

		<div>
			<Rate hours={35} title="Tarif de base" mainRate asterisk="à partir de">
				<p>
					On s’engage dans un développement entièrement personnalisé suivant votre cahier des
					charges ou de votre besoin.
				</p>
				<p>Si besoin, on vous guide grâce à notre expertise technique.</p>
			</Rate>
		</div>

		<div class="surounded">
			<h3>Restez bien entouré</h3>
			<p>
				L’hébergement sur un serveur dédié et le maintien en condition opérationnelle sont inclus, à
				partir de 39 € par mois.
			</p>
			<img
				height="120"
				width="120"
				loading="lazy"
				src="/kevin120.webp"
				alt=""
			/>
			<img
				height="120"
				width="120"
				loading="lazy"
				src="/faustine120.webp"
				alt=""
			/>
		</div>
	</section>

	<section class="dev" id="dev">
		<h2>Développement sur mesure</h2>

		<p>
			Votre besoin ne rentre dans aucune case ? Nous avons les compétences pour développer tous
			types de projets sur différentes plateformes.
		</p>
		<p>Optez pour l’intégrale, ou choisissez une ou plusieurs des étapes ci-dessous.</p>

		<div>
			<Stepper />
		</div>
	</section>
</main>

<Footer />

<style lang="scss">
	@use '@styles/vars';
	@use '@styles/mixins';

	main {
		display: flex;
		flex-direction: column;

		@include mixins.large {
			width: calc(100vw - 420px);
			box-sizing: border-box;
		}

		h2 {
			color: vars.$color-green;
			font-size: 2rem;
			margin: 1rem;
			text-align: left;

			@include mixins.large {
				font-size: 42px;
				font-weight: normal;
			}
		}

		section {
			display: flex;
			flex-direction: column;
			margin: 3rem 0;

			@include mixins.large {
				margin: 48px;
			}
			@include mixins.xl {
				box-sizing: border-box;
				min-height: 70vh;
				padding: 10vh 0;
				margin: 64px auto;
				width: calc(100% - 128px);
				max-width: 1120px;
			}

			h2 {
				margin: auto 1rem;

				@include mixins.large {
					margin: auto 14px 3rem;
				}
				@include mixins.xl {
					margin: auto 0 3rem;
				}
			}

			> p {
				grid-column: span 2;
				margin: 1rem;

				@include mixins.xl {
					grid-column: 1;
					margin: 0;
				}
			}

			&.welcome {
				display: grid;
				grid-template-columns: 1fr 125px;

				@include mixins.large {
					grid-template-columns: 1fr 200px;
					margin: 3rem 0 3rem 3rem;
				}

				@include mixins.xl {
					grid-template-columns: 1fr auto;
					margin: 3rem auto 3rem auto;
					gap: 1rem 1rem;
					align-content: center;
					max-width: 1440px;
					min-height: unset;
				}

				p {
					@include mixins.large {
						margin-right: 3rem;
					}
				}

				.kevin {
					display: flex;
					flex-direction: column;
					margin: 0;

					@include mixins.xl {
						grid-row: span 5;
						margin: 0 0 0 auto;
						transform: translateX(4rem);
					}

					img {
						width: 100%;
						height: auto;
						object-fit: cover;
						border-top-left-radius: vars.$radius;
						border-bottom-left-radius: vars.$radius;
						@include mixins.xl {
							margin: 0 0 0 auto;
							max-width: 480px;
							max-height: 480px;
							border-radius: vars.$radius;
						}
					}
					p {
						margin: 0.25rem auto;
						font-size: 0.8rem;
						color: vars.$color-bg-dark;
						@include mixins.large {
							font-size: 1rem;
						}
					}
				}

				> p:nth-of-type(1) {
					margin-top: 3rem;

					@include mixins.xl {
						margin: 0;
					}
				}

				> address {
					margin: 1rem;
					@include mixins.xl {
						margin-bottom: 128px;
					}
				}

				.team {
					grid-column: span 2;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					grid-template-rows: repeat(3, min-content);
					gap: 0.25rem 0;
					padding: 0.5rem;
					margin: 3rem 0;
					grid-auto-flow: column;

					@include mixins.large {
						gap: 0 8px;
						margin: 3rem 6rem 0;
					}

					@include mixins.xl {
						margin: 6rem auto 0;
					}

					img {
						width: 100%;
						height: auto;
						object-fit: cover;
						max-width: 220px;

						&:nth-child(1) {
							border-top-left-radius: vars.$radius;
							border-bottom-left-radius: vars.$radius;
						}
						&:nth-of-type(4) {
							border-top-right-radius: vars.$radius;
							border-bottom-right-radius: vars.$radius;
						}
					}

					p,
					address {
						font-size: 0.8rem;
						color: vars.$color-bg-dark;
						margin: 0;
						text-align: center;
						@include mixins.large {
							font-size: 1rem;
						}
					}
				}
			}

			&.site {
				p:nth-last-of-type(1) {
					margin: auto;
				}

				@include mixins.large {
					div {
						margin: auto;
					}
				}

				@include mixins.xl {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1rem 3rem;

					h2 {
						margin-bottom: 3rem;
					}

					div {
						margin: auto;
						grid-column: span 2;

						&:nth-of-type(1) {
							grid-column: 2;
							grid-row: 1 / span 3;
						}

						&:nth-of-type(2) {
							margin-top: 5rem;
						}
					}

					p:nth-last-of-type(1) {
						grid-column: span 2;
					}
				}
			}

			&.graphic {
				:global(> div) {
					display: flex;
					flex-direction: column;
					margin: 3rem auto 1rem;
					gap: 1rem;

					@include mixins.xl {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr;
						width: 100%;
						gap: 3rem;
					}
				}
			}

			&.application {
				div {
					@include mixins.large {
						margin: 0 3rem;
					}
					@include mixins.xl {
						margin: 6rem 3rem;
					}
				}

				.surounded {
					display: grid;
					grid-template-columns: 1fr 75px;
					gap: 0.25rem 0.5rem;
					margin: 3rem 1rem;

					@include mixins.large {
						margin: 1rem auto;
						max-width: 780px;
						grid-template-columns: 1fr 120px 120px;
					}

					h3 {
						grid-column: span 2;
						color: vars.$color-green;
						margin: 0;
						@include mixins.large {
							grid-column: 1;
						}
					}

					p {
						grid-row: span 2;
						@include mixins.large {
							grid-row: 2;
						}
					}

					img {
						width: 100%;
						height: auto;
						object-fit: cover;
						transform: translateY(-2.5rem);
						border-radius: vars.$radius;
						@include mixins.large {
							transform: unset;
							grid-row: 1 / span 2;
						}
					}
				}
			}

			&.dev {
				div {
					@include mixins.xl {
						margin: 3rem;
					}
				}
			}
		}

		> button {
			background: vars.$color-green-light;
			border: none;
			box-shadow: 0 0 10px rgba(vars.$color-green, 0.5);
			cursor: pointer;
			color: vars.$color-green;
			font-weight: bold;
			font-size: 1.25rem;
			z-index: 20;

			&.scroll {
				display: none;
				margin: 0 auto;
				width: 75px;
				height: 75px;
				border-radius: 50%;
				position: sticky;
				top: calc(100dvh - 75px - 1rem);

				@include mixins.tablet {
					display: flex;
				}
				@include mixins.xl {
					margin: -4rem auto;
				}

				img {
					width: 50%;
					height: auto;
					margin: auto;
					transition: all 0.5s;
				}
				span {
					display: none;
				}
				&.scrolled img {
					transform: rotate(540deg);
				}
			}

			&.to-be-contacted {
				position: sticky;
				top: 93dvh;
				margin: 0 0 0 auto;
				padding: 0.75rem 2rem;
				border-radius: vars.$radius * 2;
				z-index: 2;
				font-size: 0.85rem;
				
				@include mixins.large {
					top: calc(100dvh - 80px);
					margin: 0 2rem 0 auto;
					font-size: 1rem;
				}
			}
		}
	}
</style>
