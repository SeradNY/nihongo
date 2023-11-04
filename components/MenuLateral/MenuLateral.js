import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { delArrayItem } from '../../utils/delArrayItem';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function MenuLateral({ nivel, setNivel, lesson, setLesson, game, setGame }) {
    const [levels, setlevels] = useState(false)
    const [lessons, setlessons] = useState(false)
    const [games, setgames] = useState(false)
    const minLesson = 26;
    const maxLesson = 50;

    useEffect(() => {
        console.log("lessons leng", lesson.length, maxLesson - minLesson)
    }, [lessons])
    const filterLessons = (newLesson) => {
        if (lesson.indexOf(newLesson) === -1) {
            if (newLesson.length > 2) {
                setLesson(newLesson)
            } else {
                setLesson([...lesson, newLesson])
            }
        } else {
            const delItem = delArrayItem(lesson, lesson.indexOf(newLesson))
            setLesson(delItem)
        }
    }

    const setpartialLessons = (min, max) => {
        console.log("partial", min, max)
        var all = [];
        for (let i = min; i <= max; i++) {
            all.push(i)
        }
        return all
    }

    const lessonsArray = [];
    var count = 0
    for (let i = minLesson; i <= maxLesson; i++) {
        if (count % 4 == 0 && (i + 3) < maxLesson) {
            lessonsArray.push(
                <Pressable onPress={() => filterLessons(setpartialLessons(i, i + 3))} key={`lesson-${i}-${i + 3}`}>
                    <Text style={lesson.indexOf(i) !== -1 ? styles.active : styles.menuItemLabel}>{i}~{i + 3}</Text>
                </Pressable>);
        }
        lessonsArray.push(
            <Pressable onPress={() => filterLessons(i)} key={`lesson-${i}`}>
                <Text style={lesson.indexOf(i) !== -1 ? styles.active : styles.menuItemLabel}>{i}</Text>
            </Pressable>);
        count++;
    }

    const nivelArray = [];
    for (let i = 5; i >= 1; i--) {
        nivelArray.push(
            <Pressable onPress={() => { setNivel(i) }} key={`nivel-${i}`}>
                <Text style={nivel === i ? styles.active : styles.menuItemLabel}>N{i}</Text>
            </Pressable>);
    }

    return (
        <View style={styles.MennuLateral}>
            <View style={styles.menuItem}>
                <View style={styles.menuItemBottoms}>
                    <Text style={styles.labels}>Levels</Text>
                    <Pressable onPress={() => setlevels(!levels)}>
                        <Entypo name={`chevron-${levels ? 'down' : 'right'}`} size={24} color="#fff" />
                    </Pressable>
                </View>
                {levels &&
                    <View style={styles.menuItemContainer}>
                        {nivelArray}
                    </View >
                }
            </View >
            <View style={styles.menuItem}>
                <View style={styles.menuItemBottoms}>
                    <Text style={styles.labels}>Lessons</Text>
                    <Pressable onPress={() => setlessons(!lessons)}>
                        <Entypo name={`chevron-${lessons ? 'down' : 'right'}`} size={24} color="#fff" />
                    </Pressable>
                </View>
                {lessons &&
                    <View style={styles.menuItemContainer}>
                        <Pressable onPress={() => filterLessons(setpartialLessons(minLesson, maxLesson))} key={`lesson-todo`}>
                            <Text style={lesson.length === maxLesson - minLesson + 1 ? styles.active : styles.menuItemLabel}>TODO</Text>
                        </Pressable>
                        {lessonsArray}
                    </View >
                }
            </View>
            <View style={styles.menuItem}>
                <View style={styles.menuItemBottoms}>
                    <Text style={styles.labels}>Games</Text>
                    <Pressable onPress={() => setgames(!games)}>
                        <Entypo name={`chevron-${games ? 'down' : 'right'}`} size={24} color="#fff" />
                    </Pressable>
                </View>
                {games &&
                    <View style={styles.menuItemContainer}>
                        <Pressable onPress={() => setGame('questCard')}>
                            <Text style={game === 'questCard' ? styles.active : styles.menuItemLabel}>Radom Questions</Text>
                        </Pressable>
                        <Pressable onPress={() => setGame("questCard")}>
                            <Text style={game === "questCard" ? styles.active : styles.menuItemLabel}>Writing</Text>
                        </Pressable>
                        <Pressable onPress={() => setGame("questVoice")}>
                            <Text style={game === "questVoice" ? styles.active : styles.menuItemLabel}>Voice Quest</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    MennuLateral: {
        position: 'absolute',
        left: 0,
        top: 50,
        zIndex: 100,
        width: width,
        minHeight: height - 50,
        backgroundColor: '#353a41',
        borderTopWidth: 1,
        borderTopColor: "rgb(100 100 100)"
    },
    menuItem: {
        display: 'flex',
    },
    menuItemBottoms: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#353a41',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(100 100 100)"
    },
    labels: {
        color: "#FFF",
        fontSize: 28,
    },
    menuItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "rgb(100 100 100)",
        paddingVertical: 10,
    },
    menuItemLabel: {
        color: "#FFF",
        fontSize: 20,
        paddingHorizontal: 25,
    },
    active: {
        color: "#FFF",
        fontSize: 20,
        paddingHorizontal: 25,
        backgroundColor: "rgb(100 100 100)",
    }
});
