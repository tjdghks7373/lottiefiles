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
  padding: 0 20px 200px;
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
  gap: 60px;
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

const LottieWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #1e1c1e;
  border: 3px solid #2c2c2c;
  box-shadow: inset 2px 2px 2px #232323;
  cursor: pointer;

  &:hover {
    border: 3px solid #4a90e2;
  }
`;

const ModalBackdrop = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
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
  width: 600px;
  height: 600px;
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
          { name: 'Coupon', path: '/lotties/coupon.json' },
          { name: 'Calendar', path: '/lotties/calendar.json' },
          { name: 'Roulette', path: '/lotties/roulette.json' },
          { name: 'Walk', path: '/lotties/walk.json' },
          { name: 'Fortune', path: '/lotties/fortune.json' },
          { name: 'Community', path: '/lotties/community.json' },
          { name: 'Fun', path: '/lotties/fun.json' },
          { name: 'Seed', path: '/lotties/seed.json' },
          { name: 'Points', path: '/lotties/points.json' },
          { name: 'Pay', path: '/lotties/pay.json' },
          { name: 'Gift', path: '/lotties/gift.json' },
          { name: 'Clapping', path: '/lotties/clapping.json' },
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
              <ListItem key={`${item.name}-${index}`}>
                {animations[index] ? (
                  <LottieWrapper>
                    <Lottie
                      animationData={animations[index]}
                      onClick={() => openModal(animations[index])}
                      style={{
                        height: '100%',
                        width: 'auto',
                        maxWidth: '100%',
                      }}
                    />
                  </LottieWrapper>
                ) : (
                  <p>Loading...</p>
                )}
                <p>{item.name}</p>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
      <ModalBackdrop $show={modalOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <button onClick={closeModal}>Close</button>
          {currentJson && (
            <LottieWrapper style={{ width: 300, height: 300 }}>
              <Lottie animationData={currentJson} loop />
            </LottieWrapper>
          )}
        </ModalContent>
      </ModalBackdrop>
    </>
  );
}
