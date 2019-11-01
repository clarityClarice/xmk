import React from 'react';
import { View, Text } from 'react-native';

export default function ProductsScreen() {
  return (
    <View>
      <Text>Produtos</Text>
    </View>
  )
}

ProductsScreen.navigationOptions = {
  title: 'Produtos',
  headerStyle: {
    backgroundColor: '#F5B0C2',
  },
  headerTintColor: '#fff',
};
