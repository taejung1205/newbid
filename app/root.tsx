import type { MetaFunction, LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { MantineProvider } from "@mantine/core";

import globalStyle from "~/global.style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

export default function App() {
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
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
