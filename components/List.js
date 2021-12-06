import React, { useState, useEffect } from 'react'

import styled from 'styled-components/native'
import { Text, FlatList, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native'
import { Overlay } from 'react-native-elements'
import Country from './Country'

const Container = styled.View`
  padding: 15px 10px;
  margin-top: 40px;
`

const LanguageButton = styled.TouchableOpacity`
  background-color: salmon;
  margin-bottom: 10px;
  padding: 10px 20px;
`

const CloseButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 10px 20px;
`

const List = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisibile, setIsModalVisibile] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <ActivityIndicator size="large" color="teal" />
    )
  }

  if (countries.length === 0) {
    return (
      <Text>
        Une erreur est survenue de l'api.
      </Text>
    )
  }

  const filteredCountries = countries
    .filter(country => {
      return (
        country.languages.map(language => language.name).includes(selectedLanguage)
        || !selectedLanguage
      )
    })

  return (
    <Container>
      {selectedCountry &&
        <Overlay
          visible={isModalVisibile}
          onBackdropPress={() => setIsModalVisibile(false)}
          overlayStyle={{
            height: 400
          }}
        >
          <FlatList
            data={selectedCountry.languages}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <LanguageButton onPress={() => {
                setSelectedLanguage(item.name)
                setIsModalVisibile(false)
              }}>
                <Text>
                  {item.name}
                </Text>
              </LanguageButton>
            )}
          />
          <CloseButton onPress={() => setIsModalVisibile(false)}>
            <Text>Fermer</Text>
          </CloseButton>
          <CloseButton onPress={() => {
            setSelectedLanguage(null)
            setIsModalVisibile(false)
          }}>
            <Text>Annuler selection language</Text>
          </CloseButton>
        </Overlay>
      }
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Country
            country={item}
            onPress={() => {
              setIsModalVisibile(true)
              setSelectedCountry(item)
            }}
          />
        )}
      />
    </Container>
  )
}

export default List
