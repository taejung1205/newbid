// const REDIRECT_URI = "http://localhost:3000/login/";
const REDIRECT_URI =  "https://newbid.netlify.app/login/";
const CLIENT_ID = "13cb50f748fa0ea1bf651c4311112be7";

export function kakaoInit(): any {
  const kakao = (window as any).Kakao;
  if (!kakao.isInitialized()) {
    kakao.init("810b82491c5d0c99501bf55ab85bce0f");
  }
  return kakao;
}

export function isKakaoInitialized(): boolean {
  const kakao = (window as any).Kakao;
  return kakao.isInitialized();
}

export function kakaoLogin() {
  const kakao = kakaoInit();
  kakao.Auth.authorize({ redirectUri: REDIRECT_URI });
}

// export function kakaoApiRequest() {
//
// }

export async function requestTokens({ code }: { code: string }) {
  console.log("requesting token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  await fetch(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.access_token);
      setKakaoAccessToken({ token: data.access_token });
    });
  console.log((window as any).Kakao);
}

export function setKakaoAccessToken({ token }: { token: string }) {
  const kakao = kakaoInit();
  kakao.Auth.setAccessToken(token);
}

export function getKakaoAccessToken() {
  const kakao = kakaoInit();
  return kakao.Auth.getAccessToken();
}

export function requestUser({
  successCallback,
}: {
  successCallback: (res: any) => void;
}) {
  const kakao = kakaoInit();
  kakao.API.request({
    url: "/v2/user/me",
    success: successCallback,
    fail: (error: any) => {
      console.error(error);
    },
  });
}

export function requestLogout({
  successCallback,
}: {
  successCallback: () => void;
}) {
  const kakao = kakaoInit();
  if (!kakao.Auth.getAccessToken()) {
    console.log("로그인이 되어 있지 않습니다.");
    return;
  }

  kakao.Auth.logout(successCallback);
}

export function requestUnlink({
  successCallback,
}: {
  successCallback: (res: any) => void;
}) {
  const kakao = kakaoInit();
  kakao.API.request({
    url: "/v1/user/unlink",
    success: successCallback,
    fail: (error: any) => {
      console.error(error);
    },
  });
}
