export function getEnv() {
  return {
    KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
    KAKAO_REST_KEY: process.env.KAKAO_REST_KEY,
    URL: process.env.URL
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
    var ENV: ENV;
    interface Window {
        ENV: ENV;
    }
}