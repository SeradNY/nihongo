import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function NavBar(props) {
    return (
        <View style={styles.NavBar}>
            <Pressable style={styles.menu} onPress={() => props.openMenu()}>
                <Entypo name="menu" size={24} color="#fff" />
            </Pressable>
            <Pressable style={styles.menu} onPress={() => props.changeType()}>
                <Entypo name="language" size={18} color="#fff" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    NavBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        minHeight: 50,
        alignItems: 'center',
        backgroundColor: '#353a41'
    },
    menu: {
        marginHorizontal: 10,
    }
});
