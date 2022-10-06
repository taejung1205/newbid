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
  height: ${(props) => (props.isMenuOpen ? "310px" : "70px")};
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
      #451bc8 35.9%
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
  isPageWithoutHeader,
  onClick,
}: {
  isMenuOpen: boolean;
  isPageBlue: boolean;
  isPageWithoutHeader: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        maxHeight: "70px",
        display: "flex",
        margin: "15px",
      }}
    >
      <LogoImage
        isVisible={!(isMenuOpen || isPageBlue) && !isPageWithoutHeader}
        src={"/image/logo_star_black.svg"}
      />
      <LogoImageGrey
        isVisible={(isMenuOpen || isPageBlue) && !isPageWithoutHeader}
        src={"/image/logo_star_green.svg"}
      />
    </div>
  );
}

const LinkText = styled.text`
  color: #ffffff;
  font-size: 26px;
  position: relative;
  line-height: 40px;
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
        isPageBlue={pathname === "/bidding"}
        isPageWithoutHeader={pathname === "/"}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          opacity: isMenuOpen ? 1 : 0,
          bottom: "120px",
          transition: "top 1s ease, opacity 1s ease-in",
          justifyContent: "center",
        }}
      >
        <Space height={10} />
        <a href="https://newbid.netlify.app/about">
          <LinkText>관람 안내</LinkText>
        </a>
        <Link to="/mybid" reloadDocument={pathname === "/mybid"}>
          <LinkText>나의 비딩내역</LinkText>
        </Link>
        <Link to="/list" reloadDocument={pathname === "/list"}>
          <LinkText>리스트 보기</LinkText>
        </Link>
      </div>
    </HeaderBox>
  );
}
