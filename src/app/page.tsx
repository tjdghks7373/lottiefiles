import Header from '@/components/layout/Header';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <Container>121212</Container>
    </div>
  );
}
