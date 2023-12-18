// Import necessary modules from React and third-party libraries
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';

// Import custom components for card display and loading state
import CardWithButtons from './CardWithButtons';
import LoadingComponent from '../components/LoadingComponent';

// Define the SwipeableCards functional component that takes 'data' as a prop
const SwipeableCards = ({ data }) => {
  // State to track the index of the selected card
  const [cardSelectedIndex, setCardSelectedIndex] = useState(0);

  // Function to handle the change in card index
  const handleIndexChanged = (index) => {
    // Update the selected card index in the state
    setCardSelectedIndex(index);
    
    // Log the current and previous card indices for debugging
    console.log("\n\tSwipeable Card Instance:", index, cardSelectedIndex);

    // You can perform additional actions when the index changes
    // For example, fetching new data based on the current index
  };

  // Render the Swipeable component using the Swiper library
  return (
    <Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      onIndexChanged={handleIndexChanged} // Callback when the index changes
      loadMinimalSize={3} // Number of cards to load around the active card
    >
      {/* Map through the data array to render each card */}
      {data.map((card, index) => (
        // Use React.Fragment to conditionally render either CardWithButtons or LoadingComponent
        <React.Fragment key={index}>
          {/* If the current card index matches the selected index, render CardWithButtons */}
          {index === cardSelectedIndex ? (
            <CardWithButtons
              cardData={card} // Pass the data for the current card
              cardIndex={index} // Pass the index of the current card
              cardSelectedIndex={cardSelectedIndex} // Pass the selected index to the card
            />
          ) : (
            // If the current card index does not match the selected index, render LoadingComponent
            <LoadingComponent />
          )}
        </React.Fragment>
      ))}
    </Swiper>
  );
};

// Export the SwipeableCards component as the default export of this module
export default SwipeableCards;
