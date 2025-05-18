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

	// $effect(() => {
	// 	const longestSubm = previousSubmissions
	// 		.slice(amountToShow)
	// 		.reduce((prev, cur) => (cur.length > prev ? cur.length : prev), 0);

	// 	for (let i = 0; i < renderedSubmissions.slice(amountToShow).length; i++) {
	// 		const row = renderedSubmissions[i];

	// 		while (row.length > 0 && row[row.length - 1].char === ' ') {
	// 			row.pop();
	// 		}

	// 		while (row.length < longestSubm) {
	// 			row.push({ char: ' ', type: 'unchecked' });
	// 		}
	// 	}
	// });
</script>

{#if previousSubmissions.length > 0}
	<div class="flex w-full flex-col gap-6">
		<Separator />
		{#if previousSubmissions.length > 2}
			<div class="flex w-full flex-row items-center justify-end gap-2">
				<Label for="showall">Show All Submissions</Label>
				<Switch bind:checked={showAll} id="showall" />
			</div>
		{/if}
		{#each previousSubmissions.slice(0, amountToShow) as subm (subm)}
			<div animate:flip={{ duration: 200 }} transition:fade={{ duration: 200 }}>
				<SpellRow word={subm} minSize={longestSubmission} />
			</div>
		{/each}
	</div>
{/if}
