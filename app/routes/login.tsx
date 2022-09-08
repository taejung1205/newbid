import { ActionFunction, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { doKakaoLogin } from "~/utils/kakao";

const LoginPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RequireLoginText = styled.text`
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  font-family: "Noto Sans KR";
`;

const KakaoLoginButton = styled.img`
  width: 175px;
  height: 43px;
`;
const WithoutLoginLinkText = styled.text`
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  text-decoration: underline;

  font-family: "Noto Sans KR";
`;

function WithoutLoginLink() {
  return (
    <Link to={"/list"} style={{ position: "absolute", bottom: "120px", color: "black"}}>
      <WithoutLoginLinkText>둘러만 볼게요</WithoutLoginLinkText>
    </Link>
  );
}

export const action: ActionFunction = async () => {
  console.log("redirect");
  return null;
};

export default function Index() {
  return (
    <LoginPageBox>
      <RequireLoginText>
        뉴비드 사이트는
        <br />
        회원가입 후에만 이용가능 합니다.
      </RequireLoginText>
      <Space height={20} />
      <KakaoLoginButton
        src={"/image/kakao_login_button.png"}
        onClick={() => {
          doKakaoLogin();
        }}
      />
      <WithoutLoginLink />
    </LoginPageBox>
  );
}
