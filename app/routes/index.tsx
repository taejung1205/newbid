import { Link } from "@remix-run/react";
import styled from "styled-components";
import { ScrollingImage } from "~/components/Animated";
import { Space } from "~/components/Space";

const StartPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  background-color: #152dff;
`;

const TopText = styled.text`
  display: block;
  font-size: 24px;
  text-decoration: underline;
  font-family: rubik;
  font-weight: 700;
  font-size: 37px;
  line-height: 44px;
  color: #cccccc;
`;

const ByText = styled.text`
  display: block;
  font-size: 16px;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  color: white;
`;

const ExplanationText = styled.text`
  display: block;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  color: white;
`;

export default function Index() {
  return (
    <StartPageBox>
      <Space height={170} />
      <TopText>COEX D HALL</TopText>
      <TopText>10.12-10.16</TopText>
      <Space height={40} />
      <img src={"image/start_center.png"} />
      <Space height={11} />
      <ByText>
        NEW BID BY <br /> LOFA SEOUL
      </ByText>
      <Space height={11} />
      <ExplanationText>
        아티스트의 제품을 구매하는
        <br />
        가장 오래된 방식의 새로운 해석
      </ExplanationText>
    </StartPageBox>
  );
}
