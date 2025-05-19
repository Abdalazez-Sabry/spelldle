<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Tooltip } from '$lib/components/ui/tooltip';
	import SpelldleAnimatedLogo from '../SpelldleAnimatedLogo.svelte';
	import SpellWordCard from '../SpellWordCard.svelte';
	import { ChevronLeft } from '@lucide/svelte';
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center gap-10 pt-10">
	<div class="flex h-fit flex-row items-center justify-center gap-10">
		<Tooltip text="Go To Home">
			<Button
				variant="icon"
				class="flex cursor-default items-center justify-center [&_svg]:size-20"
				href="/"><ChevronLeft /></Button
			>
		</Tooltip>
		<h1 class=" text-4xl font-bold md:text-7xl">Spelldle Daily</h1>
	</div>
	<div class="flex flex-col items-center gap-10">
		<SpellWordCard targetSpelling={'accommodate'} />
	</div>
</main>
