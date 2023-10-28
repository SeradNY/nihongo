import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { getWordsLevel } from '../../api/APIJlpt';
import * as lessons from "../../utils/constants/index"

import ButtonAnswer from '../ButtonAnswer/ButtonAnswer';
import SpeechToTextButton from '../SpeechToTextButton/SpeechToTextButton';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function VoiceQuest({ lesson }) {
    const [levelActive, setlevelActive] = useState(5);
    const [poolWords, setpoolWords] = useState(null)
    const [wordSelected, setlwordSelected] = useState();
    const [correctWords, setlcorrectWords] = useState([]);
    const [transcription, setTranscription] = useState(null)

    const getWordsByLesson = () => {
        const data = []
        lesson.map(ls => data.push(...lessons[`l${ls}`]))
        return data
    }

    if (lesson) {
        var data = getWordsByLesson(lesson);
    } else {
        var data = getWordsLevel(levelActive);
    }

    useEffect(() => {
        data && setpoolWords(data)
        data && getQuestionsWords()
    }, [])

    useEffect(() => {
        check(transcription, "voice")
    }, [transcription])

    console.log("correctWords voice", correctWords)

    const getQuestionsWords = () => {
        const pool = data;
        const maxAnswers = 1;
        const itemsSelected = []

        var r = Math.floor(Math.random() * pool.length);
        if (itemsSelected.indexOf(pool[r]) === -1 && correctWords.indexOf(pool[r]) === -1) itemsSelected.push(pool[r]);
        setpoolWords(itemsSelected.sort(() => Math.random() - 0.5))
        console.log("itemsSelected", itemsSelected[Math.floor(Math.random() * maxAnswers)])
        setlwordSelected(itemsSelected[Math.floor(Math.random() * maxAnswers)])
    }

    const check = (answer, type = null) => {
        console.log("voice", wordSelected, answer)
        if (type === "voice" && wordSelected) {
            for (let variant in answer) {
                if (answer[variant].transcript) {
                    if (answer[variant].transcript === wordSelected.jp || answer[variant].transcript === wordSelected.kj) {
                        getQuestionsWords()
                        setlcorrectWords([...correctWords, wordSelected])
                    }
                }
            }
        } else {
            if (wordSelected === answer) {
                getQuestionsWords()
                setlcorrectWords([...correctWords, wordSelected])
            }
        }
    }

    return (
        <View>
            <View style={styles.cardContainer}>
                {wordSelected ? <Text style={styles.textWord}>{wordSelected.esp || wordSelected.furigana || wordSelected.word || wordSelected.jp}</Text> : <Text>Loading...</Text>}
            </View >
            {poolWords &&
                <View style={styles.buttonAnsers}>
                    <SpeechToTextButton setTranscription={word => setTranscription(word)} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: width - 20,
        minHeight: 70,
        alignItems: 'center',
        border: '5px solid #353a41',
    },
    cardOptions: {
        display: 'flex',
        flexDirection: "column"
    },
    textWord: {
        color: '#fff',
        fontSize: 24,
    },
    buttonAnsers: {
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }
});
