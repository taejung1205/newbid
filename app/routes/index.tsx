import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Space } from "~/components/Space";

const RootBox = styled.div`
  overflow: hidden;
  width: inherit;
`;

const TopText = styled.text`
  display: block;
  font-size: 24px;
  text-decoration: underline;

  font-weight: 700;
`;

const ExplanationText = styled.text`
  display: block;
  font-size: 16px;
`;

const ByText = styled.text`
  display: block;
  font-size: 16px;
  font-weight: 700;
`;

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

function ScrollingBox() {
  return (
    <div style={{ display: "flex", position: "relative", height: "200px" }}>
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
      <Space height={130} />
      <TopText>COEX D HALL</TopText>
      <TopText>10.12-10.16</TopText>
      <ScrollingBox />
      <ExplanationText>아티스트의 제품을 구매하는</ExplanationText>
      <ExplanationText>가장 오래된 방식의</ExplanationText>
      <ExplanationText>새로운 해석</ExplanationText>
      <ByText>NEWBID</ByText>
      <ByText>BY LOFA SEOUL</ByText>
      <Link to={"/login"}>
        GO
      </Link>
    </RootBox>
  );
}
