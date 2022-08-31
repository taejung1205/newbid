import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";

const AboutPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Index() {
  return (
    <AboutPageBox>
      <h1>소개 페이지</h1>
    </AboutPageBox>
  );
}