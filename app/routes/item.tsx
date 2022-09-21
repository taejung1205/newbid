import { useWindowScroll } from "@mantine/hooks";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import styled from "styled-components";
import Item from "~/components/Item";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";
import { getBidderCount, getCurrentPrice } from "~/utils/firebase.server";

const ItemPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

const NotFoundBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: contain;
  border-bottom: 1px solid #152dff;
  background-color: white;
  position: sticky;
  top: -200px;
  left: 0px;
  right: 0px;
  padding-bottom: 5px;
`;

const BidBox = styled.div`
  position: sticky;
  top: 150px;
  width: inherit;
  padding-top: 12px;
  padding-bottom: 22px;
  border-bottom: 1px solid #152dff;
  background-color: white;
`;

interface TextAlignProp {
  isLeft: boolean;
}
const TitleText = styled.text<TextAlignProp>`
  font-weight: 900;
  font-size: 17px;
  line-height: 23px;
  display: block;
  text-align: ${(props) => (props.isLeft ? "left" : "inherit")};
`;

const ArtistText = styled.text<TextAlignProp>`
  font-weight: 900;
  font-size: 13px;
  line-height: 17px;
  color: #888888;
  display: block;
  text-align: ${(props) => (props.isLeft ? "left" : "inherit")};
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

const BidButton = styled.div`
  font-size: 20px;
  line-height: 36px;
  background-color: #152dff;
  margin: 18px;
  color: white;
  cursor: pointer;
`;

const BidLogText = styled.text`
  color: #24ff00;
  font-size: 16px;
  line-height: 18px;
  padding: 10px;
`;

interface BorderBottomProp {
  isBorderBottom: boolean;
}
const DetailBox = styled.div<BorderBottomProp>`
  display: flex;
  padding: 8px;
  border-bottom: ${(props) =>
    props.isBorderBottom ? "1px solid #152dff" : "none"};
  text-align: left;
  min-height: 110px;
`;

const DetailText = styled.text`
  font-size: 12px;
  line-height: 18px;
  display: block;
  white-space: pre-wrap;
  word-break: keep-all;
  text-align: left;
`;

function NotFound() {
  return (
    <NotFoundBox>
      <h4>아이템을 찾을 수 없습니다.</h4>
    </NotFoundBox>
  );
}

function ItemDetail({
  leftElement,
  rightElement,
  noBottomBorder = false,
}: {
  leftElement: JSX.Element;
  rightElement: JSX.Element;
  noBottomBorder?: boolean;
}) {
  return (
    <DetailBox isBorderBottom={!noBottomBorder}>
      <div style={{ flex: 1 }}>{leftElement}</div>
      <div style={{ flex: 2 }}>{rightElement}</div>
    </DetailBox>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const indexStr = url.searchParams.get("index");
  const index = Number(indexStr);
  console.log(index);
  const price = await getCurrentPrice({ itemIndex: index });
  const bidderCount = await getBidderCount({ itemIndex: index });
  return json({ index: index, currentPrice: price, bidderCount: bidderCount });
};

export const action: ActionFunction = async () => {
  return null;
};

export default function Index() {
  const data = useLoaderData();
  const itemIndex = data.index;

  if (itemIndex === null || itemIndex === undefined) {
    return <NotFound />;
  }

  const item = itemsJson.items[itemIndex];
  if (item === undefined) {
    return <NotFound />;
  }
  return (
    <ItemPageBox>
      <Space height={160} />
      <ItemImage src={item.src} />
      <Space height={15} />
      <TitleText isLeft={false}>{item.title}</TitleText>
      <ArtistText isLeft={false}>{item.artist}</ArtistText>
      <Space height={10} />
      <BidBox>
        <CurrentlyText>CURRENTLY</CurrentlyText>
        <CurrentPrice>{data.currentPrice}</CurrentPrice>
        <BidButton>
          <Link to={`/bidding?index=${data.index}`}>BID</Link>
        </BidButton>
        <BidLogText>
          지금까지 총 {data.bidderCount}명이 비딩에 참여하셨습니다.
        </BidLogText>
      </BidBox>
      <ItemDetail
        leftElement={
          <>
            <TitleText isLeft={true}>{item.title}</TitleText>
            <ArtistText isLeft={true}>{item.artist}</ArtistText>
          </>
        }
        rightElement={<DetailText>{item.itemDetail}</DetailText>}
      />
      <ItemDetail
        leftElement={<TitleText isLeft={true}>뉴비드 코멘트</TitleText>}
        rightElement={<DetailText>{item.comment}</DetailText>}
      />
      <ItemDetail
        leftElement={<TitleText isLeft={true}>작가 소개</TitleText>}
        rightElement={<DetailText>{item.artistDetail}</DetailText>}
        noBottomBorder
      />
      <Space height={240} />
    </ItemPageBox>
  );
}
