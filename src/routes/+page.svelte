<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import SpelldleAnimatedLogo from './SpelldleAnimatedLogo.svelte';
	import SpellWordCard from './SpellWordCard.svelte';
</script>

<div class="flex flex-1 flex-col justify-center gap-10 px-4">
	<SpelldleAnimatedLogo />
	<p class="text-muted-foreground md:text-lg">
		A game where the audio of a random word is played, and your goal is to write that word correctly
	</p>
	<div class="flex flex-col items-center justify-center gap-4 px-2">
		<h4 class="text-2xl md:text-4xl">Choose Mode</h4>
		<Button
			variant="link"
			href="/daily"
			class="text-muted-foreground text-xl md:text-3xl"
			data-direction="backword">Daily</Button
		>
		<Button variant="link" class="text-muted-foreground text-xl md:text-3xl" href="/infinite"
			>Infinite</Button
		>
	</div>
</div>
