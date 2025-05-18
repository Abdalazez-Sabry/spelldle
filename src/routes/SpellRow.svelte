<script lang="ts">
	import { flip } from 'svelte/animate';
	import { draw, fade, fly, scale, slide } from 'svelte/transition';

	export type SpellCharType = {
		char: string;
		type: 'notInWord' | 'wrongPosition' | 'correct' | 'unchecked';
	};

	const {
		word,
		cursorIndex,
		minSize
	}: { word: SpellCharType[]; cursorIndex?: number; minSize?: number } = $props();
</script>

<!-- {#if word.length == 0}
	<span class="text-xl">Your Can Start Typing Now:</span>
{/if} -->
<div class="flex w-full flex-wrap justify-center gap-1">
	{#each word as spell, i (i)}
		<span
			animate:flip={{ duration: 200 }}
			class={[
				cursorIndex && i == cursorIndex - 1 && 'border-4  border-gray-100',
				spell.type == 'correct' && 'bg-green-500',
				spell.type == 'wrongPosition' && 'bg-orange-500',
				'flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-lg border border-gray-400  text-sm font-bold md:h-[4rem] md:w-[4rem] md:p-4 md:text-4xl'
			]}>{spell.char}</span
		>
	{/each}
	{#if minSize}
		{#each Array(minSize - word.length) as _, i (i)}
			<span
				animate:flip={{ duration: 200 }}
				class={[
					'flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-lg border border-gray-400  text-sm font-bold md:h-[4rem] md:w-[4rem] md:p-4 md:text-4xl'
				]}>{' '}</span
			>
		{/each}
	{/if}
</div>
