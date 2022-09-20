import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";
import { injectStyles, createStylesServer } from "@mantine/remix";
import { ServerStyleSheet } from "styled-components";
import { getEnv } from "./env.server";

global.ENV = getEnv();

const server = createStylesServer();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const sheet = new ServerStyleSheet();

  let markup = renderToString(
    sheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />
    )
  );

  const styles = sheet.getStyleTags();
  markup = markup.replace("__STYLES__", styles);

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
