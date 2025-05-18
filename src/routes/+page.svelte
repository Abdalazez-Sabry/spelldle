<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import SpellWordCard from './SpellWordCard.svelte';
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center gap-10 pt-10">
	<h1 class=" text-7xl font-bold">Spelldle</h1>
	<div class="flex max-w-[1280px] flex-1 flex-col items-center justify-center gap-10">
		<h4 class="text-4xl">Choose Mode</h4>
		<a href="/daily">
			<Button variant="link" class="text-3xl text-white">Daily Spell</Button>
		</a>
		<a href="/infinite">
			<Button variant="link" class="text-3xl text-white">Infinite Spell</Button>
		</a>
	</div>
</main>
