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
      as: "style"
    },
    {
      rel: "icon",
      href: "image/favicon.svg"
    }
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
          <script
            type="text/javascript"
            src="https://z7z1yn5j64.execute-api.ap-northeast-2.amazonaws.com/V220930/api/fontstream/djs/?sid=gAAAAABjPoC_JMc6khC0oXKFGZhw3QT3PTAh6xbDIp_rhtFBo6rDNMNaDWvR5zSBJf-x297PjLW6HwtprzGvgJcs_pfNFE-hQ4Kjs9txMocfISExbFqJY5FfrRlmASw5B5QkI-9f3VLswdp2YDEIUDxzfMQzkYMsr-PgjHRVMh0rzY3Ivps4yl0SWoWdBS9di60wYPk1unOUPK87EQA1MstiCXMpacbKj3WOQQ7yLrZAy0JXp99j1_80SzVyTBDq5b_3PDoUnyAA"
            charSet="utf-8"
          />
          <Header />
          <Outlet />
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV =  ${JSON.stringify(data.ENV)}`,
            }}
          />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
