<script>
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from '@lucide/svelte';
</script>

<footer
	class="flex w-full items-center justify-center border-t py-5"
	style="view-transition-name: footer;"
>
	<p class="flex flex-row flex-wrap items-center justify-center gap-2.5">
		Spelldle is <Button
			variant="link"
			href="https://github.com/abdalazez-sabry/spelldle"
			target="_blank"
			class="flex gap-0.5">open source <ExternalLink /></Button
		>
		and was made by <Button
			variant="link"
			href="https://github.com/Abdalazez-Sabry"
			target="_blank"
			class="flex gap-0.5">Abdalazez <ExternalLink /></Button
		>
	</p>
</footer>
