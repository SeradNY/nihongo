import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getWordsLevel } from '../../api/APIJlpt';
import * as lessons from "../../utils/constants/index"

import ButtonAnswer from '../ButtonAnswer/ButtonAnswer';
import SpeechToTextButton from '../SpeechToTextButton/SpeechToTextButton';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function CardQuestion(props) {
    const [levelActive, setlevelActive] = useState(5);
    const [poolWords, setpoolWords] = useState(null)
    const [allWords, setallWords] = useState(null)
    const [wordSelected, setlwordSelected] = useState();
    const [correctWords, setlcorrectWords] = useState([])
    const [transcription, setTranscription] = useState(null)
    const [blur, setBlur] = useState(false)
    const [save, setSave] = useState(true)
    const { lesson, type } = props

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
        data && setallWords(data)
        if (save && window.localStorage.correctWords) {
            setlcorrectWords(JSON.parse(window.localStorage.correctWords))
        }
    }, [])

    useEffect(() => {
        check(transcription, "voice")
    }, [transcription])

    console.log("correctWords", correctWords)

    const getQuestionsWords = () => {
        const pool = data;
        const maxAnswers = 4;
        const itemsSelected = []

        while (itemsSelected.length < maxAnswers) {
            var r = Math.floor(Math.random() * pool.length);
            if (itemsSelected.indexOf(pool[r]) === -1 && correctWords.indexOf(pool[r]) === -1) itemsSelected.push(pool[r]);
            setpoolWords(itemsSelected.sort(() => Math.random() - 0.5))
        }
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
                        window.localStorage['correctWords'] = JSON.stringify([...correctWords, wordSelected]);
                    }
                }
            }
        } else {
            if (wordSelected === answer) {
                getQuestionsWords()
                setlcorrectWords([...correctWords, wordSelected])
                window.localStorage['correctWords'] = JSON.stringify([...correctWords, wordSelected]);
            }
        }
    }

    return (
        <View>
            <View style={styles.correctContainer}>
                {wordSelected && <Text style={styles.corrects}>{correctWords.length}/{allWords.length}</Text>}
            </View>
            <View style={styles.cardContainer}>
                {wordSelected ? <Text style={styles.textWord}>{type ? wordSelected.kj || wordSelected.furigana : wordSelected.furigana || wordSelected.word || wordSelected.jp}</Text> : <Text>Loading...</Text>}
            </View>
            {poolWords &&
                <View style={blur ? styles.blur : styles.buttonAnsers}>
                    <View>
                        {poolWords.map(function (object, i) {
                            return <ButtonAnswer key={`anwers-${i}`} label={poolWords[i].meaning || poolWords[i].esp} check={() => check(poolWords[i])} />;
                        })}
                    </View>
                    <View>
                        <SpeechToTextButton setTranscription={word => setTranscription(word)} />
                    </View>
                </View>
            }
            <Pressable style={styles.blurBtn} onPress={() => setBlur(!blur)}>
                <Text style={styles.blurBtnTxt}>
                    <MaterialCommunityIcons name="blur" size={24} color="white" />
                </Text>
            </Pressable>
            <Pressable style={[styles.blurBtn, styles.blurBtnLeft]} onPress={() => { setSave(!save); window.localStorage.removeItem("correctWords") }}>
                <Text style={styles.blurBtnTxt}>
                    <MaterialCommunityIcons name="content-save" size={24} color={save ? "gray" : "white"} />
                </Text>
            </Pressable>
        </View >
    );
}

const styles = StyleSheet.create({
    correctContainer: {
        position: "absolute",
        right: 0,
        paddingRight: "10px",
        paddingTop: "5px",
    },
    corrects: {
        color: "white",
    },
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
    },
    blur: {
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        filter: "blur(10px)"
    },
    blurBtn: {
        position: "absolute",
        bottom: "0",
        right: "10px",
        padding: "10px",
        width: "60px",
        height: "60px",
        textAlign: "center",
        justifyContent: 'center',
    },
    blurBtnTxt: {
        textAlign: "center"
    },
    blurBtnLeft: {
        left: "10px",
    }
});
