<script lang="ts">
	import Icon from '@iconify/svelte';
	import SpellInput from './SpellInput.svelte';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { toCorrectSpellChar, toEvaluatedSpellChar, toUncheckedSpellChar } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	let {
		targetSpelling,
		correctSpelling = $bindable(),
		previousSubmissions = $bindable()
	}: {
		targetSpelling: string;
		correctSpelling: boolean;
		previousSubmissions: SpellCharType[][];
	} = $props();

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

<div
	class="flex w-[100svw] flex-col items-center justify-center gap-10 px-2 md:w-[80svw] lg:w-[70svw]"
>
	<Button class="text-muted-foreground text-xl md:text-3xl [&_svg]:size-10" variant="ghost">
		<span class="inline-block size-10">
			<Icon icon="material-symbols:play-circle-outline" />
		</span>
		Listen Again
	</Button>
	<div class="flex max-w-[80%] flex-col items-start gap-2 text-wrap">
		<h4 class="text-muted-foreground text-lg md:text-xl">Definitions:</h4>
		<h6 class="text-muted-foreground max-w-full text-xs text-wrap md:text-lg">
			- (of a building or other area) provide lodging or sufficient space for.
		</h6>
		<h6 class="text-muted-foreground text-xs md:text-lg">- fit in with the wishes or needs of.</h6>
	</div>

	{#if correctSpelling}
		<SpellRow word={toCorrectSpellChar(targetSpelling.toUpperCase())} />
	{:else}
		<SpellInput handleSubmitRoot={handleSubmit} />
	{/if}
</div>
