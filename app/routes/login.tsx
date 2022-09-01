import { redirect } from "@remix-run/node";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Space } from "~/components/Space";
import { kakaoApiRequest } from "~/utils/kakao";



export default function Index() {

  // useEffect(() => {kakaoApiRequest();}, []);
  

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    const error = params.get('error');
    if (code !== null && error === null) {
      console.log(`code: ${code}`);
    } else {
      console.log(`error: ${error}`);
    }
    redirect("/list");
  }, []);

  return (
      <h1>로그인 페이지</h1>
  );
}
