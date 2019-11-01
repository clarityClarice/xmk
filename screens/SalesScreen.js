import React from 'react';
import { View, Text } from 'react-native';

export default function SalesScreen() {
  return (
    <View>
      <Text>Vendas</Text>
    </View>
  )
}

SalesScreen.navigationOptions = {
  title: 'Vendas',
  headerStyle: {
    backgroundColor: '#F5B0C2',
  },
  headerTintColor: '#fff',
};
