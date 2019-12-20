import React, { useState, useSelector } from 'react';
import { Alert } from 'react-native';

import Header from '~/components/Header';
import api from '~/services/api';

import { Container, Box, TInput, AddButton } from './styles';

export default function Add({ navigation }) {
  const [question, setQuestion] = useState('');
  const profile = useSelector(state => state.user.profile);

  async function handleSubmit() {
    const response = await api.post(`/students/${profile.id}/help-orders`, {
      body: question,
    });

    if (response.data.id) {
      navigation.navigate('List');
    } else {
      Alert.alert('Falha!', 'Houve erro ao gravar, tente novamente.');
    }
  }

  return (
    <Container>
      <Header />
      <Box>
        <TInput
          placeholder="Inclua seu pedido de auxílio"
          multiline
          value={question}
          onChangeText={setQuestion}
        />
      </Box>
      <AddButton onPress={handleSubmit}>Enviar pedido</AddButton>
    </Container>
  );
}
