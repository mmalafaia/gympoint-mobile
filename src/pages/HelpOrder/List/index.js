import React, { useEffect, useState } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import {
  Container,
  AddButton,
  QuestionsList,
  Line,
  LineTop,
  QuestionState,
  QuestionDate,
  QuestionText,
} from './styles';

export default function List({ navigation }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const student_id = 1;
      const response = await api.get(`/students/${student_id}/help-orders`);

      const data = response.data.map(resp => ({
        ...resp,
        formattedDate: formatRelative(parseISO(resp.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setQuestions(data);
    }
    loadQuestions();
  }, []);

  return (
    <Container>
      <Header />
      <AddButton onPress={() => navigation.navigate('Add')}>
        Novo pedido de auxílio
      </AddButton>
      <QuestionsList
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Line onPress={() => navigation.navigate('Show', { item })}>
            <LineTop>
              <QuestionState answered={item.answer}>Respondido</QuestionState>
              <QuestionDate>{item.formattedDate}</QuestionDate>
            </LineTop>
            <QuestionText>{item.question}</QuestionText>
          </Line>
        )}
      />
    </Container>
  );
}

List.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
