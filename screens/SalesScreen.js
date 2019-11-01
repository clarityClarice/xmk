import React from 'react';
import { RectButton } from 'react-native-gesture-handler'

import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import avatar from '../assets/images/avatar.png'

export default class SalesScreen extends React.Component{
  state = { 
    sales: [
      { 
        costumer: 
          {
            name: 'Clarice',
            phone: '47999999999',
            email: 'clarity.clarice@gmail.com',
            avatarUri: ''
          },
          totalPrice: 52.60,
          date: '01-11-2019'
      }
    ],
    refreshing: false
  }

  onRefresh = () => {

  }

  viewDetails = sale => {

  }

  handleNavigate = () => {
    const { navigation } = this.props;
    navigation.navigate('NovaVenda')
  }

render(){
  const { sales } = this.state
  return (
    <>
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >

        <FlatList refreshing={true} data={sales} keyExtractor={sale => sale.costumer.phone} renderItem={({ item }) => 
          <>
            <RectButton style={styles.list} onPress={() => this.viewDetails(item)}> 
              <Image source={item.costumer.avatarUri? ({uri: item.costumer.avatarUri}): avatar} style={styles.avatar}/>
              <View style={styles.costumerData}>
                <Text style={styles.costumerName}><Ionicons name='md-person' size={18} /> {item.costumer.name}</Text> 
                <View style={styles.descriptionContainer}>
                  <Text style={styles.dateText}><Ionicons name='md-calendar' size={15}/> {item.date} </Text> 
                </View>
              </View>
              <Text style={styles.totalPrice}> R${item.totalPrice} </Text>
            </RectButton>
          </>
        }/>

      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => this.handleNavigate()}>
        <Ionicons name="md-add" size={30} />
      </TouchableOpacity>
    </>
  )
}
  
}

SalesScreen.navigationOptions = {
  title: 'Vendas',
  headerStyle: {
    backgroundColor: '#F5B0C2',
  },
  headerTintColor: '#fff',
};

const styles = StyleSheet.create({
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#F5B0C2', 
    borderRadius: 30, 
    elevation: 8 
  },
  list: { 
    margin: 5, 
    backgroundColor: '#FFE8EB', 
    height: 80, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalPrice: {
    right: -100,
    fontSize: 20,
    fontWeight: 'bold'
  },
  costumerName:{
    fontSize: 18
  },
  costumerData: {
    marginLeft: 10
  }

})