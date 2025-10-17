'use client';
import Header from '@/components/layout/Header';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 200px;
`;

export default function About() {
  return (
    <>
      <Header />
      <Container>
        <div>About</div>
      </Container>
    </>
  );
}
