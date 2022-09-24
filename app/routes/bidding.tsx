import { useScrollIntoView } from "@mantine/hooks";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Marquee } from "~/components/Animated";
import { Space } from "~/components/Space";
import { getCurrentPrice } from "~/utils/firebase.server";

const BiddingPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
  background-color: #152dff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const TopBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  top: 160px;
`;

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
`;

const BottomBox = styled.div`
  position: absolute;
  bottom: 20vw;
  left: 0;
  right: 0;
  @media only screen and (min-width: 750px) {
    bottom: 140px;
  }
`;

const CurrentlyText = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #9c9c9c;
`;

const CurrentPrice = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 37px;
  line-height: 44px;
  display: block;
  color: #9c9c9c;
`;

const MyBidText = styled(CurrentlyText)`
  color: #000000;
`;

const MyBidPrice = styled(CurrentPrice)`
  color: #000000;
  font-size: 63px;
  line-height: 75px;
`;

const BidButton = styled.div`
  font-size: 20px;
  line-height: 36px;
  background-color: #ff1515;
  margin: 18px;
  color: white;
  cursor: pointer;
`;

export const action: ActionFunction = async ({ request }) => {
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const indexStr = url.searchParams.get("index");
  const index = Number(indexStr);
  console.log(index);
  const price = await getCurrentPrice({ itemIndex: index });
  return json({ index: index, currentPrice: price });
};

export default function Index() {
  const submit = useSubmit();
  const data = useLoaderData();
  const [myBidPrice, setMyBidPrice] = useState<number>(data.currentPrice);
  const [noticeText, setNoticeText] = useState<string>("");
  return (
    <BiddingPageBox onScroll={() => console.log("scroll")}>
      <TopBox>
        <CurrentlyText>CURRENTLY</CurrentlyText>
        <CurrentPrice>{data.currentPrice}</CurrentPrice>
      </TopBox>
      <CenterBox>
        <button onClick={() => setMyBidPrice(prev => prev + 1000)} style={{width: "100px", height: "20px"}}> UP </button>
        <MyBidText>MY BID</MyBidText>
        <MyBidPrice>{myBidPrice}</MyBidPrice>
        <button onClick={() => setMyBidPrice(prev => prev - 1000)} style={{width: "100px", height: "20px"}}> DOWN </button>
      </CenterBox>
      <BottomBox>
        <BidButton>BID</BidButton>
      </BottomBox>
    </BiddingPageBox>
  );
}
