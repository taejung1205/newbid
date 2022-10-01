import { Loader } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { Space } from "~/components/Space";
import { requestTokens } from "~/utils/kakao";

export const action: ActionFunction = async () => {
  return null;
};

export default function Index() {
  const submit = useSubmit();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const error = params.get("error");
    const redirectPath = params.get("state") ?? "";
    if (code !== null && error === null) {
      console.log(`code: ${code}`);
      requestTokens({ code: code });
    } else {
      console.log(`error: ${error}`);
    }
    submit(null, { method: "post", action: redirectPath });
  }, []);

  return <>
    <Space height={120} />
    <Loader />
  </>;
}
