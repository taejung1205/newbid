import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { checkLoggedIn, requestUnlink, requestUser } from "~/utils/kakao";
import itemsJson from "~/data/items.json";
import { getBiddingList, getCurrentPrice } from "~/utils/firebase.server";
import { MyItem } from "~/components/Item";
import { Loader } from "@mantine/core";

const MyBidPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const phone = formData.get("phone")?.toString() ?? "";
  const biddingList = await getBiddingList({ phone: phone });
  return json({ list: biddingList });
};

export const loader: LoaderFunction = async () => {
  const itemJsonLength = itemsJson.items.length;
  const currentPriceList = new Array(itemJsonLength);
  for (let i = 0; i < itemJsonLength; i++) {
    currentPriceList[i] = await getCurrentPrice({ itemIndex: i });
  }
  return json({ currentPriceList: currentPriceList });
};

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState<string>("undefined");
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const result = useActionData();
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    //로그인이 되어있지 않을 경우 로그인 화면으로 이동 + 돌아올때 여기로
    checkLoggedIn({
      trueCallback: () => {
      },
      falseCallback: () => {
        navigate("/login?path=mybid");
      },
    });

    requestUser({
      successCallback: (res: any) => {
        const kakaoAccount = res.kakao_account;
        if (kakaoAccount !== undefined) {
          console.log(kakaoAccount);
          setPhoneNumber(kakaoAccount.phone_number);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (phoneNumber !== "undefined") {
      const formData = new FormData(formRef.current ?? undefined);
      formData.set("phone", phoneNumber);
      submit(formData, { method: "post" });
    }
  }, [phoneNumber]);

  return (
    <MyBidPageBox>
      <Space height={70} />
      {result ? (
        result.list.map((bidItem: any, index: number) => {
          const thisItem = itemsJson.items[bidItem.index];
          return (
            <MyItem
              index={bidItem.index}
              key={`MyBidItem-${index}`}
              imgSrc={thisItem.src}
              title={thisItem.title}
              artist={thisItem.artist}
              currentPrice={data.currentPriceList[bidItem.index]}
              myBidPrice={bidItem.biddingPrice}
              onClick={() =>
                submit(null, { method: "post", action: `/item?index=${index}` })
              }
              isHighest={bidItem.isHighest}
            />
          );
        })
      ) : (
        <>
          <Space height={70} />
          <Loader />
        </>
      )}

      <Space height={120} />
    </MyBidPageBox>
  );
}
