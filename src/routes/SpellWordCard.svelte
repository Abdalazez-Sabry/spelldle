<script lang="ts">
	import SpellInput from './SpellInput.svelte';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { toCorrectSpellChar, toEvaluatedSpellChar, toUncheckedSpellChar } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import type { WordInfo } from '$lib/spelldle';
	import AudtioPlayer from './AudtioPlayer.svelte';
	import { onMount } from 'svelte';

	let {
		targetInfo,
		correctSpelling = $bindable(),
		previousSubmissions = $bindable()
	}: {
		targetInfo: WordInfo;
		correctSpelling: boolean;
		previousSubmissions: SpellCharType[][];
	} = $props();

	function handleSubmit(toCheck: string) {
		toCheck = toCheck.toLocaleUpperCase();
		const target = targetInfo.word.toLocaleUpperCase();
		if (toCheck == target) {
			correctSpelling = true;
			return;
		}

		previousSubmissions.unshift(toEvaluatedSpellChar(toCheck, target));
	}
	function playAudio() {
		const aud = new Audio(targetInfo.audio);
		aud.play();
	}

	function revealAnswer() {
		correctSpelling = true;
	}

	function playAudioOnSpace(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}
		e.preventDefault();

		if (e.key == ' ') {
			playAudio();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', playAudioOnSpace);
		return () => {
			window.removeEventListener('keydown', playAudioOnSpace);
		};
	});
</script>

<div
	class="flex w-[100svw] flex-col items-center justify-center gap-10 px-2 md:w-[80svw] lg:w-[70svw]"
>
	<AudtioPlayer audioUrl={targetInfo.audio} {playAudio} />

	<div class="flex max-w-[80%] flex-col items-start gap-2 text-wrap">
		<h4 class="text-muted-foreground text-lg md:text-xl">Definitions:</h4>
		{#each targetInfo.definitions as defin}
			<h6 class="text-muted-foreground max-w-full text-xs text-wrap md:text-xl">
				- {defin}
			</h6>
		{/each}
	</div>

	{#if correctSpelling}
		<SpellRow word={toCorrectSpellChar(targetInfo.word.toUpperCase())} />
	{:else}
		<SpellInput handleSubmitRoot={handleSubmit} {playAudio} {revealAnswer} />
	{/if}
</div>
