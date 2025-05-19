<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import '../app.css';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		if (navigation.from?.route.id === navigation.to?.route.id) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex min-h-svh max-w-svw flex-col items-center justify-between gap-5">
	<Navbar />
	<main class="flex w-full flex-1 flex-col items-center justify-start gap-10 pt-10">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	::view-transition-old(root) {
		animation: zoomOut 0.4s ease forwards;
	}
	::view-transition-new(root) {
		animation: zoomIn 0.4s ease forwards;
	}

	@keyframes zoomOut {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(1.05);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
