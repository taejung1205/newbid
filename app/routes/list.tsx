import { Loader } from "@mantine/core";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Item } from "~/components/Item";
import { Space } from "~/components/Space";
import itemsJson from "~/data/items.json";
import { getCurrentPrice } from "~/utils/firebase.server";

const ListPageBox = styled.div`
  width: inherit;
  height: inherit;
`;

export const loader: LoaderFunction = async () => {
  return null;
};

export const action: ActionFunction = async () => {
  const itemJsonLength = itemsJson.items.length;
  const currentPriceList = new Array(itemJsonLength);
  for (let i = 0; i < itemJsonLength; i++) {
    currentPriceList[i] = await getCurrentPrice({ itemIndex: i });
  }
  return json({ currentPriceList: currentPriceList });
};

function shuffledArray() {
  var arr = [0, 1, 2, 3, 4, 5, 6];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const finalArr = [];
  for (var i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case 0:
        finalArr.push(0);
        finalArr.push(1);
        finalArr.push(2);
        finalArr.push(3);
        break;
      case 1:
        finalArr.push(4);
        finalArr.push(5);
        finalArr.push(6);
        break;
      case 2:
        finalArr.push(7);
        break;
      case 3:
        finalArr.push(8);
        finalArr.push(9);
        break;
      case 4:
        finalArr.push(10);
        finalArr.push(11);
        break;
      case 5:
        finalArr.push(12);
        break;
      case 6:
        finalArr.push(13);
        finalArr.push(14);
        break;
    }
  }
  return finalArr;
}

export default function Index() {
  const submit = useSubmit();
  const result = useActionData();
  const [orderArr, setOrderArr] = useState<number[]>([]);

  useEffect(() => {
    submit(null, { method: "post" });
    setOrderArr(shuffledArray());
  }, []);

  return (
    <ListPageBox>
      <Space height={70} />
      {result ? (
        orderArr.map((index) => {
          return (
            <Item
              key={`ListItem-${index}`}
              imgSrc={itemsJson.items[index].thumbnail}
              title={itemsJson.items[index].title}
              artist={itemsJson.items[index].artist}
              currentPrice={result.currentPriceList[index]}
              onClick={() =>
                submit(null, { method: "post", action: `/item?index=${index}` })
              }
            />
          );
        })
      ) : (
        <>
          <Space height={50} />
          <Loader />
        </>
      )}
      <Space height={120} />
    </ListPageBox>
  );
}
