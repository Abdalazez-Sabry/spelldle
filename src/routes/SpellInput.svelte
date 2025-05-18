<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input as input } from '$lib/components/ui/input';
	import { InputOTP, InputOTPGroup, InputOTPSlot } from '$lib/components/ui/input-otp';
	import InputOtpGroup from '$lib/components/ui/input-otp/input-otp-group.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Icon from '@iconify/svelte';
	import { REGEXP_ONLY_CHARS } from 'bits-ui';
	import { onMount } from 'svelte';
	import SpellRow, { type SpellCharType } from './SpellRow.svelte';
	import { toUncheckedSpellChar } from '$lib/utils';

	const { handleSubmitRoot }: { handleSubmitRoot: (submitted: string) => void } = $props();

	const MAX_WORD_SIZE = 20;
	const MIN_WORD_SIZE = 3;
	let word = $state('');
	let cursorIndex = $state(0);

	function handleKey(e: KeyboardEvent) {
		if (e.key == 'Enter') {
			handleSubmit(word);
			return;
		}

		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
			// insert at cursor
			word = word.slice(0, cursorIndex) + e.key.toUpperCase() + word.slice(cursorIndex);
			cursorIndex += 1;
		} else if (e.key === 'Backspace' && cursorIndex > 0) {
			word = word.slice(0, cursorIndex - 1) + word.slice(cursorIndex);
			cursorIndex -= 1;
		} else if (e.key === 'Delete' && cursorIndex < word.length) {
			word = word.slice(0, cursorIndex) + word.slice(cursorIndex + 1);
		} else if (e.key === 'ArrowLeft' && cursorIndex > 0) {
			cursorIndex -= 1;
		} else if (e.key === 'ArrowRight' && cursorIndex < word.length) {
			cursorIndex += 1;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKey);
		return () => {
			window.removeEventListener('keydown', handleKey);
		};
	});

	function handleSubmit(subm: string) {
		handleSubmitRoot(subm);
		word = '';
	}
</script>

<SpellRow word={toUncheckedSpellChar(word)} {cursorIndex} />

<Button type="submit" class="w-48 self-end" onclick={() => handleSubmit(word)}>Check</Button>
