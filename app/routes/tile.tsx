import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";

const TilePageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Index() {
  return (
    <TilePageBox>
      <h1>로그인 페이지</h1>
    </TilePageBox>
  );
}