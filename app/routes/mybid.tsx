import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { checkLoggedIn, requestUnlink, requestUser } from "~/utils/kakao";
import itemsJson from "~/data/items.json";
import { getBiddingList } from "~/utils/firebase.server";
import Item from "~/components/Item";
import { Loader } from "@mantine/core";

const MyBidPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const phone = formData.get("phone")?.toString() ?? "";
  const biddingList = await getBiddingList({ phone: phone });
  console.log(biddingList);
  return json({ list: biddingList });
};

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState<string>(
    "Phone number undefined"
  );
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const result = useActionData();

  useEffect(() => {
    //로그인이 되어있지 않을 경우 로그인 화면으로 이동 + 돌아올때 여기로
    console.log("useeffect");
    checkLoggedIn({
      trueCallback: () => {},
      falseCallback: () => {
        submit(null, {
          method: "post",
          action: `/login?path=mybid`,
        });
      },
    });

    requestUser({
      successCallback: (res: any) => {
        const kakaoAccount = res.kakao_account;
        if (kakaoAccount !== undefined) {
          setPhoneNumber(kakaoAccount.phone_number);
        }
      },
    });
  }, []);

  useEffect(() => {
    const formData = new FormData(formRef.current ?? undefined);
    formData.set("phone", phoneNumber);
    submit(formData, { method: "post" });
  }, [phoneNumber]);

  return (
    <MyBidPageBox>
      <Space height={70} />
      {result ? (
        result.list.map((bidItem: any, index: number) => {
          const thisItem = itemsJson.items[bidItem.index];
          return (
            <Item
              key={`MyBidItem-${index}`}
              imgSrc={thisItem.src}
              title={thisItem.title}
              artist={thisItem.artist}
              currentPrice={bidItem.biddingPrice}
              startPrice={thisItem.startPrice}
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
