'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Circle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface ScrollCirclesProps {
  minCount?: number;
  maxCount?: number;
  minSize?: number;
  maxSize?: number;
  minOffset?: number; // 시작 밑 위치 최소
  maxOffset?: number; // 시작 밑 위치 최대
  minDuration?: number; // 원형 올라가는 속도 최소
  maxDuration?: number; // 원형 올라가는 속도 최대
  colors?: string[]; // 원 랜덤 컬러 배열
}

export default function ScrollCircles({
  minCount = 15,
  maxCount = 30,
  minSize = 40,
  maxSize = 120,
  minOffset = 100,
  maxOffset = 600,
  minDuration = 4,
  maxDuration = 8,
  colors = ['#f6d365', '#fda085', '#a1c4fd', '#c2e9fb', '#84fab0', '#8fd3f4'],
}: ScrollCirclesProps) {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const count =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const newCircles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * (maxDuration - minDuration) + minDuration,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)], // 랜덤 단색
    }));
    setCircles(newCircles);
  }, [minCount, maxCount, minSize, maxSize, minDuration, maxDuration, colors]);

  return (
    <Wrapper>
      {circles.map((circle) => (
        <AnimatedCircle
          key={circle.id}
          $x={circle.x}
          $size={circle.size}
          $color={circle.color}
          initial={{ y: circle.size + Math.random() * maxOffset, opacity: 0 }}
          animate={{ y: -window.innerHeight - circle.size, opacity: 1 }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
`;

interface AnimatedCircleProps {
  $x: number;
  $size: number;
  $color: string;
}

const AnimatedCircle = styled(motion.div)<AnimatedCircleProps>`
  position: absolute;
  bottom: 0;
  left: ${({ $x }) => $x}vw;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  opacity: 0.8;
`;
