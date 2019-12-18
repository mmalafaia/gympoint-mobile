import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, Left, Info, Name, When } from './styles';

export default function Checks({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Left>
        <Name>Check-in #{data.id}</Name>
      </Left>
      <Info>
        <When>{dateParsed}</When>
      </Info>
    </Container>
  );
}
