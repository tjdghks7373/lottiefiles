'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Header from '@/components/layout/Header';
import Modal from '@/components/Modal';

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
  gap: clamp(16px, 5vw, 60px);
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

export default function Home() {
  const [lotties, setLotties] = useState<LottieItem[]>([]);
  const [animations, setAnimations] = useState<AnimationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentJson, setCurrentJson] = useState<AnimationData | null>(null);

  const openModal = (json: AnimationData) => {
    setCurrentJson(json);
    setIsOpen(true);
  };

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const files: LottieItem[] = [
          { name: 'Calendar', path: '/lotties/Calendar.json' },
          { name: 'Clapping', path: '/lotties/Clapping.json' },
          { name: 'Community_A', path: '/lotties/Community_A.json' },
          { name: 'Community_B', path: '/lotties/Community_B.json' },
          { name: 'Confetti', path: '/lotties/Confetti.json' },
          { name: 'Coupon_Popup', path: '/lotties/Coupon_Popup.json' },
          { name: 'Coupon_TVING', path: '/lotties/Coupon_TVING.json' },
          { name: 'Fortune', path: '/lotties/Fortune.json' },
          { name: 'Fun', path: '/lotties/Fun.json' },
          { name: 'GIft', path: '/lotties/GIft.json' },
          { name: 'Onewalk', path: '/lotties/Onewalk.json' },
          { name: 'Pay', path: '/lotties/Pay.json' },
          { name: 'points_Popup', path: '/lotties/points_Popup.json' },
          { name: 'Points', path: '/lotties/Points.json' },
          { name: 'Roulette', path: '/lotties/Roulette.json' },
          { name: 'Seed', path: '/lotties/Seed.json' },
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
                        height: '100px',
                        width: '100px',
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {currentJson && (
          <LottieWrapper
            style={{ width: '99%', height: 300, margin: '30px auto' }}
          >
            <Lottie animationData={currentJson} loop />
          </LottieWrapper>
        )}
      </Modal>
    </>
  );
}
