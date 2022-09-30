import { useScrollIntoView } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Marquee } from "~/components/Animated";
import { Space } from "~/components/Space";

const AboutPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  background-color: #152dff;
  position: relative;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 2px solid #dddddd;
`;

const MarqueeText = styled.div`
  font-size: 37px;
  line-height: 54px;
  font-family: Noto Sans KR;
  font-weight: 700;
  white-space: nowrap;
  color: #cccccc;
`;

interface BoxProps {
  isScrolledDown: boolean;
}

const MarqueeBox = styled.div<BoxProps>`
  transition: all ease-out 1s;
`;

const BottomBox = styled.div<BoxProps>`
  transition: all ease-out 1s;
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BottomTitleText = styled.text`
  font-weight: 900;
  color: white;
  font-size: 20px;
  line-height: 27px;
  display: block;
`;

const BottomBodyText = styled.text`
  color: white;
  font-size: 16px;
  line-height: 18px;
  display: block;
`;

export default function Index() {
  let prevScrollY = useRef(0);
  const topScrollY = useScrollIntoView<HTMLDivElement>({
    duration: 3000,
    onScrollFinish: () => {
      setIsScrolledDown(false);
    },
  });
  const bottomScrollY = useScrollIntoView<HTMLDivElement>({
    duration: 3000,
    onScrollFinish: () => {
      setIsScrolledDown(true);
    },
  });
  const [isScrolledDown, setIsScrolledDown] = useState<boolean>(false);

  useEffect(() => {

    function handleScroll(event: any) {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current > currentScrollY && isScrolledDown && currentScrollY < 500) {
        topScrollY.scrollIntoView();
      }
      if (prevScrollY.current < currentScrollY && !isScrolledDown && currentScrollY > 150) {
        bottomScrollY.scrollIntoView();
      }
      prevScrollY.current = currentScrollY;
      console.log(isScrolledDown, currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolledDown]);

  return (
    <AboutPageBox>
      <div ref={topScrollY.targetRef} />
      <Space height={70} />
      <MarqueeBox isScrolledDown={isScrolledDown}>
        <Divider />
        <Marquee duration={10}>
          <MarqueeText>예술 시장은 성행하고 있지만 왜</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={20} isReverse>
          <MarqueeText>
            아트 작품을 소유하고 컬렉팅하는 장벽은 여전히 높기만 하다
          </MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10}>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10} isReverse>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10}>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10} isReverse>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10} isReverse>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10} isReverse>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
        <Marquee duration={10} isReverse>
          <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
        </Marquee>
        <Divider />
      </MarqueeBox>
      <BottomBox isScrolledDown={isScrolledDown}>
        <div ref={bottomScrollY.targetRef} />
        <BottomTitleText>
          NEW BID BY <br /> LOFA SEOUL
        </BottomTitleText>
        <Space height={10} />
        <BottomBodyText>
          아티스트의 제품을 구매하는 <br />
          가장 오래된 방식의 새로운 해석 <br />
          <br />
          about 페이지 <br />
          안내 안내 안내 안내{" "}
        </BottomBodyText>
      </BottomBox>
    </AboutPageBox>
  );
}
