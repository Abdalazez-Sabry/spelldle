<script lang="ts">
	import { cn, toEvaluatedSpellChar } from '$lib/utils';
	import gsap from 'gsap';
	import TextPlugin from 'gsap/TextPlugin';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	const SPELLDLE = 'SPELLDLE';
	const ITER_WORDS = ['SPELLDLE', 'SPLDLE', 'SPEELDLE'];
	const WRITE_DURATION = 0.15;
	const HOLD_DURATION = 5;

	let currentIndex = $state(0);
	let evaluated = $derived(toEvaluatedSpellChar(ITER_WORDS[currentIndex], SPELLDLE));

	function writeAnimation(el: HTMLElement) {
		$effect(() => {
			const _ = currentIndex;
			const spans = Array.from(el.children) as HTMLElement[];

			const tl = gsap.timeline({ repeatDelay: 0.5 });

			tl.set(spans, { opacity: 0 });

			spans.forEach((span) => {
				tl.set(span, {}).to(span, { opacity: 1, duration: WRITE_DURATION });
			});

			tl.to({}, { duration: HOLD_DURATION });

			spans
				.slice()
				.reverse()
				.forEach((span) => {
					tl.to(span, { opacity: 0, duration: WRITE_DURATION }).set(span, {});
				});
			tl.eventCallback('onComplete', () => {
				currentIndex = (currentIndex + 1) % ITER_WORDS.length;
			});
		});
	}
</script>

<h1 class=" flex flex-row gap-0.5 font-bold" {@attach writeAnimation}>
	{#each evaluated as spell, i (i)}
		<span
			transition:scale
			class={cn(
				spell.type == 'correct' && 'bg-green-500',
				spell.type == 'wrongPosition' && 'bg-orange-500',
				i == 0 && 'bg-accent text-background z-0 ',
				'z-10 flex h-[3rem] w-[3rem]  items-center justify-center rounded-lg border border-gray-400 text-2xl font-semibold opacity-0 md:font-bold xl:h-[4rem] xl:w-[4rem] xl:text-5xl'
			)}
		>
			{spell.char}
		</span>
	{/each}
</h1>
