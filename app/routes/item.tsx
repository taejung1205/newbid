import { useWindowScroll } from "@mantine/hooks";
import { ActionFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import styled from "styled-components";
import Item from "~/components/Item";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";

interface IsFixedProps {
  isFixed: boolean;
}

const currentPrice =  80000; //TODO

const ItemPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

const NotFoundBox = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BidBox = styled.div<IsFixedProps>`
  position: ${(props) => (props.isFixed ? "fixed" : "relative")};
  top: ${(props) => (props.isFixed ? "150px" : "")};
  width: inherit;
  margin-top: 12px;
  margin-bottom: 22px;
`;

const ItemImage = styled.img<IsFixedProps>`
  width: 100%;
  height: 350px;
  object-fit: contain;
  border-bottom: 1px solid #152DFF;
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
  top: ${(props) => (props.isFixed ? "-200px" : "")};
  left: 0px;
  right: 0px;
`;

const ItemImageScrollKeep = styled.div<IsFixedProps>`
    display: ${(props) => props.isFixed ? "block" : "none"};
    height: 350px;
    width: 100%;
`

const TitleText = styled.text`
  font-family: Noto Sans KR;
  font-weight: 900;
  font-size: 17px;
  line-height: 23px;
  display: block;
`;

const ArtistText = styled.text`
  font-family: Noto Sans KR;
  font-weight: 900;
  font-size: 13px;
  line-height: 17px;
  color: #888888;
  display: block;
`;

const CurrentlyText = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
`;

const CurrentPrice = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 37px;
  line-height: 44px;
  display: block;
`;

function NotFound() {
  return (
    <NotFoundBox>
      <h4>아이템을 찾을 수 없습니다.</h4>
    </NotFoundBox>
  );
}

export const action: ActionFunction = async () => {
  return null;
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const [scroll] = useWindowScroll();
  const itemIndexStr = searchParams.get("index");

  if (itemIndexStr === null) {
    return <NotFound />;
  }

  const itemIndex = parseInt(itemIndexStr);
  const item = itemsJson.items[itemIndex];
  if (item === undefined) {
    return <NotFound />;
  }
  return (
    <ItemPageBox>
      <Space height={160} />
      <ItemImage src={item.src} isFixed={scroll.y > 350} />
      <ItemImageScrollKeep isFixed = {scroll.y > 350} />
      <Space height={15} />
      <TitleText>{item.title}</TitleText>
      <ArtistText>{item.artist}</ArtistText>
      <Space height={10} />
      <BidBox isFixed={scroll.y > 425}>
        <CurrentlyText>CURRENTLY</CurrentlyText>
        <CurrentPrice>{currentPrice}</CurrentPrice>
      </BidBox>
      <Space height={1000} />
    </ItemPageBox>
  );
}
