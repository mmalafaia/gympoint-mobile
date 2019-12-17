import React, { useState, useMemo } from 'react';
import { DatePikerIOS } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePikerIOS
            date={date}
            onDateChange={onchange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale={pt}
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
