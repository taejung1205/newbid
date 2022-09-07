import { ActionFunction, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { requestTokens } from "~/utils/kakao";

export const action: ActionFunction = async () => {
  console.log("redirect");
  return redirect("/list");
};

export default function Index() {

  const submit = useSubmit();
  
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    const error = params.get('error');
    if (code !== null && error === null) {
      console.log(`code: ${code}`);
      requestTokens({code: code});
    } else {
      console.log(`error: ${error}`);
    }
    submit(null, {method: "post"})
  }, []);

  return (
      <h1>로그인 페이지</h1>
  );
}
