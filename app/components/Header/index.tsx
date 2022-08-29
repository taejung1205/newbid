import { Box, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "../Space";

const MainBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: inherit;
  justify-content: center;
`;

const ButtonIcon = styled.img`
  object-fit: contain;
  width: 40px;
  height: 40px;
`

function ItemsButton() {
  return (
    <Link to={"/items"}>
      <ButtonIcon src="image/icon_dummy.svg" />
    </Link>
  );
}

function ListButton() {
  return (
    <Link to={"/list"}>
      <ButtonIcon src="image/icon_dummy.svg" />
    </Link>
  );
}

export default function Header() {
  return (
    <MainBox>
      <Link to={"/"} style={{textDecoration: 'none'}}>
        <h1>NEWBID뉴-비드</h1>
      </Link>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ItemsButton />
        <Space width={40} />
        <ListButton />
      </div>
    </MainBox>
  );
}
