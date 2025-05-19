<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	let audio: HTMLAudioElement;

	const { audioUrl }: { audioUrl: string } = $props();

	function playAudio() {
		audio.currentTime = 0;
		audio.play();
	}
	onMount(() => {
		audio.play();
	});
</script>

<Button
	class="text-muted-foreground text-xl md:text-3xl [&_svg]:size-10"
	variant="ghost"
	onclick={playAudio}
>
	<span class="inline-block size-10">
		<Icon icon="material-symbols:play-circle-outline" />
	</span>
	Listen Again
</Button>
<audio src={audioUrl} bind:this={audio}></audio>
