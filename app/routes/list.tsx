import styled from "styled-components";
import Item from "~/components/Item";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";

const ListPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

export default function Index() {
  return (
    <ListPageBox>
      <Space height={160} />
      {itemsJson.items.map((item, index) => {
        return (
          <Item
            key={`ListItem-${index}`}
            imgSrc={item.src}
            title={item.title}
            body={item.body}
            currentPrice={80000}
            startPrice={item.startPrice}
          />
        );
      })}
      <Space height={120} />
    </ListPageBox>
  );
}
