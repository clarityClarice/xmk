import React from 'react';
import { RectButton } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


export default class ProductsScreen extends React.Component {

  handleNavigateCatalogue = () => {
    const { navigation } = this.props
    navigation.navigate('Catalago')
  }

  render(){
    return (
      <ScrollView style={styles.Container}>
        <View style={styles.buttonRow}>
          <RectButton style={styles.pathButton} onPress={() => this.handleNavigateCatalogue()}>
            <Ionicons name="md-bookmarks" color="#F5B0C2" size={50}/>
            <Text style={styles.buttonText}>Catálago</Text>
          </RectButton>
          <RectButton style={styles.pathButton}>
            <Ionicons name="md-clipboard" color="#F5B0C2" size={50}/>
            <Text style={styles.buttonText}>Estoque</Text>
          </RectButton>
        </View>
        <View style={styles.buttonRow}>
          <RectButton style={styles.pathButton}>
            <Ionicons name="md-star" color="#F5B0C2" size={50}/>
            <Text style={styles.buttonText}>Favoritos</Text>
          </RectButton>
          <RectButton style={styles.pathButton}>
            <Ionicons name="md-cart" color="#F5B0C2" size={50}/>
            <Text style={styles.buttonText}>Pedidos</Text>
          </RectButton>
        </View>
        <View style={styles.buttonRow} >
          <RectButton style={styles.pathButton}>
            <Ionicons name="md-search" color="#F5B0C2" size={50}/>
            <Text style={styles.buttonText}>Buscar</Text>
          </RectButton>
        </View>
      </ScrollView>
    )
  }
}

ProductsScreen.navigationOptions = {
  title: 'Produtos',
  headerStyle: {
    backgroundColor: '#F5B0C2',
  },
  headerTintColor: '#fff',
}


const styles = StyleSheet.create({
  Container: {

  },
  buttonRow: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around"
  },
  pathButton: {
    width: 150,
    height: 150,
    borderRadius: 4,
    backgroundColor: '#FFE8EB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 20
  }
})