'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Header from '@/components/layout/Header';
import Modal from '@/components/Modal';
import ScrollCircles from '@/components/ScrollCircles';

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
  font-size: 50px;
  text-align: center;
  margin-top: 100px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 35px;
`;

const SubText = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
  color: #fff;
  font-weight: 500;
  margin-bottom: 35px;
`;

const Content = styled.div`
  margin-top: 50px;
  position: relative;
  z-index: 22;
  background-color: #000;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 88px;

  & > li {
    list-style: none;
  }
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

const PopContent = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const DownloadButton = styled.button`
  padding: 15px 24px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;
  width: 100%;
`;
const Section = styled.div`
  margin: 40px auto 10px;
`;

// ScrollCircles 스타일 정의
const FixedScrollCircles = styled(ScrollCircles)`
  position: fixed; // 고정 위치
  top: 20px; // 원하는 위치로 조정
  left: 20px; // 원하는 위치로 조정
  z-index: 1000; // 다른 요소 위에 표시
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

  const handleDownload = (json: AnimationData, name: string) => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const files: LottieItem[] = [
          { name: 'Calendar', path: '/lottie/icons/Calendar.json' },
          { name: 'Clapping', path: '/lottie/icons/Clapping.json' },
          { name: 'Community_A', path: '/lottie/icons/Community_A.json' },
          { name: 'Community_B', path: '/lottie/icons/Community_B.json' },
          { name: 'Confetti', path: '/lottie/icons/Confetti.json' },
          { name: 'Coupon_Popup', path: '/lottie/icons/Coupon_Popup.json' },
          { name: 'Coupon_TVING', path: '/lottie/icons/Coupon_TVING.json' },
          { name: 'Fortune', path: '/lottie/icons/Fortune.json' },
          { name: 'Fun', path: '/lottie/icons/Fun.json' },
          { name: 'GIft', path: '/lottie/icons/GIft.json' },
          { name: 'Onewalk', path: '/lottie/icons/Onewalk.json' },
          { name: 'Pay', path: '/lottie/icons/Pay.json' },
          { name: 'Points_Popup', path: '/lottie/icons/points_Popup.json' },
          { name: 'Points', path: '/lottie/icons/Points.json' },
          { name: 'Roulette', path: '/lottie/icons/Roulette.json' },
          { name: 'Seed', path: '/lottie/icons/Seed.json' },
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
          쉽고 자유로운 모션
          <br />
          무한한 가능성! <br />
          모션을 디자인하세요.
        </MainText>
        <SubText>
          &quot;작은 모션으로도 프로다운 감각과 거대한 임팩트를 담아보세요.
          <br />
          가볍고 효율적인 애니메이션을 손쉽게 만들고 관리하며, 다양한 플랫폼에서
          <br />
          바로 활용할 수 있답니다.&quot;
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
      <FixedScrollCircles
        minCount={5}
        maxCount={10}
        minSize={40}
        maxSize={120}
        minOffset={100}
        maxOffset={600}
        minDuration={7}
        maxDuration={10}
        colors={[
          '#a2dbf5',
          '#f8a9ec',
          '#cea4f9',
          '#9d49f4',
          '#617cff',
          '#ed27cf',
        ]}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {currentJson && (
          <Section>
            <LottieWrapper style={{ width: '99%', height: 300 }}>
              <PopContent>
                <Lottie
                  animationData={currentJson}
                  style={{
                    width: '200px',
                    height: '200px',
                  }}
                  loop
                />
              </PopContent>
            </LottieWrapper>
            <DownloadButton
              onClick={() => {
                const currentLottie = lotties.find(
                  (item, index) => animations[index] === currentJson
                );
                if (currentLottie) {
                  handleDownload(currentJson, currentLottie.name);
                }
              }}
            >
              Download JSON
            </DownloadButton>
          </Section>
        )}
      </Modal>
    </>
  );
}
