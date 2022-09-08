import { ActionFunction, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { checkLoggedIn, doKakaoLogin } from "~/utils/kakao";

const StartPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
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

const LoginImage = styled.img`
  margin-top: 40px;
  max-height: 290px;
  @media (max-height: 800px) {
    margin-top: 10px;
    max-height: 180px;
  }
  cursor: pointer;
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

export const action: ActionFunction = async ({request}) => {
  return null;
  //return redirect("/list");
};

export default function Index() {
  const submit = useSubmit();
  return (
    <StartPageBox>
      <Space height={160} />
      <TopText>COEX D HALL</TopText>
      <TopText>10.12-10.16</TopText>
      <LoginImage
        src={"image/start_center.png"}
        onClick={() => {
          checkLoggedIn({
            trueCallback: () => { submit(null, {method: "post", action: "/list"}); },
            falseCallback: () => { submit(null, {method: "post", action: "/login"});}
          })
          // doKakaoLogin();
        }}
      />
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
