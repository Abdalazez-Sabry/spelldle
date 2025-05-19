<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import SpelldleAnimatedLogo from './SpelldleAnimatedLogo.svelte';
	import SpellWordCard from './SpellWordCard.svelte';
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center justify-center gap-10 pt-10">
	<!-- <h1 class=" text-7xl font-bold">Spelldle</h1> -->
	<SpelldleAnimatedLogo />
	<div class="flex flex-col items-center justify-center gap-4 px-2">
		<h4 class="text-2xl md:text-4xl">Choose Mode</h4>
		<a href="/daily">
			<Button variant="link" class="text-xl text-white md:text-3xl" data-direction="backword"
				>Daily</Button
			>
		</a>
		<a href="/infinite">
			<Button variant="link" class="text-xl text-white md:text-3xl">Infinite</Button>
		</a>
	</div>
</main>
