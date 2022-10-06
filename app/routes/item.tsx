
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import styled from "styled-components";
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
  border-bottom: 2px solid #451bc8;
  background-color: white;
  position: sticky;
  top: -280px;
  left: 0px;
  right: 0px;
  padding-bottom: 5px;
`;

const BidBox = styled.div`
  position: sticky;
  top: 70px;
  width: inherit;
  padding-top: 12px;
  padding-bottom: 22px;
  border-bottom: 2px solid #451bc8;
  background-color: white;
`;

const BodyText = styled.text`
  font-size: 20px;
  color: #451bc8;
  line-height: 28px;
  white-space: pre-wrap;
  text-align: left;
`;

const BodyTitleText = styled(BodyText)`
  word-break: keep-all;
  font-size: 23px;
`

interface TextAlignProp {
  isLeft: boolean;
}
const TitleText = styled.text<TextAlignProp>`
  font-size: 20px;
  line-height: 25px;
  text-align: ${(props) => (props.isLeft ? "left" : "inherit")};
  color: #451bc8;
`;

const CurrentlyText = styled.text`
  font-size: 16px;
  line-height: 20px;
  color: #451bc8;
`;

const CurrentPrice = styled.text`
  font-size: 37px;
  line-height: 44px;
  color: #451bc8;
`;

const BidButton = styled.div`
  font-size: 26px;
  line-height: 30px;
  background-color: #d9d9d9;
  width: 160px;
  height: 30px;
  color: #451bc8;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid #451bc8;
  border-radius: 110px;
  vertical-align: bottom;
  margin-left: auto;
  margin-right: auto;
`;

interface BorderBottomProp {
  isBorderBottom: boolean;
}
const DetailBox = styled.div<BorderBottomProp>`
  display: flex;
  justify-content: left;
  padding: 8px;
  border-bottom: ${(props) =>
    props.isBorderBottom ? "2px solid #451bc8" : "none"};
  text-align: left!important;;
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
      <h4 className="font_gretasans_black">아이템을 찾을 수 없습니다.</h4>
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
      <div style={{ flex: 2, textAlign: "left" }}>{leftElement}</div>
      <div style={{ flex: 1}}></div>
      <div style={{ flex: 6, textAlign: "left"}}>{rightElement}</div>
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
      <Space height={70} />
      <ItemImage src={item.src} />
      <Space height={15} />
      <TitleText className="font_gretasans_black" isLeft={false}>{item.title}</TitleText>
      <Space height={5} />
      <TitleText className="font_gretasans_black" isLeft={false}>{item.artist}</TitleText>
      <Space height={10} />
      <BidBox>
        <CurrentlyText className="font_gretasans_black">CURRENTLY</CurrentlyText>
        <Space height={5} />
        <CurrentPrice className="font_gretasans_black">{data.currentPrice} KRW</CurrentPrice>
        <Space height={30} />
        <a
          href={`/bidding?index=${data.index}`}
          style={{ textDecoration: "none" }}
        >
          <BidButton className="font_gretasans_black">비딩하기</BidButton>
        </a>
      </BidBox>
      <ItemDetail
        leftElement={
            <BodyTitleText className="font_gretasans_black">정보</BodyTitleText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">{item.title}</BodyText>
            <Space height={10} />
            <BodyText className="font_gretasans_black">{item.itemDetail}</BodyText>
            <Space height={40} />
          </>
        }
      />
      <ItemDetail
        leftElement={
            <BodyTitleText className="font_gretasans_black">작품 소개</BodyTitleText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">{item.body}</BodyText>
            <Space height={40} />
          </>
        }
      />
      <ItemDetail
        leftElement={
            <BodyTitleText className="font_gretasans_black">작가 이력</BodyTitleText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">{item.artistDetail}</BodyText>
            <Space height={40} />
          </>
        }
      />
      <ItemDetail
        leftElement={
            <BodyTitleText className="font_gretasans_black">작가 계정</BodyTitleText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">{item.artistAccount}</BodyText>
          </>
        }
        noBottomBorder
      />
      <Space height={240} />
    </ItemPageBox>
  );
}
