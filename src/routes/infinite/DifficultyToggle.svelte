<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
	import { pushState, goto } from '$app/navigation';

	let {
		difficulty = $bindable(),
		getNextWord
	}: { difficulty: string; getNextWord: () => Promise<void> } = $props();

	function changeDifficulty(diff: string) {
		pushState(`/infinite?difficulty=${diff}`, {
			replaceState: true
		});
		getNextWord();
	}
</script>

<div class="just-between flex w-full max-w-[400px] flex-row justify-between">
	<h6 class="text-muted-foreground text-lg">Difficulty:</h6>
	<ToggleGroup
		class="just-between flex flex-row gap-10"
		bind:value={difficulty}
		type="single"
		onValueChange={changeDifficulty}
	>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'easy' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="easy"
				id="easy"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="easy">Easy</Label>
			</ToggleGroupItem>
		</div>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'medium' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="medium"
				id="medium"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="medium">Medium</Label>
			</ToggleGroupItem>
		</div>
		<div
			class={cn(
				'text-muted-foreground flex flex-row items-center space-x-2',
				difficulty == 'hard' && 'text-foreground'
			)}
		>
			<ToggleGroupItem
				value="hard"
				id="hard"
				class="data-[state=on]:text-accent data-[state=on]:bg-primary"
			>
				<Label for="hard">Hard</Label>
			</ToggleGroupItem>
		</div>
	</ToggleGroup>
</div>
