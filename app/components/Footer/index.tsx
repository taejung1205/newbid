import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCountdown } from "~/utils/countdown";

interface TimerTextProps {
  isStartPage: boolean;
}

const MainBox = styled.div`
  position: fixed;
  display: flex;
  width: inherit;
  justify-content: center;
  bottom: 0;
`;

const TimerText = styled.text<TimerTextProps>`
  font-family: rubik;
  font-weight: 700;
  font-size: 21.5vw;
  @media (min-width: 750px) {
    font-size: 140px;
  }
  color: ${(props) => (props.isStartPage ? "#24FF00" : "#000000")};
`;

function CountdownTimer({
  targetDate,
  isStartPage,
}: {
  targetDate: Date | undefined;
  isStartPage: boolean;
}) {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <TimerText isStartPage={isStartPage}>
      {hours}:{minutes}:{seconds}
    </TimerText>
  );
}

export default function Footer() {
  const [targetTime, setTargetTime] = useState<Date>();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const target = new Date(2022, 10, 14);
    setTargetTime(target);
  }, []);

  return (
    <MainBox>
      <CountdownTimer targetDate={targetTime} isStartPage={pathname === "/"} />
    </MainBox>
  );
}
