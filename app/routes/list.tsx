import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";

const ListPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Index() {
  return (
    <ListPageBox>
      <h1>리스트 페이지</h1>
    </ListPageBox>
  );
}
