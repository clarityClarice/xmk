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

import Products from '../products_data/products-20.json'

export default class ProductListScreen extends React.Component {
    state={
        products: [],
        category: {}
    }

    componentDidMount(){
        this.getCategoryFromProps()
        this.getProductsFromCategory()
    }

    getCategoryFromProps = () => {
        const { navigation } = this.props
        const category = navigation.getParam('category')
        this.setState({ category })
    }

    getProductsFromCategory = async () => {
        const isThereProducts = await AsyncStorage.getItem('products')
        if(!isThereProducts){
            await AsyncStorage.setItem('products', JSON.stringify(Products))
        }

        const productsObject =  JSON.parse(await AsyncStorage.getItem('products'))
        const products = productsObject.products.new.filter( item => {
            item.category = item.category.split('.')
            if(this.state.category.id.length ===1 ){
                return item.category[0] == this.state.category.id[0]
            }else if(this.state.category.id.length === 2) {
                return item.category[0] == this.state.category.id[0] && item.category[1] == this.state.category.id[1]
            }else if (this.state.category.id.length ===3) {
                return item.category[0] == this.state.category.id[0] && item.category[1] == this.state.category.id[1] && item.category[2] == this.state.category.id[2]
            }else if (this.state.category.id.length === 4) {
                return item.category[0] == this.state.category.id[0] && item.category[1] == this.state.category.id[1] && item.category[2] == this.state.category.id[2] && item.category[3] == this.state.category.id[3] 
            }
            
        })
        this.setState({ products })
    }

    handleDetails = product => {
        const { navigation } = this.props
        navigation.navigate('DetalhesProduto', { product })
    }

    render(){
        return(
            <ScrollView>
                <View>
                <FlatList data={this.state.products} keyExtractor={product => product.name} renderItem={({ item }) => 
                    <>
                        <RectButton style={styles.list} onPress={() => this.handleDetails(item)}> 
                            <View style={styles.content}>
                                <Text> {item.name}</Text>
                            </View>
                        </RectButton>
                    </>
                }/>
                </View>
            </ScrollView>
        )
    }
}

ProductListScreen.navigationOptions = {
    title: 'Produtos',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
}

const styles = StyleSheet.create({

    list: { 
        margin: 5, 
        backgroundColor: '#FFE8EB', 
        height: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },

})