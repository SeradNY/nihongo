import * as lessons from "../utils/constants/index"
import useFetch from '../utils/hooks/useFetch';
const URL = 'https://jlpt-vocab-api.vercel.app/api/words';

export function getWordsLevel(level) {
    const { error, data } = useFetch(`${URL}/all?level=${level}`);
    window.localStorage['words'] = JSON.stringify(data);
    return { error, data }
}

export function getWordsSearch(word) {
    const { error, data } = useFetch(`${URL}?word=${word}`);
    return { error, data }
}

export function getWordsRandom(level) {
    const { error, data } = useFetch(`${URL}/random?level=${level}`);
    return { error, data }
}