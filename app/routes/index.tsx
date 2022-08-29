import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Space } from "~/components/Space";

const RootBox = styled.div`
  overflow: hidden;
  width: inherit;
`;

const TopText = styled.text`
  display: block;
`;

const ScrollBox = styled.div`
  position: absolute;
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

function ScrollingBox() {
  return (
    <div style={{ display: "flex", position: "relative", height: "400px"}}>
      <ScrollBox>
        <img src={"image/autoscroll_dummy.jpg"} />
      </ScrollBox>
      <SecondScrollBox>
        <img src={"image/autoscroll_dummy.jpg"} />
      </SecondScrollBox>
    </div>
  );
}

export default function Index() {
  return (
    <RootBox>
      <Space height={100} />
      <TopText>COEX D HALL</TopText>
      <TopText>10.12-10.16</TopText>
      <ScrollingBox />
    </RootBox>
  );
}
