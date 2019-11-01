import React from 'react'
import { AsyncStorage } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import avatar from '../assets/images/avatar.png'



export default class NewCostumer extends React.Component{

    state = {
        avatarSource: '',
        avatar: avatar,
        costumer: { name: '', phone: '', email: '', avatarUri: '' },
        costumers: [],
        name: '',
        phone: '',
        email: '',
        edit: false
    }

    handleCameraLaunch = async () => {
        const response = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })
        if(!response.cancelled) {
            this.setState({ avatarSource: response.uri})
            this.avatarChange(response.uri)
        }
    }

    handleOpenGalery = async () => {
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })

        if(!response.cancelled) {
            this.setState({ avatarSource: response.uri})
            this.avatarChange(response.uri)
        }
        
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, precisamos da permissão da câmera para realizar o cadastro completo do seu cliente!');
            }
        }
    }

    async componentDidMount(){
        const costumers = await AsyncStorage.getItem('costumers')
        if (costumers){
            this.setState({ costumers: JSON.parse(costumers)})
        }
        this.getPermissionAsync()
        this.loadCostumer()
    }

    loadCostumer = () => {
        const { navigation } = this.props
        const costumer = navigation.getParam('costumer')
        if (costumer){
            this.setState({
                costumer,
                name: costumer.name,
                email: costumer.email,
                avatarSource: costumer.avatarUri,
                phone: costumer.phone,
                edit: true

            })
        }
    }

    handleSalvar = async () => {
        if(!this.state.edit){
            const { name, email, phone, costumer } = this.state
            costumer.email = email
            costumer.name = name
            costumer.phone = phone
            this.setState({
                costumer
            })
            const { costumers } = this.state
            costumers.push(costumer)
            this.setState({
                costumers
            })
            await AsyncStorage.setItem('costumers', JSON.stringify(costumers))
            alert(`Salvo com sucesso!`)
        }
        else {
            const { name, email, phone, costumer } = this.state
            costumer.email = email
            costumer.name = name
            costumer.phone = phone
            this.setState({
                costumer
            })
            var { costumers } = this.state
            const index = costumers.findIndex(person => person.email === email )
            costumers[index] = this.state.costumer
            await AsyncStorage.setItem('costumers', JSON.stringify(costumers))
            alert(`Salvo com sucesso!`)

        }
        
        
    }

    avatarChange(uri){
        const { costumer } = this.state
        costumer.avatarUri = uri
        this.setState({ costumer })
    }

    render(){
        const { avatarSource } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <View>
                        <RectButton style={styles.photo} onPress={() => this.handleCameraLaunch()}>
                            <Ionicons name='md-camera' size={40} color='#F5B0C2' />
                        </RectButton>
                        <RectButton style={styles.photo} onPress={() => this.handleOpenGalery()}>
                            <Ionicons name='md-images' size={40} color='#F5B0C2' />
                        </RectButton>
                    </View>
                    <View>
                        <Image style={styles.imagePreview} source={ avatarSource?({ uri: avatarSource }) : avatar }/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text>
                        Nome Completo 
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Clarice Lispector' 
                        name="name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>
                        Telefone 
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='47 999 999 999'
                        name='phone'
                        value={this.state.phone} 
                        onChangeText={text => this.setState({ phone: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>
                        Email
                    </Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='nome@dominio.com' 
                        name='email'
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </View>

                <RectButton style={styles.saveButton} onPress={() => this.handleSalvar()}>
                    <Text style={styles.buttonText}>
                        Salvar
                    </Text>
                </RectButton>
            </View>
        )
    }
}


NewCostumer.navigationOptions = {
    title: 'Cliente',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    photo: {
        width: 80,
        height: 80,
        backgroundColor: '#FFE8EB',
        borderRadius: 4,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePreview: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: '#FFE8EB'
    },
    photoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFE8EB'
    },
    inputContainer: {
        marginTop: 15
    },
    saveButton: {
        backgroundColor: '#F5B0C2',
        height: 40,
        borderRadius: 4,
        bottom: -20, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    }

})