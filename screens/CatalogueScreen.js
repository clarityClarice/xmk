import React from 'react'
import { AsyncStorage } from 'react-native'
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import Categories from '../products_data/categories-20.json'

export default class CatalogueScreen extends React.Component {
    state = {
        categories: [],
        arrayHolder: []
    }

    async componentDidMount(){
        const isThereCategories = await AsyncStorage.getItem('categories')
        if(!isThereCategories){
            await AsyncStorage.setItem('categories', JSON.stringify(Categories))
        }

        this.loadCategories()
    }

    loadCategories = async () => {
        const categoriesArray = await AsyncStorage.getItem('categories')
        this.setState({ categories: JSON.parse(categoriesArray)})
        this.setState({arrayHolder: this.state.categories.categories.new})

        this.setState({arrayHolder: this.state.arrayHolder.filter(item => {
            item.id = item.id.split('.')
            return item.id.length == 1
        })})

        console.log(this.state.arrayHolder)
        
    }


    searchFilterFunction = text => {
        const newData = this.state.categories.filter(item => {
          const itemData = item.name.toUpperCase()
    
          const textData = text.toUpperCase()
    
          return itemData.indexOf(textData) > -1
        })
    
        this.setState({arrayHolder: newData})
    }


    viewDetails = category => {
        const { navigation } = this.props

        if(category.hasChilds){
            console.log('Subcategorias')
            this.renderExpandedList(category)
        }else {
            console.log('produtos')
            //navigation.navigate('Produtos')
        }
    }

    renderExpandedList = category => {
    }

    render(){
        const { arrayHolder } = this.state
        return(
            <ScrollView>
                <View style={styles.searchView}>
                    <TextInput style={styles.input} placeholder='Buscar categorias' onChangeText={ text => this.searchFilterFunction(text) } />
                </View>
                <FlatList data={arrayHolder} keyExtractor={category => category.id} renderItem={({ item }) => 
                    <>
                        <RectButton style={styles.list} onPress={() => this.viewDetails(item)}> 
                            <View style={styles.content}>
                                <Text> {item.name}</Text>
                            </View>
                        </RectButton>
                    </>
                }/>
            </ScrollView>
        )
    }
}

CatalogueScreen.navigationOptions = {
    title: 'Catalago - Categorias',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
}

const styles = StyleSheet.create({
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
    list: { 
        margin: 5, 
        backgroundColor: '#FFE8EB', 
        height: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
})