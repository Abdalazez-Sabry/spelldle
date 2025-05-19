<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Tooltip } from '$lib/components/ui/tooltip';
	import SpelldleAnimatedLogo from '../SpelldleAnimatedLogo.svelte';
	import SpellWordCard from '../SpellWordCard.svelte';
	import { ChevronLeft, CircleChevronLeft, PartyPopper } from '@lucide/svelte';
	import PerviousSubmissions from '../PerviousSubmissions.svelte';
	import type { SpellCharType } from '../SpellRow.svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
	import { getInfiniteWord, type Difficulty } from '$lib/spelldle';
	import DifficultyToggle from './DifficultyToggle.svelte';

	let correctSpelling = $state(false);
	let previousSubmissions: SpellCharType[][] = $state([]);
	let infiniteWord: string | null = $state(null);

	const POSSIBLE_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
	let difficulty = $state('');

	onMount(() => {
		difficulty = page.url.searchParams.get('difficulty') || 'easy';
		if (!POSSIBLE_DIFFICULTIES.has(difficulty)) {
			difficulty = 'easy';
		}
		infiniteWord = getInfiniteWord(difficulty as Difficulty);
	});

	function getNextWord() {
		infiniteWord = getInfiniteWord(difficulty as Difficulty);
		previousSubmissions = [];
		correctSpelling = false;
	}
</script>

<div class="relative flex h-fit w-full max-w-[600px] flex-row items-center justify-center gap-10">
	<div class="absolute left-0 flex items-center justify-center">
		<Tooltip text="Go To Home">
			<Button
				variant="icon"
				class="flex cursor-default items-center justify-center [&_svg]:size-10 md:[&_svg]:size-20"
				href="/"><ChevronLeft /></Button
			>
		</Tooltip>
	</div>
	<h1 class="text-7xl font-bold">Infinite</h1>
</div>

<DifficultyToggle bind:difficulty />

<Separator class="w-full max-w-[520px]" />
{#if infiniteWord}
	<div class="flex flex-col items-center gap-10" transition:fade={{ duration: 200 }}>
		<SpellWordCard targetSpelling={infiniteWord} bind:correctSpelling bind:previousSubmissions />
		{#if correctSpelling}
			<div class="flex flex-col items-center gap-2" transition:slide={{ duration: 200 }}>
				<h5 class="flex flex-row items-center gap-5 text-5xl md:text-6xl">
					Correct <PartyPopper class="size-10 md:size-15" />
				</h5>
				<Button
					variant="default"
					class=" hover:text-accent text-2xl [&_svg]:size-5"
					{@attach (el: any) => {
						setTimeout(() => el.focus(), 200);
					}}
					onclick={getNextWord}>Next Word<CircleChevronLeft /></Button
				>
			</div>
		{/if}
		<PerviousSubmissions {previousSubmissions} />
	</div>
{/if}
