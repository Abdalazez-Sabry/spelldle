<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Tooltip } from '$lib/components/ui/tooltip';
	import SpelldleAnimatedLogo from '../SpelldleAnimatedLogo.svelte';
	import SpellWordCard from '../SpellWordCard.svelte';
	import { ChevronLeft, CircleChevronLeft, PartyPopper } from '@lucide/svelte';
	import PerviousSubmissions from '../PerviousSubmissions.svelte';
	import type { SpellCharType } from '../SpellRow.svelte';
	import { scale, slide } from 'svelte/transition';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';

	let correctSpelling = $state(false);
	let previousSubmissions: SpellCharType[][] = $state([]);

	const POSSIBLE_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
	let difficulty = $state('');

	onMount(() => {
		difficulty = page.url.searchParams.get('difficulty') || 'easy';
		if (!POSSIBLE_DIFFICULTIES.has(difficulty)) {
			difficulty = 'easy';
		}
	});

	function changeDifficulty(diff: string) {
		pushState(`/infinite?difficulty=${diff}`, {});
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
<div class="just-between flex w-full max-w-[400px] flex-row justify-between">
	<h6 class="text-muted-foreground text-lg">Difficulty:</h6>
	<ToggleGroup
		class="just-between flex flex-row gap-10"
		bind:value={difficulty}
		type="single"
		onValueChange={changeDifficulty}
	>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'easy' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="easy"
				id="easy"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="easy">Easy</Label>
			</ToggleGroupItem>
		</div>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'medium' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="medium"
				id="medium"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="medium">Medium</Label>
			</ToggleGroupItem>
		</div>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'hard' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="hard"
				id="hard"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="hard">Hard</Label>
			</ToggleGroupItem>
		</div>
	</ToggleGroup>
</div>
<Separator class="w-full max-w-[520px]" />
<div class="flex flex-col items-center gap-10">
	<SpellWordCard targetSpelling={'accommodate'} bind:correctSpelling bind:previousSubmissions />
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
				onclick={() => {
					console.log('next word');
				}}>Next Word<CircleChevronLeft /></Button
			>
		</div>
	{/if}
	<PerviousSubmissions {previousSubmissions} />
</div>
