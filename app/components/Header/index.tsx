import { Box, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Space } from "../Space";

interface HeaderBoxProps {
  isMenuOpen: boolean;
  isStartPage: boolean;
}

const HeaderBox = styled.div<HeaderBoxProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: inherit;
  padding-left: 25px;
  padding-right: 25px;
  height: ${(props) => (props.isMenuOpen ? "550px" : "")};
  justify-content: start;
  background: ${(props) =>
    props.isStartPage
      ? "#152DFF"
      : props.isMenuOpen
      ? "linear-gradient(0deg, rgba(255, 255, 255, 0) 3.65%, #152DFF 43.75%)"
      : ""};
`;

const LogoImage = styled.img`
  max-height: 150px;
  object-fit: contain;
`;

const LinkText = styled.text`
  font-family: rubik;
  font-weight: 600;
  font-style: normal;
  text-decoration: underline;
  color: #ffffff;
  font-size: 30px;
  position: relative;
  line-height: 45px;
`;

const ButtonIcon = styled.img`
  object-fit: contain;
  width: 40px;
  height: 40px;
`;

export default function Header({}: {}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <HeaderBox isMenuOpen={isMenuOpen} isStartPage={pathname === "/"}>
      <LogoImage
        src={
          pathname === "/" || isMenuOpen
            ? "image/logo_white.png"
            : "image/logo_black.png"
        }
        onClick={() => {
          if (pathname !== "/") setIsMenuOpen(!isMenuOpen);
        }}
      />
      {isMenuOpen && (
        <>
          <Space height={10} />
          {pathname !== "/tile" && (
            <Link to="/tile">
              <LinkText>VIEW ALL</LinkText>
            </Link>
          )}
          {pathname === "/tile" && (
            <Link to="/list">
              <LinkText>LIST VIEW</LinkText>
            </Link>
          )}
          <Link to="/mybid">
            <LinkText>MY BID</LinkText>
          </Link>
          <Link to="/about">
            <LinkText>ABOUT</LinkText>
          </Link>
        </>
      )}
    </HeaderBox>
  );
}
