import styled from "styled-components";
import { Marquee } from "~/components/Animated";
import { Space } from "~/components/Space";

const AboutPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
  background-color: #152dff;
  display: flex;
  flex-direction: column;
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

export default function Index() {
  return (
    <AboutPageBox>
      <Space height={140} />
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
    </AboutPageBox>
  );
}
