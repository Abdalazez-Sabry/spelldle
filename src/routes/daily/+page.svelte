<script lang="ts">
	import SpellWordCard from '../SpellWordCard.svelte';
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center gap-10 pt-10">
	<h1 class=" text-4xl font-bold md:text-7xl">Spelldle Daily</h1>
	<div class="flex flex-col items-center gap-10">
		<SpellWordCard targetSpelling={'accommodate'} />
	</div>
</main>
