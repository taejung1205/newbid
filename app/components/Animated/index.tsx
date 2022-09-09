import styled from "styled-components";

const ScrollBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  animation-name: first;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes first {
    0% {
      left: 0;
    }

    100% {
      left: 1280px;
    }
  }
`;

const SecondScrollBox = styled(ScrollBox)`
  animation-name: second;
  @keyframes second {
    0% {
      left: -1280px;
    }

    100% {
      left: 0;
    }
  }
`;

interface MarqueeProps {
  duration: number;
}

const MarqueeText = styled.text<MarqueeProps>`
  @keyframes animate {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - 1rem));
    }
  }
  animation: ${(props) => `animate ${props.duration}s linear infinite`};
`;

const MarqueeReverseText = styled(MarqueeText)`
  @keyframes animate_reverse {
    0% {
      transform: translateX(calc(-100% - 1rem));
    }
    100% {
      transform: translateX(0);
    }
  }
  animation: ${(props) => `animate_reverse ${props.duration}s linear infinite`};
`;

export function ScrollingImage({ src }: { src: string }) {
  return (
    <div style={{ display: "flex", position: "relative", height: "200px" }}>
      <ScrollBox>
        <img src={src} />
      </ScrollBox>
      <SecondScrollBox>
        <img src={src} />
      </SecondScrollBox>
    </div>
  );
}

export function Marquee({
  children,
  duration,
  isReverse = false,
}: {
  children: React.ReactNode;
  duration: number;
  isReverse?: boolean;
}) {
  if (!isReverse) {
    return (
      <div style={{ display: "flex", position: "relative", gap: "1rem" }}>
        <MarqueeText duration={duration}>{children}</MarqueeText>
        <MarqueeText duration={duration}>{children}</MarqueeText>
        <MarqueeText duration={duration}>{children}</MarqueeText>
        <MarqueeText duration={duration}>{children}</MarqueeText>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", position: "relative", gap: "1rem" }}>
        <MarqueeReverseText duration={duration}>{children}</MarqueeReverseText>
        <MarqueeReverseText duration={duration}>{children}</MarqueeReverseText>
        <MarqueeReverseText duration={duration}>{children}</MarqueeReverseText>
        <MarqueeReverseText duration={duration}>{children}</MarqueeReverseText>
      </div>
    );
  }
}
