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
