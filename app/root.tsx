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

export function links() {
  return [
    {
      rel: "stylesheet",
      href: globalStyle,
    },
  ];
}
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
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js" />
          <script dangerouslySetInnerHTML={{__html: `window.ENV =  ${JSON.stringify(data.ENV)}`}} />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
