<script lang="ts">
	import Icon from '@iconify/svelte';
	import SpellInput from './SpellInput.svelte';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { toCorrectSpellChar, toEvaluatedSpellChar, toUncheckedSpellChar } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';

	const { targetSpelling }: { targetSpelling: string } = $props();
	let correctSpelling = $state(false);

	let previousSubmissions: SpellCharType[][] = $state([]);

	function addSpacesTillLongest(arr: SpellCharType[][]) {
		const longestSubm = previousSubmissions.reduce(
			(prev, cur) => (cur.length > prev ? cur.length : prev),
			0
		);

		for (let i = 0; i < previousSubmissions.length; i++) {
			const row = previousSubmissions[i];
			while (row.length < longestSubm) {
				row.push({ char: ' ', type: 'unchecked' });
			}
		}
	}

	function handleSubmit(toCheck: string) {
		toCheck = toCheck.toLocaleUpperCase();
		const target = targetSpelling.toLocaleUpperCase();
		if (toCheck == target) {
			correctSpelling = true;
			return;
		}

		previousSubmissions.unshift(toEvaluatedSpellChar(toCheck, target));
		addSpacesTillLongest(previousSubmissions);
	}
</script>

<div class="flex w-full flex-col items-center justify-center gap-10">
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

	{#if correctSpelling}
		<SpellRow word={toCorrectSpellChar(targetSpelling.toUpperCase())} />
		<!-- <h5 class="text-6xl">Good Job</h5> -->
	{:else}
		<SpellInput handleSubmitRoot={handleSubmit} />
	{/if}

	{#if previousSubmissions.length > 0}
		<div class="flex w-full flex-col gap-6">
			<Separator />
			{#each previousSubmissions as subm (subm)}
				<div animate:flip={{ duration: 200 }} transition:scale>
					<SpellRow word={subm} />
				</div>
			{/each}
		</div>
	{/if}
</div>
