<script lang="ts">
	export type SpellCharType = {
		char: string;
		type: 'notInWord' | 'wrongPosition' | 'correct' | 'unchecked';
	};

	const { word, cursorIndex }: { word: SpellCharType[]; cursorIndex?: number } = $props();
</script>

<div class="flex gap-1">
	{#if word.length == 0}
		<span>Start typing the word...</span>
	{/if}
	{#each word as spell, i (i)}
		<span
			class={[
				cursorIndex && i == cursorIndex - 1 && 'border-4  border-gray-100',
				spell.type == 'correct' && 'bg-green-500',
				spell.type == 'wrongPosition' && 'bg-orange-500',
				'flex h-[4rem] w-[4rem] items-center justify-center rounded-lg border border-gray-400 p-4 text-4xl font-bold'
			]}>{spell.char}</span
		>
	{/each}
</div>
