
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Space } from "../Space";

interface HeaderBoxProps {
  isMenuOpen: boolean;
  isStartPage: boolean;
}

interface LogoImageProps {
  isVisible: boolean;
}

const HeaderBox = styled.div<HeaderBoxProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: inherit;
  padding-left: 25px;
  padding-right: 25px;
  justify-content: start;
  height: ${(props) => (props.isMenuOpen ? "550px" : "150px")};
  transition: height 1s ease;
  align-items: center;
  z-index: 99;
  &::before {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    position: absolute;
    transition: opacity 1s ease;
    opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 3.65%,
      #152dff 43.75%
    );
  }
`;

const LogoImage = styled.img<LogoImageProps>`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease;
`;

const LogoImageGrey = styled(LogoImage)`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
`;

function HeaderLogo({
  isMenuOpen,
  isPageBlue,
  onClick,
}: {
  isMenuOpen: boolean;
  isPageBlue: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        maxHeight: isPageBlue ? "125px" : "150px",
      }}
    >
      <LogoImage isVisible={!(isMenuOpen || isPageBlue)} src={"/image/logo_newbid_black.png"} />
      <LogoImageGrey
        isVisible={isMenuOpen || isPageBlue}
        src={"/image/logo_newbid_grey.png"}
      />
    </div>
  );
}

const LinkText = styled.text`
  font-family: "Raleway";
  font-weight: 500;
  font-style: normal;
  text-decoration: underline;
  color: #ffffff;
  font-size: 20px;
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
  const [userName, setUserName] = useState<string>("NO"); //For debug
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <HeaderBox isMenuOpen={isMenuOpen} isStartPage={pathname === "/"}>
      <HeaderLogo
        onClick={() => {
          if (pathname !== "/") {
            setIsMenuOpen(!isMenuOpen);
          }
        }}
        isMenuOpen={isMenuOpen}
        isPageBlue={pathname === "/"}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          opacity: isMenuOpen ? 1 : 0,
          bottom: "255px",
          transition: "top 1s ease, opacity 1s ease-in",
          justifyContent: "center",
        }}
      >
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
      </div>
    </HeaderBox>
  );
}
