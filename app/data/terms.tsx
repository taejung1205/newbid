import styled from "styled-components";

const TermsBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  padding: 5px;
  overflow-y: scroll;
  justify-content: left;
  * {
    text-align: left;
    display: inline-block;
  }
`;

export function Terms() {
  return (
    <TermsBox>
      <div style={{ display: "flex" }}>
        <b>
          <h5>개인정보의 수집· 이용 동의{"   "}</h5>
        </b>
        <h6>(필수동의)</h6>
      </div>
      <h6>
        <b>
          따바프레스 주식회사 (이하 ‘회사’)은 미술품경매 등과 관련하여 회사가
          개인정보를 수집∙이용하거나 제3자에게 제공하고자 하는 경우에는 개인정보
          수집· 이용을 위하여 개인정보보호법 제15조, 제17조 및 제22조에 따라
          회원의 동의를 얻고 있습니다. 이에 회원은 회사가 아래의 내용과 같이
          회원의 개인정보를 수집∙이용 또는 제공하는 것에 동의합니다. 본 동의서
          상의 용어의 정의는 “뉴비드 경매약관"을 준용합니다.
        </b>
      </h6>
    </TermsBox>
  );
}
