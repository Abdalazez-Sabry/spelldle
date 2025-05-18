<script lang="ts">
	import { Card } from '$lib/components/ui/card';
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

<main class="flex min-h-svh max-w-svw flex-col items-center gap-10 pt-10">
	<h1 class=" text-7xl">Spelldle</h1>
	<Tabs value={tabsValues.daily} class="flex max-w-[1280px] flex-col items-center gap-10">
		<TabsList class="h-auto w-[420px] max-w-full">
			<TabsTrigger class="flex-1 p-2 text-xl" value={tabsValues.daily}
				>{tabsValues.daily}</TabsTrigger
			>
			<TabsTrigger class="flex-1 p-2 text-xl" value={tabsValues.infinite}
				>{tabsValues.infinite}</TabsTrigger
			>
		</TabsList>
		<TabsContent
			value={tabsValues.daily}
			class="ring-red-200 focus-visible:ring-0 focus-visible:outline-0"
		>
			<SpellWordCard targetSpelling={'accommodate'} />
		</TabsContent>
		<TabsContent value={tabsValues.infinite}>
			<SpellWordCard targetSpelling={'accommodate'} />
		</TabsContent>
	</Tabs>
</main>
