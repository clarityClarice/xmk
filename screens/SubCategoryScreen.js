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

export default class SubCategoryScreen extends React.Component {
    render(){
        return(
            <ScrollView>
                <View>
                    <FlatList />
                </View>
            </ScrollView>
        )
    }
}

SubCategoryScreen.navigationOptions = {
    title: 'Subcategorias',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
}

const styles = StyleSheet.create({

    
})