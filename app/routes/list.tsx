import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import styled from "styled-components";
import {Item} from "~/components/Item";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";
import { getCurrentPrice } from "~/utils/firebase.server";

const ListPageBox = styled.div`
  width: inherit;
  height: inherit;
`;
export const loader: LoaderFunction = async () => {
  const itemJsonLength = itemsJson.items.length;
  const currentPriceList = new Array(itemJsonLength);
  for(let i = 0 ; i < itemJsonLength; i++){
    currentPriceList[i] = await getCurrentPrice({ itemIndex: i });
  }
  return json({currentPriceList: currentPriceList});
}

export const action: ActionFunction = async () => {
  return null;
};

export default function Index() {
  const submit = useSubmit();
  const data = useLoaderData();
  return (
    <ListPageBox>
      <Space height={70} />
      {itemsJson.items.map((item, index) => {
        return (
          <Item
            key={`ListItem-${index}`}
            imgSrc={item.src}
            title={item.title}
            artist={item.artist}
            currentPrice={data.currentPriceList[index]}
            onClick={() => submit(null, { method: "post", action: `/item?index=${index}` })}
          />
        );
      })}
      <Space height={120} />
    </ListPageBox>
  );
}
