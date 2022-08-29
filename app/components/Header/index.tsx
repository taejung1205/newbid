import { Box, Button, Text } from "@mantine/core";
import styled from "styled-components";

const MainBox = styled.div`
  position: fixed;
  display: flex;
  width: inherit;
  justify-content: center;
`;
export default function Header() {
  return (
    <MainBox>
      <h1>NEWBID뉴-비드</h1>
    </MainBox>
  );
}
