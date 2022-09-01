import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCountdown } from "~/utils/countdown";
import { Space } from "../Space";

interface TimerTextProps {
  isStartPage: boolean;
  isMenuOpen: boolean;
}

interface FooterBoxProps {
  isMenuOpen: boolean;
}

const FooterBox = styled.div<FooterBoxProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: inherit;
  max-height: ${(props) => (props.isMenuOpen ? "240px" : "120px")};
  justify-content: center;
  bottom: 0;
  transition: max-height ease 1s;
  &::before {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    position: absolute;
    transition: ${(props) => (props.isMenuOpen ? "opacity 1s linear" : "")};
    opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 9.38%, #152DFF 33.85%);
  }
`;

const TimerText = styled.text<TimerTextProps>`
  font-family: rubik;
  font-weight: 700;
  font-size: 21.5vw;
  line-height: 1.2;
  cursor: pointer;
  @media (min-width: 750px) {
    font-size: 140px;
  }
  color: ${(props) =>
    props.isStartPage || props.isMenuOpen ? "#24FF00" : "#000000"};
  transition: ${props => props.isMenuOpen ? "color 1s ease" : ""} ;
`;

const ExplanationText = styled.text`
  font-size: 12px;
  line-height: 18px;
  color: #24ff00;
  font-family: "Noto Sans KR", sans-serif;
`;

const LinkText = styled.text`
  font-size: 14px;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;
  text-decoration: underline;
  color: #24ff00;
  line-height: 18px;
`;

function CountdownTimer({
  targetDate,
  isStartPage,
  isMenuOpen,
  onClick,
}: {
  targetDate: Date | undefined;
  isStartPage: boolean;
  isMenuOpen: boolean;
  onClick: () => void;
}) {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <TimerText
      isStartPage={isStartPage}
      isMenuOpen={isMenuOpen}
      onClick={onClick}
    >
      {hours}:{minutes}:{seconds}
    </TimerText>
  );
}

export default function Footer() {
  const [targetTime, setTargetTime] = useState<Date>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const target = new Date(2022, 10, 14);
    setTargetTime(target);
  }, []);

  return (
    <FooterBox isMenuOpen={isMenuOpen}>
      <CountdownTimer
        targetDate={targetTime}
        isMenuOpen={isMenuOpen}
        isStartPage={pathname === "/"}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      />
      <div style={{
        position: isMenuOpen ? "relative" : "absolute",
        top: isMenuOpen ? 0 : 100,
        opacity: isMenuOpen ? 1 : 0,
        transition: isMenuOpen ? "opacity 1s linear, top 0.8s ease" : ""
      }}>
          <ExplanationText>
            뉴비드의 첫번째 컬렉션이 <br />
            종료되기 까지 남은 시간입니다.
          </ExplanationText>
          <Space height={26} />
          <a
            href="https://www.instagram.com/lofa_seoul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkText>
              타임 종료 후에도 <br />더 많은 컬렉션을 만나보고 싶다면?
            </LinkText>
          </a>
          <Space height={16} />
        </div>
    </FooterBox>
  );
}
