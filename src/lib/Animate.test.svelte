<script lang="ts">
	import Animate from './Animate.svelte';
	let component: Animate | null = null;

	export const next = () => {
		if (component) {
			component.next();
		}
	};
</script>

<Animate bind:this={component}>
	<div>1</div>
	<div>2</div>
	<div>3</div>
</Animate>
