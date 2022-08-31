import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";

const LoginPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Index() {
  return (
    <LoginPageBox>
      <h1>로그인 페이지</h1>
      <Space height={10} />
      <Link to="/list">로그인</Link>
    </LoginPageBox>
  );
}
