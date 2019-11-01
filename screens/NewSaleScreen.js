import React from 'react'
import { AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import avatar from '../assets/images/avatar.png'

export default class NewSaleScreen extends React.Component{
    state ={
        costumer: {},
        products: [],
        totalPrice: 0.00
    }
 render(){
     const { costumer, totalPrice, products } = this.state
     return (
         <ScrollView>
             <View style={styles.costumerComponent}>
                <RectButton style={styles.costumerButton}>
                    {costumer.name? (
                        <>
                            <Image style={styles.costumerAvatar} source={ costumer.avatarUri? ( {uri: costumer.avatarUri}) : (avatar)}/>
                            <Text>{costumer.name}</Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="md-add-circle" size={30}/>
                            <Text style={styles.addText}>Adicionar Cliente</Text>
                        </>
                    )}
                </RectButton>
             </View>

             <View>

                <View style={styles.rowTitle}>
                    <Text style={styles.titleText}>Produtos</Text>
                </View>
                <View style={styles.rows}>
                    <RectButton>
                        <Text><Ionicons name="md-add-circle" size={20}/> Adicionar Produto</Text>
                    </RectButton>
                </View>

                {/* Lista de produtos */}
                


                <View style={styles.rows}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text> </Text>
                    <Text style={styles.totalText}>R$00,00</Text>
                </View>
             </View>

         </ScrollView>
     )
 }
}

NewSaleScreen.navigationOptions = {
    title: 'Nova Venda',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
  }

const styles = StyleSheet.create({
    costumerComponent: {

    },
    costumerButton: {
        margin: 10,
        height: 80,
        backgroundColor: '#FFE8EB',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderRadius: 4
    },
    costumerAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    addText: {
        marginLeft: 5,
        fontSize: 20,
    },
    rowTitle: {
        backgroundColor: '#FFE8EB',
        padding: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        marginRight: 10,
        marginLeft: 10,
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
        borderColor: '#FFE8EB',
        marginRight: 10,
        marginLeft: 10,
    },
    totalText: {
        fontSize: 15,
        fontWeight: 'bold'
    }

})