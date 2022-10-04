import { ActionFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styled from "styled-components";
import { Space } from "~/components/Space";

const AboutPageBox = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 35px;
`;

const TitleText = styled.text`
  font-size: 33px;
  line-height: 40px;
  color: #451bc8;
  text-align: left;
`;

const TitleText2 = styled(TitleText)`
  font-size: 21px;
  line-height: 25px;
`;

const BodyText = styled.text`
  font-size: 20px;
  color: #451bc8;
  line-height: 28px;
  white-space: pre-wrap;
  text-align: left;
`;

const LinkText = styled(BodyText)`
  color: #999999;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: left;
  padding: 8px;
  border-top: "2px solid #451bc8";
  text-align: left !important;
  min-height: 110px;
`;

const SponsorText = styled.text`
  font-size: 16px;
  text-align: left;
  margin: 30px;
`;

function ItemDetail({
  leftElement,
  rightElement,
}: {
  leftElement: JSX.Element;
  rightElement: JSX.Element;
}) {
  return (
    <DetailBox>
      <div style={{ flex: 2, textAlign: "left" }}>{leftElement}</div>
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 6, textAlign: "left" }}>{rightElement}</div>
    </DetailBox>
  );
}

export const action: ActionFunction = async () => {
  return null;
};

export default function Index() {
  return (
    <AboutPageBox>
      <Space height={140} />
      <TopBox>
        <TitleText className="font_gretasans_black">
          10월 12일 - 15일 <br />
          코엑스 D홀 D-03 <br />
          10AM - 6PM
        </TitleText>
        <Space height={60} />
        <TitleText2 className="font_gretasans_black">
          뉴비드의 첫번째 컬렉션은 <br />
          위 기간동안 코엑스에서 진행되는 <br />
          {"<크래프트 서울페어>를"} 통해 <br />
          실제로 만나보실 수 있습니다.{" "}
        </TitleText2>
        <Space height={10} />
        <Link
          to={"https://booking.naver.com/booking/5/bizes/745944"}
          style={{ textDecoration: "none" }}
        >
          <LinkText className="font_gretasans_black">
            관람 예매하러 가기
          </LinkText>
        </Link>
      </TopBox>
      <Space height={120} />
      <ItemDetail
        leftElement={
          <BodyText className="font_gretasans_black">
            뉴비드에
            <br />
            대하여
          </BodyText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">
              {
                "<뉴비드>는 로파 서울이 운영하는 새로운 세대를 위한 미술품 경매 사이트입니다."
              }{" "}
              <br />
              20-30대의 젊은 아티스트들의 작업과 함께 그들의 이력 대신
              인스타그램 계정을 공유합니다. <br />
              <br />
              절차가 까다로운 기존의 경매 방식 대신, 클릭만으로 비딩이 가능한
              새로운 시스템을 제안합니다. <br />
              <br />
              공예와 예술이 대중화 되고, 자주 회자 되는 아티스트들의 연령대가
              점차 낮아지며 예술품 시장은 불과 2,3년 전 과도 확연하게 다른
              양상으로 전개되고 있습니다. 또한 예술품을 소유하고 싶어하는 이들
              역시 예술품을 스트리트 문화의 한 요소로 인식하며 그 흐름에 박차를
              가하고 있습니다. 자본과 개념 미술로 대변되던 기존 세대의
              반대편에서, 점차 새로운 문화로 자리잡고 있는 이들을 저희는 ‘새로운
              세대’라고 정의 했습니다. <br />
              <br />
              하지만 여전히 대다수의 작품들은 이전 세대의 갤러리와 경매를 통해
              거래됩니다. 이전 세대의 진입의 벽은 아티스트들 뿐만 아니라, 예술을
              새로이 향유하고자 하는 개인들에게도 너무나 높은 벽입니다. 젊은
              아티스트들을 찾는 기업들도 점차 늘어나고 있지만, 대다수는 그들의
              비즈니스 공간을 채우는 반짝임 그 이상으로 발전되지 못하고
              있습니다. <br /> <br />
              뉴비드는 이러한 현 사회의 모순에 대해 저항해보았습니다. 유머와
              서브컬쳐에 기반을 둔 작가들의 컬렉션과 함께, 디지털로 경매 시장을
              가져옵니다. 하지만 뉴비드는 예술 시장의 흐름이 이처럼 흘러야
              한다고 주장하지 않습니다. 오히려 이번 첫 컬렉션과 저희의 시도가 현
              시장에 대한 물음표를 던질 수 있는 계기가 되었으면 좋겠습니다.
            </BodyText>
            <Space height={40} />
          </>
        }
      />
      <ItemDetail
        leftElement={
          <BodyText className="font_gretasans_black">
            로파
            <br />
            서울
          </BodyText>
        }
        rightElement={
          <>
            <BodyText className="font_gretasans_black">
              로파 서울은 별난 기획을 하는 아트 커머스 팀입니다. 창작자들에 대한
              각별한 시선을 바탕으로, 그들의 작업이 대중들의 일상에 보다 가까이
              다가갈 수 있도록 연구하고 있습니다.
            </BodyText>
            <Space height={40} />
            <Link
              to="https://www.instagram.com/lofa_seoul"
              style={{ textDecoration: "none" }}
            >
              <LinkText className="font_gretasans_black">인스타그램</LinkText>
            </Link>
            <Space height={5} />
            <Link
              to="https://shoplostandfound.kr"
              style={{ textDecoration: "none" }}
            >
              <LinkText className="font_gretasans_black">
                공식 홈페이지
              </LinkText>
            </Link>
            <Space height={40} />
            <LinkText className="font_gretasans_black">
              kyj@tabacpress.xyz
            </LinkText>
          </>
        }
      />
      <Space height={40} />
      <SponsorText className="font_gretasans_black">
        이 페이지는 산돌구름에서 협찬 제공한 <br /> 웹폰트로 제작되었습니다.
      </SponsorText>
      <Space height={240} />
    </AboutPageBox>
  );
}
