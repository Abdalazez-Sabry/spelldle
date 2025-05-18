<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { InputOTP, InputOTPGroup, InputOTPSlot } from '$lib/components/ui/input-otp';
	import InputOtpGroup from '$lib/components/ui/input-otp/input-otp-group.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Icon from '@iconify/svelte';
	import { REGEXP_ONLY_CHARS } from 'bits-ui';
	import { onMount } from 'svelte';

	const { handleSubmit }: { handleSubmit: (submitted: string) => void } = $props();

	const MAX_WORD_SIZE = 20;
	const MIN_WORD_SIZE = 3;
	let wordSize = $state(MIN_WORD_SIZE);
	let word = $state('');

	function handleInput(value: string) {
		if (value.length < MIN_WORD_SIZE) {
			wordSize = MIN_WORD_SIZE;
		} else if (value.length >= MAX_WORD_SIZE) {
			wordSize = MAX_WORD_SIZE;
		} else {
			wordSize = value.length + 1;
		}
		word = word.toUpperCase();
	}

	function autoFocus(element: HTMLInputElement) {
		element.focus();
	}
</script>

<InputOTP
	maxlength={wordSize}
	pattern={REGEXP_ONLY_CHARS}
	onValueChange={handleInput}
	placeholder="Write the word"
	bind:value={word}
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			handleSubmit(word);
		}
	}}
	{@attach autoFocus}
>
	{#snippet children({ cells })}
		<InputOtpGroup class="gap-5">
			{#each cells as cell (cell)}
				<InputOTPSlot
					cell={{ ...cell, hasFakeCaret: false }}
					class="h-[4rem] w-[4rem] border-1 p-10 text-center text-6xl"
				/>
			{/each}
		</InputOtpGroup>
	{/snippet}
</InputOTP>
<Button type="submit" class="w-48 self-end" onclick={() => handleSubmit(word)}>Check</Button>
