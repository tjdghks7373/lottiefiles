'use client';
import styled from 'styled-components';
import Link from 'next/link';

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
          <ListItem>
            <Link href={'/about'}>About</Link>
          </ListItem>
          <ListItem>
            <Link href={'/'}>Icons</Link>
          </ListItem>
          <ListItem>
            <Link href={'/sample'}>Sample</Link>
          </ListItem>
        </List>
      </Navi>
    </Wrapper>
  );
}
