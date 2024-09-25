import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SupplierList({ navigation }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const storedSuppliers = await AsyncStorage.getItem('@suppliers');
        if (storedSuppliers) {
          setSuppliers(JSON.parse(storedSuppliers));
        }
      } catch (e) {
        console.error('Erro ao buscar fornecedores', e);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Cadastrar Fornecedor" onPress={() => navigation.navigate('SupplierForm')} />
      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.supplierItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text>Nome: {item.name}</Text>
            <Text>Endereço: {item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  supplierItem: { padding: 10, borderBottomWidth: 1 },
  image: { width: 50, height: 50, marginRight: 10 },
});
