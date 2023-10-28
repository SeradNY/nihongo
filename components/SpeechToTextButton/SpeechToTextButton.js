import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function SpeechToTextButton({ setTranscription }) {
    const [listening, setListening] = useState(false);
    const recognition = new window.webkitSpeechRecognition();

    if ("webkitSpeechRecognition" in window) {
        recognition.lang = "ja-JP";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 10;

        recognition.onresult = (event) => {
            const result = event.results[0];
            setTranscription(result)
        };

        recognition.onspeechend = function (event) {
            recognition.stop();
            setListening(false);
        }

        recognition.onnomatch = function (event) {
            console.log("I didn't recognise that word.", event);
            setListening(false);
        }

        recognition.onerror = function (event) {
            console.log('Error occurred in recognition: ' + event.error)
            setListening(false);
        }
    }

    const toggleSpeechRecognition = () => {
        console.log('Ready to receive a word.');
        recognition.start();
        setListening(true);
    };

    const styles = StyleSheet.create({
        containerButton: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 30,
            elevation: 3,
            backgroundColor: !listening ? '#841584' : "transparent",
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
        logo: {
            width: 66,
            height: 58,
        },
    });

    return (
        <View style={styles.containerButton}>
            <Pressable style={styles.button} onPress={() => toggleSpeechRecognition()}>
                {!listening ?
                    <Text style={styles.text}>Voice</Text>
                    :
                    <Image
                        source={require('../../assets/recording.gif')}
                        style={{ width: 30, height: 30 }}
                    />


                }
            </Pressable>
        </View>
    );
};