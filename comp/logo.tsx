import { View, Text } from 'react-native'
import React from 'react'

const logo = ({large}) => {
  return (

    <View>
    {large ? (
        <Text>Large Placeholder</Text>
    ) : (
        <Text>Small Placeholder</Text>
    )}
    </View>
  )
}

export default logo