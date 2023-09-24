import { View, StyleSheet, Text } from 'react-native'


export function Inbox(){
    return(
        <View styles={styles.container}>
            <Text>Inbox</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})