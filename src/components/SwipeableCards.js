import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import CardWithButtons from './CardWithButtons';

const SwipeableCards = ({ data }) => {
  const [cardSelectedIndex, setCardSelectedIndex] = useState(0);

  const handleIndexChanged = (index) => {
    setCardSelectedIndex(index);
    console.log("\n", index, cardSelectedIndex);
    // You can perform additional actions when the index changes
    // For example, fetching new data based on the current index
  };

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      onIndexChanged={handleIndexChanged}
    >
      {data.map((card, index) => (
        <CardWithButtons key={index} cardData={card}  cardIndex={index} cardSelectedIndex={cardSelectedIndex} resetCardIndex={cardSelectedIndex} />
      ))}
    </Swiper>
  );
};

export default SwipeableCards;
