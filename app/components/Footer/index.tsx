import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCountdown } from "~/utils/countdown";

function CountdownTimer({ targetDate }: { targetDate: Date | undefined }) {

  const [hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <h1>
      {hours}:{minutes}:{seconds}
    </h1>
  );
}

const MainBox = styled.div`
  position: fixed;
  display: flex;
  width: inherit;
  justify-content: center;
  bottom: 0;
`;
export default function Footer() {
  const [targetTime, setTargetTime] = useState<Date>();

  useEffect(() => {
    const target = new Date(2022, 10, 14);
    setTargetTime(target);
  }, []);

  return (
    <MainBox>
      <CountdownTimer targetDate={targetTime} />
    </MainBox>
  );
}
