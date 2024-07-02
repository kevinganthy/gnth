<script lang="ts">
	import { onMount } from 'svelte';

	export let seconds = 3;

	let elements: HTMLCollectionOf<Element>;
	let interval_id: number | null = null;
	let slot: HTMLElement;
	let index = 0;

	const onVisible = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && interval_id === null) {
				interval_id = setInterval(next, 1000 * seconds);
			}
		});
	};

	export const next = () => {
		elements[index].classList.remove('activ');
		index = (index + 1) % elements.length;
		elements[index].classList.add('activ');
	};

	onMount(() => {
		elements = slot.children;
		elements[index].classList.add('activ');
		if (window.IntersectionObserver) {
			const observer = new IntersectionObserver(onVisible, { threshold: 0.5 });
			observer.observe(slot);
		}
	});
</script>

<div class="animated" bind:this={slot}>
	<slot />
</div>

<style>
	:global(.animated > *) {
		opacity: 0.9;
		transition: all 1s;
	}

	:global(.animated > .activ) {
		opacity: 1;
		transform: scale(1.1);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) !important;
	}
</style>
