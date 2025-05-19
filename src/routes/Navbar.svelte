<script>
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
</script>

<nav
	class="flex w-full justify-center border-b px-5 py-4 md:px-20"
	style="view-transition-name: nav;"
>
	<div class="flex w-full max-w-[800px] flex-row items-center justify-between">
		<a href="/">
			<h2 class="flex flex-row items-center gap-0.5 text-2xl md:text-3xl">
				<span
					class={'bg-accent text-background md:text2xl flex h-[2rem] w-[2rem]  items-center justify-center rounded-lg border border-gray-400 font-semibold md:h-[2.5rem] md:w-[2.5rem] md:font-bold'}
					>S</span
				>
				pelldle
			</h2>
		</a>
		<div class="flex flex-row items-center justify-center gap-5">
			<Button
				variant="link"
				href="/daily"
				class={cn(page.route.id == '/daily' && 'text-accent underline', 'text-xl')}>Daily</Button
			>
			<Button
				variant="link"
				href="/infinite"
				class={cn(page.route.id == '/infinite' && 'text-accent underline', 'text-xl')}
				>Infinite</Button
			>
		</div>
	</div>
</nav>
