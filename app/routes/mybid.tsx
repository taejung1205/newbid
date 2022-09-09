import { ActionFunction, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { requestUnlink, requestUser } from "~/utils/kakao";

const MyBidPageBox = styled.div`
  overflow: hidden;
  width: inherit;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const action: ActionFunction = async () => {
  console.log("redirect");
  return redirect("/");
};

export default function Index() {
  const [name, setName] = useState<string>("Name undefined");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    "Phone number undefined"
  );
  const [email, setEmail] = useState<string>("Email undefined");
  const submit = useSubmit();

  useEffect(() => {
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
  return (
    <MyBidPageBox>
      <h1>내 비딩 페이지</h1>
      <h4>{name}</h4>
      <h4>{phoneNumber}</h4>
      <h4>{email}</h4>
      <h4
        onClick={() =>
          requestUnlink({
            successCallback: (res: any) => {
              console.log("로그아웃 성공");
              submit(null, { method: "post" });
            },
          })
        }
      >
        로그아웃
      </h4>
      <h4
        onClick={() =>
          requestUnlink({
            successCallback: (res: any) => {
              console.log("탈퇴 성공");
              submit(null, { method: "post" });
            },
          })
        }
      >
        탈퇴
      </h4>
    </MyBidPageBox>
  );
}
