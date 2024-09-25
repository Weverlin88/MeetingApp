import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function SupplierForm({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const saveSupplier = async () => {
    if (name === '' || address === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newSupplier = { name, address, image };

    try {
      const suppliers = await AsyncStorage.getItem('@suppliers');
      const suppliersArray = suppliers ? JSON.parse(suppliers) : [];
      suppliersArray.push(newSupplier);
      await AsyncStorage.setItem('@suppliers', JSON.stringify(suppliersArray));
      Alert.alert('Sucesso', 'Fornecedor cadastrado com sucesso!');
      navigation.navigate('SupplierList'); // Voltar para a lista
    } catch (e) {
      Alert.alert('Erro', 'Erro ao salvar o fornecedor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Fornecedor:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Digite o nome" />
      <Text>Endereço do Fornecedor:</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Digite o endereço" />
      <Button title="Escolher Imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Salvar Fornecedor" onPress={saveSupplier} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, height: 40 },
  image: { width: 100, height: 100, marginTop: 10 },
});
