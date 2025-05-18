<script lang="ts">
	import SpellWordCard from '../SpellWordCard.svelte';
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center gap-10 pt-10">
	<h1 class=" text-7xl font-bold">Spelldle</h1>
	<div class="flex max-w-[1280px] flex-col items-center gap-10">
		<h2 class="text-3xl">Infinite Spell</h2>
		<SpellWordCard targetSpelling={'accommodate'} />
	</div>
</main>
