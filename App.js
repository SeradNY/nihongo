import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import CardQuestion from './components/CardQuestion/CardQuestion';
import NavBar from './components/NavBar/Navbar';
import MenuLateral from './components/MenuLateral/MenuLateral';
import VoiceQuest from './components/VoiceQuest/VoiceQuest';

export default function App() {
  const [menu, setmenu] = useState(false);
  const [game, setgame] = useState("questCard");
  const [start, setstart] = useState(false);
  const [lesson, setlesson] = useState([26]);
  const [nivel, setnivel] = useState(0);
  const [changeType, setchangetype] = useState(false)

  const selectGame = () => {
    const games = {
      "questCard": <CardQuestion
        lesson={lesson}
        nivel={nivel}
        type={changeType} />,
      "questVoice": <VoiceQuest
        lesson={lesson}
        nivel={nivel}
        type={changeType} />
    }
    console.log("gameNumber", game)
    return games[game]
  }

  useEffect(() => {
    console.log("change", lesson)
    console.log("game", game)
    console.log("type", changeType)
  }, [lesson, nivel, changeType])

  return (
    <View>
      <View style={styles.navBar}>
        <NavBar openMenu={() => setmenu(!menu)} changeType={() => setchangetype(!changeType)}></NavBar>
      </View>
      {menu &&
        <MenuLateral
          lesson={lesson}
          nivel={nivel}
          game={game}
          setLesson={(ls) => setlesson(ls)}
          setNivel={(nv) => setnivel(nv)}
          setGame={(gm) => setgame(gm)}
        >
        </MenuLateral>}

      <View style={styles.container}>
        {!start ?
          <Pressable style={styles.button} onPress={() => setstart(!start)}>
            <Text style={styles.text}>Start Game</Text>
          </Pressable>
          :
          <View>
            {selectGame()}
          </View>
        }
      </View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  buttonAnsers: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#353a41'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#841584',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
