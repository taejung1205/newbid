const API_KEY = "p7sld7tlcuddy8k2ylnkcgetzez2ii8x"
const USER_ID = "tabacpress"
const TOKEN = "110102199d369d7e7eb1e57c108e1dd402ca2a661a0339e759…Ls7STR5aVKaWFPl91uuCR3mcUxnubhhEF7pvLYuAvWwrH7g==" 

export async function createToken() {
  let result;
  console.log("requesting token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  await fetch(
    `https://kakaoapi.aligo.in/akv10/token/create/30/s?apikey=${API_KEY}&userid=${USER_ID}`,
    requestOptions
  ).then((response) => response.json())
  .then((data) => {
    console.log(data);
    result = data.token;
  });
  return result;
}

export async function sendMessage(){
  console.log("sending message");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  await fetch(
    `https://kakaoapi.aligo.in/akv10/alimtalk/send?` 
    + `apikey=${API_KEY}&userid=${USER_ID}&`
    + `token=${TOKEN}&`
    + `senderkey=5f2e9d1d1ef75221a840061fa4ce9ef9648d6e2c&`
    + `tpl_code=TK_0617&`
    + `sender=01021629843&`
    + `receiver_1=01023540973&`
    + `subject_1=TEST`,    
    requestOptions
  ).then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}