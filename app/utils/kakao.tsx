import { redirect } from "@remix-run/node";

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
  kakao.Auth.authorize({ redirectUri: "https://newbid.netlify.app/login/" });
}

export function kakaoApiRequest() {
  if (window !== undefined && typeof window !== "undefined") {
    const kakao = (window as any).Kakao;
    kakao.API.request({
      url: "/v2/user/me",
      success: function (response: any) {
        console.log(response);
      },
      fail: function (error: any) {
        console.log(error);
      },
    });
  }
}
