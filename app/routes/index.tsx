import { LoadingOverlay } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { ActionFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Marquee } from "~/components/Animated";
import { Space } from "~/components/Space";
import { doKakaoLogin } from "~/utils/kakao";

const MainPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  background-color: #451bc8;
  position: relative;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 2px solid #dddddd;
`;

const MarqueeText = styled.div`
  font-size: 5vh;
  line-height: 6vh;
  white-space: nowrap;
  color: #cccccc;
`;

interface BoxProps {
  isScrolledDown: boolean;
}

const MarqueeBox = styled.div<BoxProps>`
  transition: all ease-out 1s;
  height: 100vh;
`;

const BottomBox = styled.div<BoxProps>`
  transition: all ease-out 1s;
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 35px;
`;

const BottomText = styled.text`
  font-weight: 400;
  color: white;
  font-size: 32px;
  line-height: 40px;
  display: block;
  text-align: left;
`;

const EnterBox = styled.div`
  position: absolute;
  bottom: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
`;

const KakaoLoginButton = styled.img`
  width: 175px;
  height: 43px;
  cursor: pointer;
`;
const WithoutLoginLinkText = styled(BottomText)`
  font-size: 25px;
  line-height: 16px;
  text-decoration: underline;
`;

function WithoutLoginLink() {
  return (
    <Link to={"/list"}>
      <WithoutLoginLinkText>둘러만 볼게요</WithoutLoginLinkText>
    </Link>
  );
}

export const action: ActionFunction = async ({ request }) => {
  return null;
};

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll(event: any) {
      const currentScrollY = window.scrollY;
      if (
        prevScrollY.current > currentScrollY &&
        isScrolledDown &&
        currentScrollY < 500
      ) {
        topScrollY.scrollIntoView();
      }
      if (
        prevScrollY.current < currentScrollY &&
        !isScrolledDown &&
        currentScrollY > 150
      ) {
        bottomScrollY.scrollIntoView();
      }
      prevScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolledDown]);

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <MainPageBox>
        <div ref={topScrollY.targetRef} />
        <Space height={70} />
        <MarqueeBox isScrolledDown={isScrolledDown}>
          <Divider />
          <Marquee duration={10}>
            <MarqueeText className="font_gretasans">예술 시장은 성행하고 있지만 왜</MarqueeText>
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
          <Marquee duration={10}>
            <MarqueeText>예술 시장에 대한 의문점 의문점</MarqueeText>
          </Marquee>
          <Divider />
        </MarqueeBox>
        <BottomBox isScrolledDown={isScrolledDown}>
          <div ref={bottomScrollY.targetRef} />
          <Space height={100} />
          <BottomText>
            뉴비드는 <br />
            새로운 세대를 위한 <br />
            아트 트레이딩 플랫폼 <br />
            입니다.
          </BottomText>
          <Space height={30} />
          <BottomText>
            뉴비드와 함께할 <br />
            준비가 되셨나요?
          </BottomText>
          <EnterBox>
            <KakaoLoginButton
              src={"/image/kakao_login_button.png"}
              onClick={() => {
                setIsLoading(true);
                doKakaoLogin({ path: `/list` });
              }}
            />
            <Space height={30} />
            <WithoutLoginLink />
          </EnterBox>
        </BottomBox>
      </MainPageBox>
    </>
  );
}
