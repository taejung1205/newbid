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

const ItemTitleText = styled.text`
  font-size: 21px;
  line-height: 27px;
  color: #451BC8;
`;

const ArtistText = styled.text`
  font-size: 20px;
  line-height: 25px;
  color: #451BC8;
`;


const CurrentlyText = styled.text`
  font-size: 16px;
  line-height: 20px;
  color: #451BC8;
`;

const CurrentPrice = styled.text`
  font-size: 31px;
  line-height: 38px;
  color: #451BC8;
`;

export default function Item({
  imgSrc,
  title,
  artist,
  currentPrice,
  onClick,
  isHighest = false,
}: {
  imgSrc: string;
  title: string;
  artist: string;
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
      <ItemTitleText>{title}</ItemTitleText>
      <Space height={5} />
      <ArtistText>{artist}</ArtistText>
      <Space height={23} />
      <CurrentlyText>CURRENTLY</CurrentlyText>
      <Space height={5} />
      <CurrentPrice>{currentPrice} KRW</CurrentPrice>
      <Space height={30} />
      <Space height={15} />
    </div>
  );
}
