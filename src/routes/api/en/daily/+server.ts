import type { DictionaryApiResponse } from "../spelldle";
import type { RequestHandler } from "@sveltejs/kit";
import { API_BASE, extractWordData, MAX_NUMBER_OF_TRIES, randomSelection, sleep } from "../spelldle"
import { dailyWords } from "../words"

const dailyCache = new Map<string, DictionaryApiResponse>();


export const GET: RequestHandler = async () => {
    let numberOfTries = 0
    const currentDate = new Date().toDateString()


    while (true) {
        numberOfTries += 1
        const todaysKey = currentDate + numberOfTries

        if (dailyCache.has(todaysKey)) {
            const result = extractWordData(dailyCache.get(todaysKey)!)
            if (result) {
                return new Response(JSON.stringify(result))
            }
        }

        const wordIndex = await randomSelection(dailyWords.length, todaysKey)
        const todaysWord = dailyWords[wordIndex]
        const res = await fetch(`${API_BASE}/${todaysWord}`)
        if (res.status == 200) {
            const jsn = await res.json() as DictionaryApiResponse
            const result = extractWordData(jsn)
            if (result) {
                dailyCache.set(todaysKey, jsn)
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