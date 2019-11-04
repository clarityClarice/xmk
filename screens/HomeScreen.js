import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import logo from '../assets/images/logo.png'

export default class HomeScreen extends Component {

  state = {
    inventory: 0,
    inventoryValue: 0.0
  }

  async componentDidMount(){
    const inventoryProducts = JSON.parse(await AsyncStorage.getItem('inventory'))
    var inventory = 0
    var inventoryValue = 0.0
    if(inventoryProducts){
      inventoryProducts.forEach(product =>{
        inventory += product.quantity
      })
      this.setState({inventory})

      inventoryProducts.forEach(product => {
        inventoryValue += (product.quantity * product.product_PRICE)
      })
      this.setState({inventoryValue})
    }
  }

  render(){

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <View style={styles.rowTitle}>
          <Text style={styles.titleText}>Estoque</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>Itens em estoque</Text>
          <Text style={styles.rowText}>{this.state.inventory}</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>Valor total</Text>
          <Text style={styles.rowText}>R${this.state.inventoryValue}</Text>
        </View>
  
        <View style={styles.rowTitle}>
          <Text style={styles.titleText}>Vendas</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>  </Text>
          <Text style={styles.rowText}>Bruto</Text>
          <Text style={styles.rowText}>Lucro</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>Hoje</Text>
          <Text style={styles.rowText}>R$0,00</Text>
          <Text style={styles.rowText}>R$0,00</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>Mês </Text>
          <Text style={styles.rowText}>R$0,00</Text>
          <Text style={styles.rowText}>R$0,00</Text>
        </View>
        <View style={styles.rows}>
          <Text style={styles.rowText}>Total</Text>
          <Text style={styles.rowText}>R$0,00</Text>
          <Text style={styles.rowText}>R$0,00</Text>
        </View>
  
  
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    alignSelf: 'center'
  },
  rowTitle: {
    backgroundColor: '#FFE8EB',
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: 20
  },
  titleText:{
    color: '#F5B0C2',
    fontWeight: 'bold',
    fontSize: 20
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#FFE8EB'
  },
  rowText: {
    fontSize: 18
  }
});
