import dynamic from "next/dynamic";
import styled from 'styled-components';

const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });

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