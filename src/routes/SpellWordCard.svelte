<script lang="ts">
	import Icon from '@iconify/svelte';
	import SpellInput from './SpellInput.svelte';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { toCorrectSpellChar, toEvaluatedSpellChar, toUncheckedSpellChar } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import PerviousSubmissions from './PerviousSubmissions.svelte';

	const { targetSpelling }: { targetSpelling: string } = $props();
	let correctSpelling = $state(false);

	let previousSubmissions: SpellCharType[][] = $state([]);

	function handleSubmit(toCheck: string) {
		toCheck = toCheck.toLocaleUpperCase();
		const target = targetSpelling.toLocaleUpperCase();
		if (toCheck == target) {
			correctSpelling = true;
			return;
		}

		previousSubmissions.unshift(toEvaluatedSpellChar(toCheck, target));
	}
</script>

<div class="flex w-full flex-col items-center justify-center gap-10">
	<div class="flex flex-row items-center gap-2">
		<Icon icon="material-symbols:play-circle-outline" width="32" height="32" />
		<h3 class="text-3xl">Listen Again</h3>
	</div>
	<div class="flex flex-col items-start gap-2">
		<h4 class="text-xl">Definitions:</h4>
		<h6 class="text-muted-foreground text-md">
			- (of a building or other area) provide lodging or sufficient space for.
		</h6>
		<h6 class="text-muted-foreground text-md">- fit in with the wishes or needs of.</h6>
	</div>

	{#if correctSpelling}
		<SpellRow word={toCorrectSpellChar(targetSpelling.toUpperCase())} />
		<!-- <h5 class="text-6xl">Good Job</h5> -->
	{:else}
		<SpellInput handleSubmitRoot={handleSubmit} />
	{/if}

	<PerviousSubmissions {previousSubmissions} />
</div>
