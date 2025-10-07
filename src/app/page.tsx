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

interface AnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  [key: string]: unknown; // 기타 필드는 unknown으로 처리
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
  flex-wrap: wrap;
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
  border: 3px solid #2c2c2c;
  box-shadow: inset 2px 2px 2px #232323;
  cursor: pointer;
  &:hover {
    border: 3px solid #4a90e2;
  }
`;

const ModalBackdrop = styled.div.attrs<{ show: boolean }>((props) => ({
  style: {
    display: props.show ? 'flex' : 'none',
  },
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

export default function Home() {
  const [lotties, setLotties] = useState<LottieItem[]>([]);
  const [animations, setAnimations] = useState<AnimationData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJson, setCurrentJson] = useState<AnimationData | null>(null);

  const openModal = (json: AnimationData) => {
    setCurrentJson(json);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentJson(null);
  };

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const files: LottieItem[] = [
          { name: 'Animation 1', path: '/lotties/animation1.json' },
          { name: 'Animation 2', path: '/lotties/animation2.json' },
          { name: 'Animation 3', path: '/lotties/animation3.json' },
          { name: 'Animation 4', path: '/lotties/animation4.json' },
          { name: 'Animation 5', path: '/lotties/animation5.json' },
          { name: 'Animation 6', path: '/lotties/animation6.json' },
        ];
        setLotties(files);

        const loaded = await Promise.all(
          files.map(async (item) => {
            try {
              const res = await fetch(item.path);
              if (!res.ok) throw new Error(`Failed to fetch ${item.path}`);
              return await res.json();
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );
        setAnimations(loaded.filter((anim) => anim !== null));
      } catch (error) {
        console.error('Error loading animations:', error);
      }
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
              <ListItem key={item.name}>
                {animations[index] ? (
                  <>
                    <Lotties
                      animationData={animations[index]}
                      onClick={() => openModal(animations[index])}
                    />
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
      <ModalBackdrop show={modalOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <button onClick={closeModal}>Close</button>
          <pre>
            {currentJson ? JSON.stringify(currentJson, null, 2) : 'Loading...'}
          </pre>
        </ModalContent>
      </ModalBackdrop>
    </>
  );
}
