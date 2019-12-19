import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Checks from '~/components/Checks';

import { Container, AddButton, List } from './styles';

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
        <AddButton>Novo check-in</AddButton>

        <List
          data={checkins}
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

CheckIn.protoType = {
  isFocused: PropTypes.bool,
};
