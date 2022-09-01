import styled from "styled-components";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";

const TilePageBox = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  margin: 20px;
  gap: 10px;
`;
const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export default function Index() {
  return (
    <TilePageBox>
      <Space height={160} />
      <ItemsGrid>
        {itemsJson.items.map((item, index) => {
          return <ItemImage src={item.src} key={`TileItem-${index}`} />;
        })}
      </ItemsGrid>
      <Space height={120} />
    </TilePageBox>
  );
}
