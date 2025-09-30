'use client';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1400px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  margin-left: 20px;
`;

const Navi = styled.nav`
  display: flex;
`;

const List = styled.ul`
  display: flex;
  gap: 40px;
`;

const ListItem = styled.li`
  font-size: 16px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
`;

export default function Header() {
  return (
    <Wrapper>
      <Title>Lottie Files</Title>
      <Navi>
        <List>
          <ListItem>Icons</ListItem>
          <ListItem>About</ListItem>
        </List>
      </Navi>
    </Wrapper>
  );
}
