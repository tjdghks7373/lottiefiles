'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Header from '@/components/layout/Header';
import Modal from '@/components/Modal';
import ScrollCircles from '@/components/ScrollCircles';

interface LottieItem {
  name: string;
  path: string;
  type?: 'gif' | 'lottie';
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
  gap: 135px;

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

const Section = styled.div`
  margin: 40px auto 10px;
`;

// ScrollCircles 스타일 정의
const FixedScrollCircles = styled(ScrollCircles)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

export default function Home() {
  const [lotties, setLotties] = useState<LottieItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<LottieItem | null>(null);
  const [lottieDataMap, setLottieDataMap] = useState<Record<string, unknown>>(
    {}
  );

  const openModal = async (asset: LottieItem) => {
    setCurrentAsset(asset);
    setIsOpen(true);
    if (
      (asset.type === 'lottie' || asset.path.endsWith('.json')) &&
      !lottieDataMap[asset.path]
    ) {
      try {
        const res = await fetch(asset.path);
        if (res.ok) {
          const json = await res.json();
          setLottieDataMap((m) => ({ ...m, [asset.path]: json }));
        } else {
          console.error('Failed to load lottie json', asset.path, res.status);
        }
      } catch (e) {
        console.error('Error fetching lottie json', e);
      }
    }
  };

  const handleDownload = async (asset: LottieItem) => {
    if (asset.type === 'gif' || asset.path.endsWith('.gif')) {
      const a = document.createElement('a');
      a.href = asset.path;
      a.download = `${asset.name}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Lottie JSON download
    const data = lottieDataMap[asset.path];
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${asset.name}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }

    // If not prefetched, try fetch and then download
    try {
      const res = await fetch(asset.path);
      if (!res.ok) throw new Error(`Failed to fetch ${asset.path}`);
      const json = await res.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${asset.name}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  useEffect(() => {
    const files: LottieItem[] = [
      { name: 'Cloud', path: '/lottie/sample/Cloud.gif', type: 'gif' },
      {
        name: 'Badge',
        path: '/lottie/sample/Badge.gif',
        type: 'gif',
      },
      {
        name: 'Event_Spring',
        path: '/lottie/sample/Event_Spring.json',
        type: 'lottie',
      },
      {
        name: 'Event_Summer',
        path: '/lottie/sample/Event_Summer.gif',
        type: 'gif',
      },
      { name: 'Gift', path: '/lottie/sample/Gift.gif', type: 'gif' },
    ];
    setLotties(files);
    // Preload lottie JSON thumbnails
    files.forEach(async (f) => {
      if (f.type === 'lottie' || f.path.endsWith('.json')) {
        try {
          const res = await fetch(f.path);
          if (res.ok) {
            const json = await res.json();
            setLottieDataMap((m) => ({ ...m, [f.path]: json }));
          }
        } catch (e) {
          console.error('Failed preloading lottie', f.path, e);
        }
      }
    });
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
                  {item.type === 'lottie' || item.path.endsWith('.json') ? (
                    lottieDataMap[item.path] ? (
                      <div
                        onClick={() => openModal(item)}
                        style={{ width: 100, height: 100 }}
                      >
                        <Lottie
                          animationData={lottieDataMap[item.path]}
                          style={{ width: 100, height: 100 }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Loading...
                      </div>
                    )
                  ) : (
                    <img
                      src={item.path}
                      alt={item.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                      onClick={() => openModal(item)}
                    />
                  )}
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
        {currentAsset && (
          <Section>
            <LottieWrapper style={{ width: '99%', height: 'auto' }}>
              <PopContent style={{ flexDirection: 'column', gap: 16 }}>
                {currentAsset.type === 'lottie' ||
                currentAsset.path.endsWith('.json') ? (
                  lottieDataMap[currentAsset.path] ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: '400px',
                          maxWidth: '100%',
                        }}
                      >
                        <Lottie
                          animationData={lottieDataMap[currentAsset.path]}
                        />
                      </div>
                      <button onClick={() => handleDownload(currentAsset)}>
                        Download JSON
                      </button>
                    </div>
                  ) : (
                    <div>Loading animation...</div>
                  )
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <img
                      src={currentAsset.path}
                      alt="preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 400,
                        borderRadius: 8,
                      }}
                    />
                  </div>
                )}
              </PopContent>
            </LottieWrapper>
          </Section>
        )}
      </Modal>
    </>
  );
}
