import { LoadingOverlay } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { ActionFunction } from "@remix-run/node";
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
  color: white;
  font-size: 32px;
  line-height: 40px;
  display: block;
  text-align: left;
`;

const EnterBox = styled.div`
  position: absolute;
  bottom: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
`;

const LoginButton = styled.div`
  font-size: 24px;
  line-height: 36px;
  background-color: #d9d9d9;
  width: 260px;
  height: 36px;
  color: #451bc8;
  cursor: pointer;
  text-decoration: none;
  border-radius: 110px;
  vertical-align: bottom;
  margin-left: auto;
  margin-right: auto;
`;

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
  const [isInstagram, setIsInstagram] = useState<boolean>(false);

  useEffect(() => {
    if (window !== undefined && typeof window !== "undefined") {
      if (navigator.userAgent.includes("Instagram")) {
        setIsInstagram(true);
      }
    }
  }, []);

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
      {isInstagram ? (
        <>
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#451bc8"
            }}
          >
            <h1 style={{ fontFamily: "Noto Sans KR", color: "white" }}>:(</h1>
            <h3 style={{ fontFamily: "Noto Sans KR", color: "white" }}>
              인앱브라우저 호환문제로 인해 <br />
              다른 브라우저로 접속해야합니다.
            </h3>
            <p style={{ fontFamily: "Noto Sans KR", color: "white" }}>
              우측 상단의 버튼을 클릭하여 <br /> 다른 브라우저로 전환해주세요.
            </p>
          </div>
        </>
      ) : (
        <MainPageBox>
          <div ref={topScrollY.targetRef} />
          <Space height={70} />
          <MarqueeBox isScrolledDown={isScrolledDown}>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                공예와 예술이 대중화 되고,
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={20} isReverse>
              <MarqueeText className="font_gretasans_black">
                자주 회자 되는 아티스트들의 연령 대가 점차 낮아지며
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                예술품 시장은 바야흐로 ‘새로운 세대’를 맞이하고 있다.
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10} isReverse>
              <MarqueeText className="font_gretasans_black">
                하지만 여전히 대다수의 작품들은
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                이전 세대의 갤러리와 경매를 통해 거래된다.
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10} isReverse>
              <MarqueeText className="font_gretasans_black">
                이전 세대의 진입의 벽은 아티스트들 뿐만 아니라,
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                예술을 새로이 향유하고자 하는 개인들에게도
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10} isReverse>
              <MarqueeText className="font_gretasans_black">
                너무나 높은 벽이다.
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                새로운 세대를 위한 예술품의 거래 형태는
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10} isReverse>
              <MarqueeText className="font_gretasans_black">
                어떤 모습을 취하고 있어야 할까?
              </MarqueeText>
            </Marquee>
            <Divider />
            <Marquee duration={10}>
              <MarqueeText className="font_gretasans_black">
                뉴비드는 그러한 질문을 바탕으로 새로운 질문 을 던져본다.
              </MarqueeText>
            </Marquee>
            <Divider />
          </MarqueeBox>
          <BottomBox isScrolledDown={isScrolledDown}>
            <div ref={bottomScrollY.targetRef} />
            <Space height={100} />
            <BottomText className="font_gretasans_black">
              뉴비드는 <br />
              새로운 세대를 위한 <br />
              예술품 경매 사이트 <br />
              입니다.
            </BottomText>
            <Space height={30} />
            <BottomText className="font_gretasans_black">
              뉴비드와 함께할 <br />
              준비가 되셨나요?
            </BottomText>
            <EnterBox>
              <LoginButton
                onClick={() => {
                  doKakaoLogin({ path: `/list` });
                }}
                className="font_gretasans_black"
              >
                로그인 후 입장하기
              </LoginButton>
              <Space height={50} />
            </EnterBox>
          </BottomBox>
        </MainPageBox>
      )}
    </>
  );
}
