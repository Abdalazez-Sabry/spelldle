import { dailyWords, easyWords, hardWords, mediumWords } from "./words";

export type Difficulty = "easy" | "medium" | "hard"


const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en"

export type DictionaryApiResponse = {
    word: string;
    phonetics: {
        text?: string;
        audio?: string;
        sourceUrl?: string;
        license?: {
            name: string;
            url: string;
        };
    }[];
    meanings: {
        partOfSpeech: string;
        definitions: {
            definition: string;
            example?: string;
            synonyms?: string[];
            antonyms?: string[];
        }[];
        synonyms?: string[];
        antonyms?: string[];
    }[];
    license?: {
        name: string;
        url: string;
    };
    sourceUrls?: string[];
}[];

export type WordInfo = {
    word: string,
    audio: string,
    definitions: string[]
}

async function randomSelection(
    arrayLength: number,
    seed?: string,
): Promise<number> {
    if (!seed) {
        const rand = crypto.getRandomValues(new Uint32Array(1))[0];
        return rand % arrayLength;
    }
    const enc = new TextEncoder();
    const keyData = enc.encode(seed);
    const msgData = enc.encode("");

    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, msgData);

    const sigBytes = new Uint8Array(signature).slice(0, 8);
    let num = 0n;
    for (const b of sigBytes) {
        num = (num << 8n) | BigInt(b);
    }

    return Number(num % BigInt(arrayLength));
}


function extractWordData(response: DictionaryApiResponse): WordInfo | null {
    if (!response || response.length === 0) return null;

    const entry = response[0];
    const word = entry.word.toLowerCase();

    // Get first available audio
    const audioUrl = entry.phonetics.find(p => p.audio)?.audio || null;

    if (!audioUrl) {
        return null
    }

    // Get first two definitions that do not contain the word
    const definitions: string[] = [];

    for (const meaning of entry.meanings) {
        for (const def of meaning.definitions) {
            if (
                definitions.length < 2 &&
                !def.definition.toLowerCase().includes(word)
            ) {
                definitions.push(def.definition);
            }
            if (definitions.length >= 2) break;
        }
        if (definitions.length >= 2) break;
    }

    return {
        word: entry.word,
        audio: audioUrl,
        definitions,
    };
}

export async function getDailyWord(): Promise<WordInfo> {
    let tryCounter = 0

    while (true) {
        const wordIndex = await randomSelection(dailyWords.length, new Date().toDateString() + tryCounter)
        const todaysWord = dailyWords[wordIndex]
        const res = await fetch(`${API_BASE}/${todaysWord}`)
        if (res.status == 200) {
            const result = extractWordData(await res.json())
            if (result) {
                return result
            }
        }
    }
}

export async function getInfiniteWord(difficulty: Difficulty): Promise<WordInfo> {
    const arr = difficulty == "easy" ? easyWords : difficulty == "medium" ? mediumWords : hardWords

    while (true) {
        const wordIndex = await randomSelection(arr.length)
        const todaysWord = arr[wordIndex]
        const res = await fetch(`${API_BASE}/${todaysWord}`)
        if (res.status == 200) {
            const result = extractWordData(await res.json())
            if (result) {
                return result
            }
        }
    }
}