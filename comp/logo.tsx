import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

// @ts-ignore
const logo = ({large}) => {
  return (

    <View>
    {large ? (
        <View style={styles.wrap}>
            <Image style={styles.img} source={require('../assets/full.png')}/>
            <Text style={styles.txt}>LINK</Text>
        </View>
    ) : (
        <View style={styles.swrap}>
            <Image style={styles.simg} source={require('../assets/full.png')}/>
        </View>
    )}
    </View>
  )
}
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        maxHeight: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 60,
        height: 60
    },
    simg: {
        width: 60,
        height: 60
    },
    txt: {
        fontWeight: '900',
        fontSize: 75
    }
})
export default logo