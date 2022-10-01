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
  justify-content: center;
  bottom: ${(props) => (props.isMenuOpen ? "0px" : "-130px")};
  transition: bottom ease 1s;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 9.38%,
    #343ee4 34%
  );
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const TimerText = styled.text<TimerTextProps>`
  font-size: 18vw;
  cursor: pointer;
  @media (min-width: 750px) {
    font-size: 100px;
  }
  color: #e5e5e5;
`;

const ExplanationText = styled.text`
  font-size: 16px;
  line-height: 18px;
  font-family: Noto Sans KR, sans-serif;
  color: white
`;

const LinkText = styled.text`
  font-size: 17px;
  line-height: 18px;
  font-weight: 500;
  font-family: Noto Sans KR, sans-serif;
  text-decoration: underline;
  color: white;
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
      <Space height={30} />
      <CountdownTimer
        targetDate={targetTime}
        isMenuOpen={isMenuOpen}
        isStartPage={pathname === "/"}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      />
      <Space height={20} />
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
    </FooterBox>
  );
}
