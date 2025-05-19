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
	import { getDailyWord } from '$lib/spelldle';

	let correctSpelling = $state(false);
	let previousSubmissions: SpellCharType[][] = $state([]);
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
	<h1 class="  text-7xl font-bold">Daily</h1>
</div>
<Separator class="w-full max-w-[520px]" />
{#await getDailyWord()}
	<div>loading..</div>
{:then wordInfo}
	<h1>no ?</h1>
	<div class="flex flex-col items-center gap-10">
		<SpellWordCard targetInfo={wordInfo} bind:correctSpelling bind:previousSubmissions />
		{#if correctSpelling}
			<div class="flex flex-col items-center gap-2" transition:slide={{ duration: 200 }}>
				<h5 class="flex flex-row items-center gap-5 text-5xl md:text-6xl">
					Correct <PartyPopper class="size-10 md:size-15" />
				</h5>
				<Button variant="link" href="/" class=" text-lg [&_svg]:size-5"
					><CircleChevronLeft />Go To Back Home Page</Button
				>
			</div>
		{/if}
		<PerviousSubmissions {previousSubmissions} />
	</div>
{:catch e}
	<div>{e}</div>
{/await}
