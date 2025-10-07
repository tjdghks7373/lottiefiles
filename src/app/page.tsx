'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Header from '@/components/layout/Header';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
interface LottieItem {
  name: string;
  path: string;
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MainText = styled.h1`
  font-size: 60px;
  text-align: center;
  margin-top: 100px;
  line-height: 1.2;
  font-weight: 700;
`;

const SubText = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
  color: #b3b6bf;
  font-weight: 500;
`;

const Content = styled.div`
  margin-top: 50px;
`;

const List = styled.ul`
  display: flex;
  gap: 40px;
  justify-content: center;
  padding: 20px 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Lotties = styled(Lottie)`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background: #1e1c1e;
  box-shadow: inset 2px 2px 2px #232323;
`;

export default function Home() {
  const [lotties, setLotties] = useState<LottieItem[]>([]);
  const [animations, setAnimations] = useState<LottieItem[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      const files: LottieItem[] = [
        { name: 'Animation 1', path: '/lotties/animation1.json' },
        { name: 'Animation 2', path: '/lotties/animation2.json' },
      ];
      setLotties(files);
      const loaded = await Promise.all(
        files.map(async (item) => {
          const res = await fetch(item.path);
          return await res.json();
        })
      );
      setAnimations(loaded);
    };
    loadAnimations();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <MainText>
          Effortless Motion.
          <br />
          Endless Creativity.
        </MainText>
        <SubText>
          Explore, edit, and download stunning Lottie animations for your next
          project.
        </SubText>
        <Content>
          <List>
            {lotties.map((item, index) => (
              <ListItem key={index}>
                {animations[index] ? (
                  <>
                    <Lotties animationData={animations[index]} />
                  </>
                ) : (
                  <p>Loading...</p>
                )}
                <p>{item.name}</p>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    </>
  );
}
