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
      href: "https://z7z1yn5j64.execute-api.ap-northeast-2.amazonaws.com/V220930/api/fontstream/djs/?sid=gAAAAABjNoKB7aPtIJAn5jRMcYaz_Y-KZ4K-EOCGwhpW61tp_3yG3hoZRHqp-hAYyOzHi66fHUcsFs3gmIKAs3PK5K9MRVur0OOZR-1VNcmmUbFmkTom1C9u3WDjsk7A6-ZSpEGb_AdG6c_ksWhWQSzEFQrOS31--tX8_rDlpOm6sx-viCz_ZE7i5XDWuDSAbLocnrxVOACMAMVnNpmKqp79fYvMTixVBI2YqQWISV5ZO5u_wcqIlp_bSTMVr2u9-WNJutLtaBst",
      type: "text/javascript",
      charSet: "utf-8"
    },
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
          {/* <script
            type="text/javascript"
            src="https://z7z1yn5j64.execute-api.ap-northeast-2.amazonaws.com/V220930/api/fontstream/djs/?sid=gAAAAABjNoKB7aPtIJAn5jRMcYaz_Y-KZ4K-EOCGwhpW61tp_3yG3hoZRHqp-hAYyOzHi66fHUcsFs3gmIKAs3PK5K9MRVur0OOZR-1VNcmmUbFmkTom1C9u3WDjsk7A6-ZSpEGb_AdG6c_ksWhWQSzEFQrOS31--tX8_rDlpOm6sx-viCz_ZE7i5XDWuDSAbLocnrxVOACMAMVnNpmKqp79fYvMTixVBI2YqQWISV5ZO5u_wcqIlp_bSTMVr2u9-WNJutLtaBst"
            charSet="utf-8"
          /> */}
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
