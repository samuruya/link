import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'


const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
            <Text style={styles.text}>{ text }</Text>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        textAlign: 'center',
        padding: 20,
        backgroundColor: Colors.primary
    },
    text: {
        textAlign: 'center',
        color: Colors.background
    }
})
export default Button