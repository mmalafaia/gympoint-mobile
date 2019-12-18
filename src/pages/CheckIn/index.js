import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Background from '~/components/Background';
import Checks from '~/components/Checks';

import { Container, AddButton, Title, List } from './styles';

const data = [
  { id: 12, created_at: '2019-12-18 09:00:06.501+00' },
  { id: 11, created_at: '2019-12-17 10:00:06.501+00' },
  { id: 10, created_at: '2019-12-16 11:24:06.501+00' },
  { id: 9, created_at: '2019-12-05 13:24:06.501+00' },
  { id: 8, created_at: '2019-12-06 13:24:06.501+00' },
  { id: 7, created_at: '2019-12-12 13:24:06.501+00' },
  { id: 6, created_at: '2019-12-17 13:24:06.501+00' },
  { id: 5, created_at: '2019-12-18 13:24:06.501+00' },
  { id: 4, created_at: '2019-12-18 13:24:06.501+00' },
  { id: 3, created_at: '2019-12-18 13:24:06.501+00' },
  { id: 2, created_at: '2019-12-18 13:24:06.501+00' },
  { id: 1, created_at: '2019-12-18 13:24:06.501+00' },
];

function CheckIn({ isFocused }) {
  const [checkins, setCheckins] = useState([]);

  async function loadCheckins() {
    const student_id = 1;
    const response = await api.get(`students/${student_id}/checking`);

    setCheckins(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <AddButton>Novo check-in</AddButton>

        <List
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Checks data={item} />}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(CheckIn);
