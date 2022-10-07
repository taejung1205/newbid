import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  json,
} from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { MantineProvider } from "@mantine/core";

import globalStyle from "~/global.style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getEnv } from "./env.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStyle,
      as: "style",
    },
    {
      rel: "icon",
      href: "image/favicon.svg",
    },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  return json({
    ENV: getEnv(),
  });
};

export default function App() {
  const data = useLoaderData();
  return (
    <MantineProvider>
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {typeof document === "undefined" ? "__STYLES__" : null}
        </head>
        <body onLoad={() => window.scrollTo(0, 1)}>
          <Header />
          <Outlet />
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <script
            type="text/javascript"
            src="https://z7z1yn5j64.execute-api.ap-northeast-2.amazonaws.com/V220930/api/fontstream/djs/?sid=gAAAAABjPoC_JMc6khC0oXKFGZhw3QT3PTAh6xbDIp_rhtFBo6rDNMNaDWvR5zSBJf-x297PjLW6HwtprzGvgJcs_pfNFE-hQ4Kjs9txMocfISExbFqJY5FfrRlmASw5B5QkI-9f3VLswdp2YDEIUDxzfMQzkYMsr-PgjHRVMh0rzY3Ivps4yl0SWoWdBS9di60wYPk1unOUPK87EQA1MstiCXMpacbKj3WOQQ7yLrZAy0JXp99j1_80SzVyTBDq5b_3PDoUnyAA"
            charSet="utf-8"
          />
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV =  ${JSON.stringify(data.ENV)}`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `if(navigator.userAgent.includes("Instagram")){
                var copytoclipboard = function(val){
                  var t = document.createElement("textarea");
                  document.body.appendChild(t);
                  t.value = val;
                  t.select();
                  document.execCommand('copy');
                  document.body.removeChild(t);
                };
                var inappbrowserout = function(){
                  copytoclipboard(window.location.href);
                  alert('URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.');
                  location.href='x-web-search://?';
                }
                if(navigator.userAgent.match(/iPhone|iPad/i)){
                  //모바일대응뷰포트강제설정
                  var mobile = document.createElement('meta');
                  mobile.name = 'viewport';
                  mobile.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
                  document.getElementsByTagName('head')[0].appendChild(mobile);
                  //노토산스폰트강제설정
                  var fonts = document.createElement('link');
                  fonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
                  document.getElementsByTagName('head')[0].appendChild(fonts);
                  document.body.innerHTML = "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
                }else{
                  location.href='intent://'+location.href.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
                }
          }`,
            }}
          />

          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
