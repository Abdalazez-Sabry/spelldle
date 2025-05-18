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

	const MAX_WORD_SIZE = 18;
	const MIN_WORD_SIZE = 2;

	let word = $state('');
	let cursorIndex = $state(0);

	const placeholderWord: SpellCharType[] = Array(4).fill({ char: ' ', type: 'unchecked' });

	function handleKey(e: KeyboardEvent) {
		if (e.key == 'Enter') {
			handleSubmit(word);
			return;
		}

		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key) && word.length < MAX_WORD_SIZE) {
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

	function stopListenningToInputs() {
		window.removeEventListener('keydown', handleKey);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKey);
		return () => {
			stopListenningToInputs();
		};
	});

	function handleSubmit(toCheck: string) {
		if (word.length >= MIN_WORD_SIZE) {
			word = '';
			cursorIndex = 0;
			handleSubmitRoot(toCheck);
		}
	}
</script>

<SpellRow word={word.length > 0 ? toUncheckedSpellChar(word) : placeholderWord} {cursorIndex} />

<Button type="submit" class="w-48 self-end" onclick={() => handleSubmit(word)}>Check</Button>
