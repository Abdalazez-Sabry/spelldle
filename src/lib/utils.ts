import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SpellCharType } from "../routes/SpellRow.svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toUncheckedSpellChar(str: string): SpellCharType[] {
	return str.split('').map((char) => ({
		char,
		type: 'unchecked'
	}));
}


export function toCorrectSpellChar(str: string): SpellCharType[] {
	return str.split('').map((char) => ({
		char,
		type: 'correct'
	}));
}

export function toEvaluatedSpellChar(toCheck: string, target: string): SpellCharType[] {
	const result: SpellCharType[] = toCheck.split('').map((char) => ({
		char,
		type: 'notInWord'
	}));

	let targetRest = ""
	let i = 0

	for (i = 0; i < target.length && i < toCheck.length; i++) {
		if (toCheck[i] == target[i]) {
			result[i].type = "correct"
		} else {
			targetRest += target[i]
		}
	}
	targetRest += target.slice(i)

	for (i = 0; i < toCheck.length; i++) {
		const charPos = targetRest.indexOf(toCheck[i])
		if (result[i].type != "correct" && charPos != -1) {
			result[i].type = "wrongPosition"
			targetRest = targetRest.slice(0, charPos) + targetRest.slice(charPos + 1)
		}
	}


	return result
}