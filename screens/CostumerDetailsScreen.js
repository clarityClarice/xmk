import React from 'react'
import { AsyncStorage, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import avatar from '../assets/images/avatar.png'

export default class CostumerDetailsScreen extends React.Component{
    state = {
        name: '',
        email: '',
        phone: '',
        avatarUri: ''
    }

    componentDidMount(){
        this.loadCostumer()
    }

    loadCostumer = () => {
        const { navigation } = this.props
        const costumer = navigation.getParam('costumer')
        this.setState({
            name: costumer.name,
            email: costumer.email,
            phone: costumer.phone,
            avatarUri: costumer.avatarUri
        })
    }

    handleCall = () => {
        const { phone } = this.state
        Linking.openURL(`tel:${ phone }`)
    }

    handleEmail = () => {
        const { email } = this.state
        Linking.openURL(`mailto:${ email }`)
    }

    handleDelete = async () => {
        const { email } = this.state
        console.log(email)
        var costumers =  await AsyncStorage.getItem('costumers')
        var array = JSON.parse(costumers) 
        array = array.filter(function (costumer){
            return costumer.email !== email
        })
        console.log(array)
        await AsyncStorage.setItem('costumers', JSON.stringify(array))

        alert('Cliente deletado com sucesso!')
        const { navigation } = this.props;
        navigation.navigate('Clientes')

    }

    handleEdit = () => {
        const { navigation } = this.props;
        const costumer = this.state
        navigation.navigate('NovoCliente', { costumer })
    }

    render(){
        return (
            <ScrollView>

                <Image style={styles.imagePreview} source={ this.state.avatarUri?({ uri: this.state.avatarUri }) : avatar }/>
                
                <Text style={styles.infoName}>{this.state.name}</Text>
                <View style={styles.infoContainer}>
                    <RectButton style={styles.infoButton} onPress={() => this.handleCall()}>
                        <Ionicons name="md-call" size={20} />
                    </RectButton>
                    <RectButton style={styles.infoButton} onPress={() => this.handleEmail()}>
                        <Ionicons name="md-at" size={20} />
                    </RectButton>
                    <RectButton style={styles.infoButton} onPress={() => this.handleEdit()}>
                        <Ionicons name="md-cog" size={20}/>
                    </RectButton>
                    <RectButton style={styles.infoButton} onPress={() => this.handleDelete()}>
                        <Ionicons name="md-trash" size={20} color="red"/>
                    </RectButton>

                </View>

                <View style={styles.rowTitle}>
                    <Text style={styles.titleText}>Dados do Cliente</Text>
                </View>
                <View style={styles.rows}>
                    <Text style={styles.rowText}>Telefone</Text>
                    <Text style={styles.rowText}>{this.state.phone}</Text>
                </View>
                <View style={styles.rows}>
                    <Text style={styles.rowText}>E-mail</Text>
                    <Text style={styles.rowText}>{this.state.email}</Text>
                </View>

                <View style={styles.rowTitle}>
                    <Text style={styles.titleText}>Resumo</Text>
                </View>
                <View style={styles.rows}>
                    <Text style={styles.rowText}>Total vendido</Text>
                    <Text style={styles.rowText}>R$0,00</Text>
                </View>
                <View style={styles.rows}>
                    <Text style={styles.rowText}>Última Compra</Text>
                    <Text style={styles.rowText}>R$0,00</Text>
                </View>
            </ScrollView>
        )
    }
}

CostumerDetailsScreen.navigationOptions = {
    title: 'Detalhes',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
};

const styles = StyleSheet.create({
    imagePreview: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: '#FFE8EB',
        alignSelf: 'center',
        marginTop: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoName: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#F5B0C2'
    },
    infoButton: {
        backgroundColor: '#FFE8EB',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 4,
        margin: 5
    },
    infoButtonText: {
        fontSize: 20,
        margin: 10
    },
    rowTitle: {
        backgroundColor: '#FFE8EB',
        padding: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
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
        marginLeft: 20,
        marginRight: 20
    },
    rowText: {
        fontSize: 18
    }

})