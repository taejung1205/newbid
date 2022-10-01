import styled from "styled-components";
import { Space } from "../Space";

const ItemImage = styled.img`
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const HighestBidCircle = styled.img`
  position: absolute;
  right: 33px;
  top: 5px;
`;

const HighestBidStar = styled.img`
  position: absolute;
  right: 45px;
  top: 17px;
`;

const ItemTitle = styled.text`
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
`;

const ItemBody = styled.text`
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  white-space: pre-wrap;
`;

const CurrentlyText = styled.text`
  font-family: SDGretaSans;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
`;

const CurrentPrice = styled.text`
  font-family: SDGretaSans;
  font-weight: 700;
  font-size: 37px;
  line-height: 44px;
  display: block;
`;

const StartFromText = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  opacity: 0.4;
`;

const StartPrice = styled.text`
  font-family: "Rubik";
  font-weight: 700;
  font-size: 37px;
  line-height: 44px;
  opacity: 0.4;
  display: block;
`;

export default function Item({
  imgSrc,
  title,
  body,
  currentPrice,
  startPrice,
  onClick,
  isHighest = false,
}: {
  imgSrc: string;
  title: string;
  body: string;
  currentPrice: number;
  startPrice: number;
  onClick: () => void;
  isHighest?: boolean;
}) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ItemImage src={imgSrc} onClick={onClick} />
        {isHighest ? (
          <>
            <HighestBidCircle src="/image/icon_highest_bid.png" />
            <HighestBidStar src="/image/icon_highest_bid_star.png" />
          </>
        ) : (
          <></>
        )}
      </div>
      <Space height={30} />
      <ItemTitle>{title}</ItemTitle>
      <Space height={10} />
      <ItemBody>{body}</ItemBody>
      <Space height={30} />
      <CurrentlyText>CURRENTLY</CurrentlyText>
      <CurrentPrice>{currentPrice}</CurrentPrice>
      <Space height={30} />
      <Space height={15} />
    </div>
  );
}
