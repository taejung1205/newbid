import { Box, Button, Text } from "@mantine/core";
import styled from "styled-components";

const MainBox = styled.div`
    background-color: blue;
    @media only screen and (min-width: 750px) {
        width: 650px;
    }
`
export default function Header() {
  return (
    <MainBox>
        <h1>뉴비드</h1>
    </MainBox>
  );
}
