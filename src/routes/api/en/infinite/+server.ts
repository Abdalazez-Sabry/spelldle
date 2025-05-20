import type { RequestHandler } from "@sveltejs/kit";
import { API_BASE, extractWordData, MAX_NUMBER_OF_TRIES, randomSelection, sleep, type DictionaryApiResponse } from "../spelldle"
import { easyWords, hardWords, mediumWords } from "../words"

export type Difficulty = "easy" | "medium" | "hard"
const infiniteChache = new Map<string, DictionaryApiResponse>();


export const GET: RequestHandler = async ({ request }) => {
    const difficulty = new URLSearchParams(request.url).get("difficulty")
    const arr = difficulty == "easy" ? easyWords : difficulty == "medium" ? mediumWords : difficulty == "hard" ? hardWords : easyWords

    let numberOfTries = 0

    while (true) {
        numberOfTries += 1

        const wordIndex = await randomSelection(arr.length)
        const word = arr[wordIndex]

        if (infiniteChache.has(word)) {
            const result = extractWordData(infiniteChache.get(word)!)
            if (result) {
                return new Response(JSON.stringify(result))

            }
        }

        const res = await fetch(`${API_BASE}/${word}`)
        if (res.status == 200) {
            const jsn = await res.json() as DictionaryApiResponse
            const result = extractWordData(jsn)
            if (result) {
                infiniteChache.set(word, jsn)
                return new Response(JSON.stringify(result))

            }
        }

        if (numberOfTries > MAX_NUMBER_OF_TRIES) {
            return new Response(`Faild to get word data, number of tries:${MAX_NUMBER_OF_TRIES}`, {
                status: 400
            })
        }
        await sleep()
    }
}