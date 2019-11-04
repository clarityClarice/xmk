import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CostumersScreen from '../screens/CostumersScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CatalogueScreen from '../screens/CatalogueScreen'
import SubCategoryScreen from '../screens/SubCategoryScreen'
import ProductListScreen from '../screens/ProductListScreen'
import ProductDetailsScreen from '../screens/ProductDetailScreen'
import SalesScreen from '../screens/SalesScreen'
import NewSaleScreen from '../screens/NewSaleScreen'
import NewCostumer from '../screens/NewCostumerScreen'
import CostumerDetailsScreen from '../screens/CostumerDetailsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'ios-home'
      }
    />
  ),
};

HomeStack.path = '';

const CostumersStack = createStackNavigator(
  {
    Clientes: CostumersScreen,
    NovoCliente: NewCostumer,
    Detalhes: CostumerDetailsScreen
  },
  config
);

CostumersStack.navigationOptions = {
  tabBarLabel: 'Clientes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};

CostumersStack.path = '';

const ProductsStack = createStackNavigator(
  {
    Produtos: ProductsScreen,
    Catalago: CatalogueScreen,
    SubCategorias: SubCategoryScreen,
    ListaProdutos: ProductListScreen,
    DetalhesProduto: ProductDetailsScreen
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Produtos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-gift' : 'md-gift'} />
  ),
};

ProductsStack.path = '';

const SalesStack = createStackNavigator(
  {
    Vendas: SalesScreen,
    NovaVenda: NewSaleScreen
  },
  config
);

SalesStack.navigationOptions = {
  tabBarLabel: 'Vendas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} />
  ),
}

SalesStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CostumersStack,
  ProductsStack,
  SalesStack
});

tabNavigator.path = '';

export default tabNavigator;
