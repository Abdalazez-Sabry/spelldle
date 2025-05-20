<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { playAudio }: { playAudio: () => void } = $props();

	onMount(() => {
		playAudio();
	});
</script>

<Tooltip text="Listen To The Word (space)">
	<Button
		class="text-muted-foreground active:text-accent text-xl md:text-3xl [&_svg]:size-10"
		variant="ghost"
		onclick={playAudio}
	>
		<span class="inline-block size-10">
			<Icon icon="material-symbols:play-circle-outline" />
		</span>
		Listen Again
	</Button>
</Tooltip>
