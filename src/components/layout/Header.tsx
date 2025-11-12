'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1400px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 10px 0;
  font-size: 24px;
  font-weight: 700;
`;

const Navi = styled.nav`
  display: flex;
`;

const List = styled.ul`
  display: flex;
  gap: 40px;
`;

const ListItem = styled.li`
  font-size: 16px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
    font-weight: 600;
  }
  a:hover {
    color: #4a90e2;
  }
  a.active {
    color: #4a90e2;
    font-weight: 700;
  }
`;

export default function Header() {
  const pathname = usePathname();
  return (
    <Wrapper>
      <Title>
        <Link href={'/'}>
          <Image
            src="/image/logo.png"
            width={100}
            height={40}
            alt="Lottie Files"
          />
        </Link>
      </Title>
      <Navi>
        <List>
          {/* <ListItem>
            <Link href={'/about'}>About</Link>
          </ListItem> */}
          <ListItem>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              Icons
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="/sample"
              className={pathname === '/sample' ? 'active' : ''}
            >
              Sample
            </Link>
          </ListItem>
        </List>
      </Navi>
    </Wrapper>
  );
}
