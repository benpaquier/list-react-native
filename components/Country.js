import React from 'react'

import { Pressable, Text, Image } from 'react-native'
import { Card } from 'react-native-elements'

const Country = ({ country, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <Card.Title>
          <Text>{country.name}</Text>
        </Card.Title>
        <Card.Image source={{ uri: country.flags.png }} />
        <Card.Divider/>
        <Text>{country.capital}</Text>
        <Text>{country.region}</Text>
      </Card>
    </Pressable>
  )
}

export default Country