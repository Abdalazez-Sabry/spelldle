export type WordInfo = {
    word: string,
    audio: string,
    definitions: string[]
}

export async function getDailyWord(): Promise<WordInfo> {
    const result = await fetch("/api/en/daily")
    const jsn = (await result.json()) as WordInfo
    return jsn

}

export async function getInfiniteWord(difficulty: string): Promise<WordInfo> {
    const result = await fetch(`/api/en/infinite?difficulty=${difficulty}`)
    const jsn = (await result.json()) as WordInfo
    return jsn
}