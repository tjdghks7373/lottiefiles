'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/layout/Header';
import Modal from '@/components/Modal';
import ScrollCircles from '@/components/ScrollCircles';

interface LottieItem {
  name: string;
  path: string;
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
  padding: 70px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentGif, setCurrentGif] = useState<string | null>(null);

  const openModal = (gifPath: string) => {
    setCurrentGif(gifPath);
    setIsOpen(true);
  };

  const handleDownload = (path: string, name: string) => {
    // Use anchor with download attribute (works for same-origin public files)
    const a = document.createElement('a');
    a.href = path;
    a.download = `${name}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    const files: LottieItem[] = [
      { name: 'Cloud', path: '/lottie/sample/Cloud.gif' },
      { name: 'Event_Snow', path: '/lottie/sample/Event_Snow.gif' },
      { name: 'Event_Spring', path: '/lottie/sample/Event_Spring.gif' },
      { name: 'Event_Summer', path: '/lottie/sample/Event_Summer.gif' },
      { name: 'Gift', path: '/lottie/sample/Gift.gif' },
    ];
    setLotties(files);
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
                <LottieWrapper>
                  <img
                    src={item.path}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                    onClick={() => openModal(item.path)}
                  />
                </LottieWrapper>
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
        {currentGif && (
          <Section>
            <LottieWrapper style={{ width: '99%', height: 'auto' }}>
              <PopContent style={{ flexDirection: 'column', gap: 16 }}>
                <img
                  src={currentGif}
                  alt="preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    borderRadius: 8,
                  }}
                />
              </PopContent>
            </LottieWrapper>
          </Section>
        )}
      </Modal>
    </>
  );
}
