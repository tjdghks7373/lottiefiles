'use client';
import styled from 'styled-components';
import Header from '@/components/layout/Header';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <Container>121212</Container>
    </div>
  );
}