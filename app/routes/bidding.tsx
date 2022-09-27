import { Modal } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCurrentPrice, sendAligoMessage } from "~/utils/firebase.server";
import itemsJson from "~/data/items.json";
import { Space } from "~/components/Space";
import { TERMS_TEXT } from "~/data/text";
import { Terms } from "~/data/terms";

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

const NoticeText = styled.text`
  color: white;
  font-family: Noto Sans KR;
  font-weight: 700;
  size: 16px;
  line-height: 23px;
  white-space: pre-line;
`

const TermsBox = styled.div`
  width: 300px;
  height: 300px;
  overflow-y: scroll;
`;
export const action: ActionFunction = async ({ request }) => {
  const result = await sendAligoMessage();
  console.log(result);
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

function PriceModalContent({
  itemTitle,
  bidPrice,
  onNext,
  onClose,
}: {
  itemTitle: string;
  bidPrice: number;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h4>
        {itemTitle}에 대해 {bidPrice}원을 비딩하는 것이 맞으실까요?
      </h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onNext}>네, 맞아요</button>
        <button onClick={onClose}>다시 생각해볼게요</button>
      </div>
    </div>
  );
}

function TermsModalContent({
  onNext,
  onClose,
}: {
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h5>
        뉴비드는 모두가 만족하는 안전하고 행복한 공예 문화를 만들기 위해 아래와
        같은 규정을 가지고 있습니다. 꼼꼼히 확인해보시고 동의해주셔야만 비딩이
        완료됩니다.
      </h5>
      <Space height={20} />
      <Terms/>
      <Space height={15} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onNext}>동의합니다.</button>
        <button onClick={onClose}>다시 생각해볼게요</button>
      </div>
    </div>
  );
}

function CompleteModalContent({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h4>
        완료되었습니다.
      </h4>
      <Space height={20} />
      <h4>
      더 높은 금액에 비딩이 이루어질 경우 카카오톡을 통해 노티스 됩니다.
      </h4>
      <Space height={30} />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}


export default function Index() {
  const submit = useSubmit();
  const data = useLoaderData();
  const [myBidPrice, setMyBidPrice] = useState<number>(data.currentPrice + 1000);
  const [noticeText, setNoticeText] = useState<string>("");
  const [isPriceModalOpen, setIsPriceModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);

  function onUpClick() {
    if (myBidPrice + 1000 >= data.currentPrice * 1.2) {
      setNoticeText(
        "진지하고 안전한 비딩을 위해\n현재 비딩가의 20% 이상의 금액을 비딩할 수 없습니다."
      );
    } else {
      setMyBidPrice((prev) => prev + 1000);
    }
  }

  function onDownClick() {
    if (myBidPrice - 1000 <= data.currentPrice) {
      setNoticeText(
        "현재 비딩가보다\n낮은 금액을 비딩할 수 없습니다"
      );
    } else {
      setMyBidPrice((prev) => prev - 1000);
    }
  }

  return (
    <>
      <Modal
        opened={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        centered
        withCloseButton={false}
        size={330}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <PriceModalContent
          itemTitle={itemsJson.items[data.index].title}
          bidPrice={myBidPrice}
          onNext={() => {
            setIsPriceModalOpen(false);
            setIsTermsModalOpen(true);
          }}
          onClose={() => setIsPriceModalOpen(false)}
        />
      </Modal>
      <Modal
        opened={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        centered
        withCloseButton={false}
        size={330}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <TermsModalContent
          onNext={() => { setIsTermsModalOpen(false); setIsCompleteModalOpen(true); }}
          onClose={() => setIsTermsModalOpen(false)}
        />
      </Modal>
      <Modal
        opened={isCompleteModalOpen}
        onClose={() => { setIsCompleteModalOpen(false); submit(null, {method: "post", action: `/list`})}}
        centered
        withCloseButton={false}
        size={330}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <CompleteModalContent
          onClose={() => { setIsCompleteModalOpen(false); submit(null, {method: "post", action: `/list`})}}
        />
      </Modal>
      <BiddingPageBox onScroll={() => console.log("scroll")}>
        <TopBox>
          <CurrentlyText>CURRENTLY</CurrentlyText>
          <CurrentPrice>{data.currentPrice}</CurrentPrice>
        </TopBox>
        <CenterBox>
          <button
            onClick={onUpClick}
            style={{ width: "100px", height: "20px" }}
          >
            {" "}
            UP{" "}
          </button>
          <MyBidText>MY BID</MyBidText>
          <MyBidPrice>{myBidPrice}</MyBidPrice>
          <button
            onClick={onDownClick}
            style={{ width: "100px", height: "20px" }}
          >
            {" "}
            DOWN{" "}
          </button>
        </CenterBox>
        <BottomBox
          onClick={() => {
            // submit(null, {method: "post"});
            setIsPriceModalOpen(true);
          }}
        >
          <NoticeText>{noticeText}</NoticeText>
          <BidButton>BID</BidButton>
        </BottomBox>
      </BiddingPageBox>
    </>
  );
}
