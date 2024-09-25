import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SupplierForm from './screens/SupplierForm';
import SupplierList from './screens/SupplierList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SupplierList">
        <Stack.Screen name="SupplierForm" component={SupplierForm} options={{ title: 'Cadastrar Fornecedor' }} />
        <Stack.Screen name="SupplierList" component={SupplierList} options={{ title: 'Lista de Fornecedores' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
