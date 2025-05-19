<script lang="ts">
	import { Button, Button as button } from '$lib/components/ui/button';
	import { Input as input } from '$lib/components/ui/input';
	import { InputOTP, InputOTPGroup, InputOTPSlot } from '$lib/components/ui/input-otp';
	import InputOtpGroup from '$lib/components/ui/input-otp/input-otp-group.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Icon from '@iconify/svelte';
	import { REGEXP_ONLY_CHARS } from 'bits-ui';
	import { onMount } from 'svelte';
	import SpellRow, { type SpellCharType } from './SpellRow.svelte';
	import { toUncheckedSpellChar } from '$lib/utils';
	import { CornerDownLeft, EyeOff, Flag, Flashlight } from '@lucide/svelte';
	import { Tooltip } from '$lib/components/ui/tooltip';

	const {
		handleSubmitRoot,
		playAudio,
		revealAnswer
	}: {
		handleSubmitRoot: (submitted: string) => void;
		playAudio: () => void;
		revealAnswer: () => void;
	} = $props();

	const MAX_WORD_SIZE = 18;
	const MIN_WORD_SIZE = 2;

	let word = $state('');
	let cursorIndex = $state(0);

	const placeholderWord: SpellCharType[] = Array(3).fill({ char: ' ', type: 'unchecked' });

	function handleKey(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		if (e.key == 'Enter') {
			handleSubmit(word);
			return;
		}

		e.preventDefault();

		const el = document.activeElement;
		if (el instanceof HTMLElement) el.blur();

		if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key) && word.length < MAX_WORD_SIZE) {
			// insert at cursor
			word = word.slice(0, cursorIndex) + e.key.toUpperCase() + word.slice(cursorIndex);
			cursorIndex += 1;
		} else if (e.key === ' ') {
			playAudio();
		} else if (e.key === 'Escape') {
			revealAnswer();
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

<div class="flex w-[360px] max-w-full justify-between md:w-[600px]">
	<Tooltip text="Reveal Answer (Esc)">
		<Button variant="icon" class="  self-end [&_svg]:size-10" onclick={() => revealAnswer()}>
			<Flashlight />
		</Button>
	</Tooltip>
	<Tooltip text="Check Spelling (Enter)">
		<Button variant="icon" class="  self-end [&_svg]:size-10" onclick={() => handleSubmit(word)}>
			<CornerDownLeft />
		</Button>
	</Tooltip>
</div>
