import React from 'react';
import { AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, RefreshControl, TextInput, Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import avatar from '../assets/images/avatar.png'

class CostumersScreen extends React.Component {

  state = { 
      data: [],
      arrayHolder: [],
      refreshing: false
  }
  


  async componentDidMount(){
    const costumers = await AsyncStorage.getItem('costumers')
    this.setState({ data: JSON.parse(costumers) })
    const { data } = this.state
    this.setState({arrayHolder: data } )
  }

  async componentDidUpdate(prevProps, prevState) {
    const { data } = this.state

    if (prevState.data !== data) {
      const costumers = await AsyncStorage.getItem('costumers')
      this.setState({ data: JSON.parse(costumers) })
    }

    if (prevProps.isFocused !== this.props.isFocused) {
      const costumers = await AsyncStorage.getItem('costumers')
      this.setState({ data: JSON.parse(costumers) })
    }
  }

  handleNavigate = () => {
    const { navigation } = this.props
    navigation.navigate('NovoCliente')
  }

  searchFilterFunction = text => {
    const newData = this.state.data.filter(item => {
      const itemData = item.name.toUpperCase()

      const textData = text.toUpperCase()

      return itemData.indexOf(textData) > -1
    })

    this.setState({arrayHolder: newData})
  }

  onRefresh = async () => {
    this.setState({refreshing: true})
    const costumers = await AsyncStorage.getItem('costumers')
    this.setState({ data: JSON.parse(costumers), refreshing: false })
    this.setState({ arrayHolder: this.state.data})
  }

  viewDetails = costumer => {
    const { navigation } = this.props;
    navigation.navigate('Detalhes', { costumer })
  }

 render() {
  const { arrayHolder } = this.state; 

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
        <View style={styles.searchView}>
          <TextInput style={styles.input} placeholder='Buscar clientes' onChangeText={ text => this.searchFilterFunction(text) } />
        </View>
        <FlatList refreshing={true} data={arrayHolder} keyExtractor={person => person.phone} renderItem={({ item }) => 
          <>
            <RectButton style={styles.list} onPress={() => this.viewDetails(item)}> 
              <Image source={item.avatarUri? ({uri: item.avatarUri}): avatar} style={styles.avatar}/>
              <View>
                <Text>{item.name}</Text> 
                <Text style={styles.description}> <Ionicons name='md-call' /> {item.phone} </Text> 
              </View>
            </RectButton>
          </>
        }/>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => this.handleNavigate()}>
        <Ionicons name="md-add" size={30} />
      </TouchableOpacity>
    </>
    
    
  );
 }
  
}

CostumersScreen.navigationOptions = {
  title: 'Clientes',
  headerStyle: {
    backgroundColor: '#F5B0C2',
  },
  headerTintColor: '#fff',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: 350,
    padding: 5,
    borderBottomColor: '#F5B0C2',
    borderBottomWidth: 3,
    borderRadius: 4,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20
  },
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
  }
});

export default CostumersScreen