<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as TT from '$lib/components/ui/tooltip/index.js';
	import type { Snippet } from 'svelte';
	const { children, text }: { children: Snippet; text: string } = $props();
</script>

<TT.Provider>
	<TT.Root delayDuration={0}>
		<TT.Trigger>
			{#snippet child({ props })}
				<div {...props}>
					{@render children()}
				</div>
			{/snippet}
		</TT.Trigger>
		<TT.Content>
			{text}
		</TT.Content>
	</TT.Root>
</TT.Provider>
