import React from 'react';
import { Text } from 'react-native';

import Header from '~/components/Header';
import { Container } from './styles';

export default function Add() {
  return (
    <Container>
      <Header />
      <Text>Add</Text>
    </Container>
  );
}
