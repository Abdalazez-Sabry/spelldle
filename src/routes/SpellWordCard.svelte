<script lang="ts">
	import Icon from '@iconify/svelte';
	import SpellInput from './SpellInput.svelte';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { toEvaluatedSpellChar, toUncheckedSpellChar } from '$lib/utils';

	const { targetSpelling }: { targetSpelling: string } = $props();
	let correctSpelling = $state(false);

	let previousSubmissions: SpellCharType[][] = $state([]);

	function handleSubmit(toCheck: string) {
		toCheck = toCheck.toLocaleUpperCase();
		const target = targetSpelling.toLocaleUpperCase();
		previousSubmissions.push(toEvaluatedSpellChar(toCheck, target));
		if (toCheck == target) {
			correctSpelling = true;
		}
	}
</script>

<div class="flex flex-col items-center justify-center gap-10">
	<div class="flex flex-row items-center gap-2">
		<Icon icon="material-symbols:play-circle-outline" width="64" height="64" />
		<h3 class="text-5xl">Listen Again</h3>
	</div>
	<div class="flex flex-col items-start gap-2">
		<h4 class="text-3xl">Definitions:</h4>
		<h6 class="text-muted-foreground text-2xl">
			- (of a building or other area) provide lodging or sufficient space for.
		</h6>
		<h6 class="text-muted-foreground text-2xl">- fit in with the wishes or needs of.</h6>
	</div>

	{#each previousSubmissions as subm}
		<SpellRow word={subm} />
	{/each}
	{#if correctSpelling}
		<h5 class="text-6xl">Good Job</h5>
	{:else}
		<SpellInput handleSubmitRoot={handleSubmit} />
	{/if}
</div>
