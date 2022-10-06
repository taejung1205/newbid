import { Link } from "@remix-run/react";
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
  color: #451bc8;
`;

const ArtistText = styled.text`
  font-size: 20px;
  line-height: 25px;
  color: #451bc8;
`;

const CurrentlyText = styled.text`
  font-size: 16px;
  line-height: 20px;
  color: #451bc8;
`;

const CurrentPrice = styled.text`
  font-size: 37px;
  line-height: 46px;
  color: #451bc8;
`;

const CurrentKRW = styled(CurrentPrice)`
font-size: 31px;
  line-height: 38px;
`

const MyBidText = styled(CurrentlyText)`
  color: #451bc880;
`;

const MyBidPrice = styled(CurrentPrice)`
  color: #451bc880;
`;

const MyBidKRW = styled(MyBidPrice)`
font-size: 31px;
  line-height: 38px;
`

const BidButton = styled.div`
  font-size: 26px;
  line-height: 45px;
  background-color: #d9d9d9;
  width: 250px;
  height: 45px;
  color: #451bc8;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid #451bc8;
  border-radius: 110px;
  vertical-align: bottom;
  margin-left: auto;
  margin-right: auto;
`;

export function Item({
  imgSrc,
  title,
  artist,
  currentPrice,
  onClick
}: {
  imgSrc: string;
  title: string;
  artist: string;
  currentPrice: number;
  onClick: () => void;
}) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ItemImage src={imgSrc} onClick={onClick} />
      </div>
      <Space height={30} />
      <ItemTitleText  className="font_gretasans_black">{title}</ItemTitleText>
      <Space height={5} />
      <ArtistText  className="font_gretasans_black">{artist}</ArtistText>
      <Space height={23} />
      <CurrentlyText  className="font_gretasans_black">CURRENTLY</CurrentlyText>
      <Space height={5} />
      <span><CurrentPrice  className="font_gretasans_black">{currentPrice}</CurrentPrice><CurrentKRW  className="font_gretasans_black">{" "}KRW</CurrentKRW></span>
      <Space height={20} />
    </div>
  );
}

export function MyItem({
  index,
  imgSrc,
  title,
  artist,
  currentPrice,
  myBidPrice,
  isHighest,
  onClick
}: {
  index: number;
  imgSrc: string;
  title: string;
  artist: string;
  currentPrice: number;
  myBidPrice: number;
  isHighest: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <script
            type="text/javascript"
            src="https://z7z1yn5j64.execute-api.ap-northeast-2.amazonaws.com/V220930/api/fontstream/djs/?sid=gAAAAABjNoKB7aPtIJAn5jRMcYaz_Y-KZ4K-EOCGwhpW61tp_3yG3hoZRHqp-hAYyOzHi66fHUcsFs3gmIKAs3PK5K9MRVur0OOZR-1VNcmmUbFmkTom1C9u3WDjsk7A6-ZSpEGb_AdG6c_ksWhWQSzEFQrOS31--tX8_rDlpOm6sx-viCz_ZE7i5XDWuDSAbLocnrxVOACMAMVnNpmKqp79fYvMTixVBI2YqQWISV5ZO5u_wcqIlp_bSTMVr2u9-WNJutLtaBst"
            charSet="utf-8"
          />
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
      <ItemTitleText  className="font_gretasans_black">{title}</ItemTitleText>
      <Space height={5} />
      <ArtistText  className="font_gretasans_black">{artist}</ArtistText>
      <Space height={23} />
      <CurrentlyText  className="font_gretasans_black">CURRENTLY</CurrentlyText>
      <Space height={5} />
      <span><CurrentPrice  className="font_gretasans_black">{currentPrice}</CurrentPrice><CurrentKRW  className="font_gretasans_black">{" "}KRW</CurrentKRW></span>
      <Space height={20} />
      {!isHighest ? (
        <>
          <MyBidText  className="font_gretasans_black">나의 이전 비딩 금액</MyBidText>
          <Space height={5} />
          <span><MyBidPrice  className="font_gretasans_black">{myBidPrice}</MyBidPrice><MyBidKRW  className="font_gretasans_black">{" "}KRW</MyBidKRW></span>
          <Space height={40} />
          <Link to={`/bidding?index=${index}`} style={{textDecoration: "none"}}>
            <BidButton  className="font_gretasans_black">다시 비딩하기</BidButton>
          </Link>
          <Space height={50} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}