import type { MetaFunction, LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { MantineProvider } from '@mantine/core';

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
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/ivi5rii.css"
    }
  ];
}

export default function App() {
  return (
    <MantineProvider>
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
    </MantineProvider>
  );
}
