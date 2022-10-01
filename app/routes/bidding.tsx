import { Modal } from "@mantine/core";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCurrentPrice, requestBidding } from "~/utils/firebase.server";
import itemsJson from "~/data/items.json";
import { Space } from "~/components/Space";
import { Terms } from "~/data/terms";
import { checkLoggedIn, requestUser } from "~/utils/kakao";

const BiddingPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
  background-color: #451bc8;
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
  top: 70px;
  color: white;
`;

const CenterBox = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
`;

const BottomBox = styled.div`
  position: absolute;
  bottom: 25vw;
  left: 0;
  right: 0;
  @media only screen and (min-width: 750px) {
    bottom: 140px;
  }
`;
const TitleText = styled.text`
  font-size: 20px;
  line-height: 25px;
`;

const CurrentlyText = styled.text`
  font-size: 16px;
  line-height: 19px;
`;

const CurrentPrice = styled.text`
  font-size: 37px;
  line-height: 46px;
`;

const KRWText = styled.text`
  font-size: 31px;
  line-height: 38px;
`;

const MyBidPrice = styled.text`
  font-size: 63px;
  line-height: 75px;
`;

const MyBidKRWText = styled.text`
  font-size: 38px;
  line-height: 49px;
`;

const BidPriceButton = styled.text`
  font-size: 70px;
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
  border-radius: 110px;
  vertical-align: bottom;
  margin-left: auto;
  margin-right: auto;
`;

const NoticeText = styled.text`
  color: white;
  size: 23px;
  line-height: 28px;
  white-space: pre-line;
`;

const ModalText = styled.text`
  color: #451bc8;
  font-size: 20px;
`;

const ModalOkButton = styled(BidButton)`
  border: 1px solid #451bc8;
  font-size: 20px;
`;

const TermsModalText = styled(ModalText)`
  font-size: 16px;
`;
const TermsModalOkButton = styled(ModalOkButton)`
  width: 80px;
  font-size: 16px;
  margin-right: 0;
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const itemIndex = Number(formData.get("itemIndex") ?? -1);
  const name = formData.get("name")?.toString() ?? "undefined";
  const phone = formData.get("phone")?.toString() ?? "undefined";
  const email = formData.get("email")?.toString() ?? "undefined";
  const biddingPrice = Number(formData.get("biddingPrice") ?? -1);
  const result = await requestBidding({
    itemIndex: itemIndex,
    name: name,
    phone: phone,
    biddingPrice: biddingPrice,
    email: email,
  });
  console.log(result);
  return result;
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
      <ModalText>
        {itemTitle}에 대해 {bidPrice}원을 비딩하는 것이 맞으실까요?
      </ModalText>
      <Space height={40} />
      <ModalOkButton onClick={onNext}>네, 맞아요</ModalOkButton>
      <Space height={10} />
      <ModalText onClick={onClose}>다시 생각해볼게요</ModalText>
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
      <TermsModalText>
        뉴비드는 모두가 만족하는 안전하고 행복한 공예 문화를 만들기 위해 아래와
        같은 규정을 가지고 있습니다. 꼼꼼히 확인해보시고 동의해주셔야만 비딩이
        완료됩니다.
      </TermsModalText>
      <Space height={20} />
      <Terms />
      <Space height={15} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <TermsModalText onClick={onClose}>다시 생각할게요</TermsModalText>
        <TermsModalOkButton onClick={onNext}>동의합니다</TermsModalOkButton>
      </div>
    </div>
  );
}

function CompleteModalContent({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ModalText>완료되었습니다.</ModalText>
      <Space height={20} />
      <ModalText>
        더 높은 금액에 비딩이 이루어질 경우 카카오톡을 통해 노티스 됩니다.
      </ModalText>
      <Space height={30} />
      <ModalOkButton onClick={onClose}>확인</ModalOkButton>
    </div>
  );
}

export default function Index() {
  const submit = useSubmit();
  const data = useLoaderData();
  const result = useActionData();
  const [myBidPrice, setMyBidPrice] = useState<number>(
    data.currentPrice + 1000
  );
  const [noticeText, setNoticeText] = useState<string>("");
  const [isPriceModalOpen, setIsPriceModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("Name undefined");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    "Phone number undefined"
  );
  const [email, setEmail] = useState<string>("Email undefined");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

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
      setNoticeText("현재 비딩가보다\n낮은 금액을 비딩할 수 없습니다");
    } else {
      setMyBidPrice((prev) => prev - 1000);
    }
  }

  function createBiddingFormData() {
    const formData = new FormData(formRef.current ?? undefined);
    formData.set("itemIndex", data.index);
    formData.set("name", name);
    formData.set("phone", phoneNumber);
    formData.set("email", email);
    formData.set("biddingPrice", myBidPrice.toString());
    return formData;
  }

  useEffect(() => {
    checkLoggedIn({
      trueCallback: () => {},
      falseCallback: () => {
        submit(null, {
          method: "post",
          action: `/login?path=bidding&index=${data.index}`,
        });
      },
    });

    requestUser({
      successCallback: (res: any) => {
        console.log("User: ");
        console.log(res);
        const kakaoAccount = res.kakao_account;
        if (kakaoAccount !== undefined) {
          setName(kakaoAccount.name);
          setPhoneNumber(kakaoAccount.phone_number);
          setEmail(kakaoAccount.email);
        }
      },
    });
  }, []);

  useEffect(() => {
    setIsLoading(false);
    if (result !== undefined) {
      if(result.result !== undefined){
        if (result.result === "success") {
          setIsCompleteModalOpen(true);
        } else {
          if(result.detail === "duplicate"){
            setNoticeText("이미 최고가로 비딩하셨습니다.\n같은 인원이 연속으로 비딩할 수 없습니다.");
          } else if(result.detail === "cannot find item"){
            setNoticeText("작품을 찾을 수 없습니다.\n페이지를 다시 확인해주세요.");
          } else if(result.detail === "cannot find item"){
            setNoticeText("다른 이용자가 더 높은 가격에 비딩하였습니다.\n비딩 가격을 올린 후 다시 시도해주세요.");
          }
        }
      } else {
        setNoticeText("경매 중 오류가 발생했습니다.\n다시 시도해주세요.");
      }
    }
  }, [result]);

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
          onNext={() => {
            setIsTermsModalOpen(false);
            setIsLoading(true);
            const formData = createBiddingFormData();
            submit(formData, { method: "post" });
          }}
          onClose={() => setIsTermsModalOpen(false)}
        />
      </Modal>
      <Modal
        opened={isCompleteModalOpen}
        onClose={() => {
          setIsCompleteModalOpen(false);
          submit(null, { method: "post", action: `/list` });
        }}
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
          onClose={() => {
            setIsCompleteModalOpen(false);
            submit(null, { method: "post", action: `/list` });
          }}
        />
      </Modal>
      <BiddingPageBox onScroll={() => console.log("scroll")}>
        <TopBox>
          <TitleText>{itemsJson.items[data.index].title}</TitleText>
          <Space height={2} />
          <TitleText>{itemsJson.items[data.index].artist}</TitleText>
          <Space height={20} />
          <CurrentlyText>CURRENTLY</CurrentlyText>
          <span>
            <CurrentPrice>{data.currentPrice}</CurrentPrice>
            <KRWText> KRW</KRWText>
          </span>
        </TopBox>
        <CenterBox>
          <MyBidPrice>{myBidPrice}</MyBidPrice>
          <MyBidKRWText>KRW</MyBidKRWText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <BidPriceButton onClick={onDownClick}>-</BidPriceButton>
            <BidPriceButton onClick={onUpClick}>+</BidPriceButton>
          </div>
          <BidButton
            onClick={() => {
              setIsPriceModalOpen(true);
            }}
          >
            비딩하기
          </BidButton>
        </CenterBox>
        <BottomBox>
          <NoticeText>{noticeText}</NoticeText>
        </BottomBox>
      </BiddingPageBox>
    </>
  );
}
