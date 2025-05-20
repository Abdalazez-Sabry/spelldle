<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { flip } from 'svelte/animate';
	import type { SpellCharType } from './SpellRow.svelte';
	import SpellRow from './SpellRow.svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';

	const { previousSubmissions }: { previousSubmissions: SpellCharType[][] } = $props();
	let showAll = $state(false);
	let amountToShow = $derived(showAll ? previousSubmissions.length : 2);
	let longestSubmission = $derived(
		previousSubmissions
			.slice(0, amountToShow)
			.reduce((prev, cur) => (cur.length > prev ? cur.length : prev), 0)
	);
</script>

{#if previousSubmissions.length > 0}
	<div class="flex w-full flex-col items-center gap-6 pb-20">
		<div class="flex w-[600px] max-w-[80svw] flex-col gap-6">
			<Separator class="mx-auto" id="touch-scroll-to" />
			{#if previousSubmissions.length > 2}
				<div
					class="text-muted-foreground flex w-full flex-row items-center justify-end gap-2 text-sm md:text-lg"
				>
					<Label for="showall">Show All Submissions</Label>
					<Switch bind:checked={showAll} id="showall" />
				</div>
			{/if}
		</div>
		{#each previousSubmissions.slice(0, amountToShow) as subm (subm)}
			<div animate:flip={{ duration: 200 }} transition:fade>
				<SpellRow word={subm} minSize={longestSubmission} />
			</div>
		{/each}
	</div>
{/if}
