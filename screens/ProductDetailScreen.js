import React from 'react'
import { AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default class ProductDetailScreen extends React.Component{
    state = {
        name: '',
        id: '',
        price: '',
        points: '',
        thisInventory: 0,
        geralInventory: [],
        favorite: false,
        favorites: [],
        profit: 0,
        salePrice: 0,
        salePriceString: ''
    }

    async componentDidMount(){
        this.getProductInfo()
    
        this.getInventory()

        this.getFavorite()
        
    }

    getInventory = async () => {
        const geralInventory = JSON.parse(await AsyncStorage.getItem('inventory'))
        if(geralInventory){

            this.setState({ geralInventory })

            const product = this.state.geralInventory.find(product =>{
                return product.product_id === this.state.id
            })
            console.log(product)
            if(product){
                this.setState({
                    thisInventory: product.quantity
                })
            }
        }
    }

    getFavorite = async () => {
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites'))
        if(favorites){
            this.setState({ favorites })
            const favorite = favorites.find(product => {
                return product.product_id === this.state.id
            })
            if (favorite){
                this.setState({favorite})
            }
        }
    }

    getProductInfo = () => {
        const { navigation } = this.props
        const product = navigation.getParam('product')

        this.setState({
            name: product.name,
            id: product.id,
            price: product.price,
            points: product.points,
         })
    }

    handleFav = async () =>{
        this.setState({
            favorite: !this.state.favorite
        })

        var favorites = this.state.favorites
        if(!this.state.favorite){
            favorites.push({
                product_id: this.state.id,
                product_name: this.state.name,
            })
            this.setState({favorites})
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
        }else{
            const index = favorites.findIndex(products => {
                return products.product_id === this.id
            })
            favorites.splice(index, 1)
            this.setState({favorites})
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
        }

    }

    removeQuantity = async () => {
        const { thisInventory } = this.state
        
        if(thisInventory > 0){
            this.setState({
                thisInventory: thisInventory -1
            })


            if(this.state.thisInventory === 0){
                var { geralInventory } = this.state
                const index = geralInventory.findIndex( product => {
                    return product.product_id === this.state.id
                })
                geralInventory.splice(index, 1)
                this.setState({ geralInventory })
                
                await AsyncStorage.setItem('inventory', JSON.stringify(geralInventory))
            }
        }



    }

    addQuantity = async () => {
        const { thisInventory } = this.state
        this.setState({
            thisInventory: thisInventory +1
        })


        const index = this.state.geralInventory.findIndex(product => {
            return product.product_id === this.state.id
        })
        if(index > -1){
            var { geralInventory } = this.state
            geralInventory[index].quantity = this.state.thisInventory + 1
            this.setState({ geralInventory })
        }else{
            var { geralInventory } = this.state
            geralInventory.push(
                {
                    product_PRICE: this.state.price,
                    product_id: this.state.id,
                    product_name: this.state.name,
                    quantity: this.state.thisInventory + 1,
                }
            )
            this.setState({ geralInventory })
        }

        await AsyncStorage.setItem('inventory', JSON.stringify(this.state.geralInventory))
    }

    updateSalePrice = text => {

    }

    render(){
        return (
            <ScrollView style={styles.content}>
                <View style={styles.productTitle}>
                    <Text style={styles.titleText}>
                        {this.state.name}
                    </Text>
                    <RectButton style={styles.favButton} onPress={() => this.handleFav()}>
                        {this.state.favorite? (
                            <Ionicons size={50} name='md-star' color='#F5B0C2'/>
                        ): (
                            <Ionicons size={50} name='md-star' color='#eee'/>
                        )}
                    </RectButton>
                </View>
                <View>
                    <Text style={styles.productId}>
                        {this.state.id}
                    </Text>
                </View>

                <View style={styles.productValues}>
                        <Text style={styles.valuesText}>
                            R${this.state.price}
                        </Text>
                        <Text style={styles.valuesText}>
                           <Ionicons name='md-trophy' size={20} /> {this.state.points}
                        </Text>
                </View>

                <View style={styles.rowTitle}>
                    <Text style={styles.titleText}>Estoque</Text>
                </View>
                <View style={styles.rows}>
                    <RectButton onPress={() => this.removeQuantity()}><Ionicons name="md-remove-circle" size={26}/></RectButton>
                    <Text style={styles.rowText}> {this.state.thisInventory} </Text>
                    <RectButton onPress={() => this.addQuantity()}><Ionicons name="md-add-circle" size={26} /></RectButton>
                </View>

                <View style={styles.rowTitle}>
                    <Text style={styles.titleText}>Revenda</Text>
                </View>
                <View style={styles.specialRow}>
                    <Text style={styles.rowText}>R$</Text>
                    <TextInput style={styles.rowText} keyboardType='decimal-pad' value={this.state.salePriceString} placeholder={`${this.state.price}`} onChangeText={text => this.updateSalePrice(text)} />
                </View>
                <View style={styles.specialRow2}>
                    <Text style={styles.rowText}>Lucro</Text>
                    <Text style={styles.rowText}> R${ this.state.profit } </Text>
                </View>

            </ScrollView>
        )
    }
}

ProductDetailScreen.navigationOptions = {
    title: 'Detalhes do produto',
    headerStyle: {
      backgroundColor: '#F5B0C2',
    },
    headerTintColor: '#fff',
}

const styles = StyleSheet.create({
    content:{
        padding: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    productTitle: {
        padding: 10,
        borderBottomColor: '#F5B0C2',
        borderBottomWidth: 4,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    productId: {
        textAlign: 'center',
        fontSize: 16
    },     
    productValues: {
        flexDirection: 'row',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    valuesText: {
        fontSize: 20,
        fontWeight: 'bold'
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
        justifyContent: 'space-around',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#FFE8EB'
    },
    specialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#FFE8EB',
        alignItems: 'center'
    },
    specialRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#FFE8EB',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 20
    }
})
