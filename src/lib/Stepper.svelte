<script lang="ts">
	import { onMount } from 'svelte';

	export let seconds = 10;

	let steps: NodeListOf<Element>;
	let interval_id: number | null = null;
	let index = 0;
	let counter = 0;
	let progress = 0;
	let article: HTMLElement;

	const increment = () => {
		counter += 1;
		progress = counter / seconds;
		if (counter >= seconds * 100) next();
	};

	export const next = () => {
		steps[index].classList.remove('activ');
		index = (index + 1) % steps.length;
		steps[index].classList.add('activ');
		counter = 0;
	};

	export const setActiv = (index: number) => {
		steps[index].classList.remove('activ');
		steps[index].classList.add('activ');
		counter = 0;
		progress = 0;
	};

	const onMouseEnter = () => {
		if (interval_id) clearInterval(interval_id);
	};

	const onMouseLeave = () => {
		interval_id = setInterval(increment, 10);
	};

	const onVisible = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && interval_id === null) {
				interval_id = setInterval(increment, 10);
			}
		});
	};

	const onSelect = (e: MouseEvent) => {
		if (e.currentTarget) {
			let element = e.currentTarget as Element;
			let parent = element.parentNode as Element;

			if (parent) {
				index = Array.from(steps).indexOf(parent);
				setActiv(index);
			}
		}
	};

	onMount(() => {
		steps = document.querySelectorAll('.step');
		if (window.IntersectionObserver) {
			const observer = new IntersectionObserver(onVisible, { threshold: 0.5 });
			observer.observe(article);
		} else {
			interval_id = setInterval(increment, 10);
		}
	});
</script>

<article bind:this={article} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	<div class="step activ">
		<button on:click={onSelect}>
			<h3>1. Conception</h3>
		</button>
		<div>
			<p>On valide ensemble un cahier des charges précis pour répondre à vos besoins.</p>
			<p>On étudie la faisabilité technique, en détaillant toutes les parties de l'application.</p>
			<progress max="100" aria-hidden="true" value={progress}></progress>
		</div>
	</div>

	<div class="step">
		<button on:click={onSelect}>
			<h3>2. Proof of concept</h3>
		</button>
		<div>
			<p>
				On vous propose une pré version fonctionnelle pour valider le concept et la faisabilité,
				prenant en compte tous les points complexes.
			</p>
			<progress max="100" aria-hidden="true" value={progress}></progress>
		</div>
	</div>

	<div class="step">
		<button on:click={onSelect}>
			<h3>3. Minimum Viable Product</h3>
		</button>
		<div>
			<p>
				On développe une version simplifiée de l'application contenant les fonctionnalités
				essentielles pour une première mise en production rapide.
			</p>
			<progress max="100" aria-hidden="true" value={progress}></progress>
		</div>
	</div>

	<div class="step">
		<button on:click={onSelect}>
			<h3>4. Produit final</h3>
		</button>
		<div>
			<p>
				On développe l'application en intégrant les fonctionnalités manquantes, en améliorant
				l'expérience utilisateur et en corrigeant les bugs.
			</p>
			<progress max="100" aria-hidden="true" value={progress}></progress>
		</div>
	</div>
</article>

<style lang="scss">
	@use '@styles/vars';
	@use '@styles/mixins';
	@use 'sass:math';

	article {
		display: flex;
		flex-direction: column;
		margin: 1rem 1rem 3rem;
		padding: 0 1rem 1rem;
		border-radius: vars.$radius;

		@include mixins.large {
			background: vars.$color-white;
			box-shadow: 0 0 10px rgba(vars.$color-black, 0.5);
			padding: 1rem 2rem;
		}
		@include mixins.xl {
			padding: 2rem 4rem;
		}

		.step {
			button {
				background: none;
				border: none;
				cursor: pointer;
				padding: 0;
				color: vars.$color-bg-dark;
			}

			h3 {
				margin: 1rem 0;
				font-size: 1.5rem;
				font-weight: normal;

				&:hover {
					font-weight: bold;
				}
			}

			div {
				height: 0;
				overflow: hidden;
				padding: 0;
				border-radius: math.div(vars.$radius, 2);
				background: vars.$color-green-light;

				progress {
					width: 100%;
					background-color: vars.$color-green;
					background-color: #eee;
					height: 4px;
					appearance: none;
					border-radius: 4px;
					overflow: hidden;
					border: none;
				}
				progress::-webkit-progress-bar {
					background-color: white;
				}
			}

			&.activ {
				h3 {
					color: vars.$color-green;
					font-weight: bold;
				}
				div {
					height: auto;
					padding: 1rem 2rem;
				}
			}
		}
	}
</style>
