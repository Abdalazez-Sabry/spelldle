<script lang="ts">
	import {
		Tabs,
		TabsContent as div,
		TabsList,
		TabsTrigger,
		TabsContent
	} from '$lib/components/ui/tabs';
	import SpellWordCard from './SpellWordCard.svelte';

	const tabsValues = { daily: 'Daily', infinite: 'Infinite' };
</script>

<main class="flex min-h-svh max-w-svw flex-col items-center justify-center gap-10">
	<h1 class="text-8xl">Spelldle</h1>
	<Tabs value={tabsValues.daily} class="flex max-w-[1280px] flex-col gap-10">
		<TabsList class="h-auto w-full">
			<TabsTrigger class="flex-1 p-4 text-3xl" value={tabsValues.daily}
				>{tabsValues.daily}</TabsTrigger
			>
			<TabsTrigger class="flex-1 p-4 text-3xl" value={tabsValues.infinite}
				>{tabsValues.infinite}</TabsTrigger
			>
		</TabsList>
		<TabsContent value={tabsValues.daily}>
			<SpellWordCard targetSpelling={'accommodate'} />
		</TabsContent>
		<TabsContent value={tabsValues.infinite}>
			<SpellWordCard targetSpelling={'accommodate'} />
		</TabsContent>
	</Tabs>
</main>
