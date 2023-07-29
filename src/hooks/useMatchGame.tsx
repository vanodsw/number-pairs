import { useState, useEffect } from "react";
import _ from "lodash";

import { theNumberList } from "src/constants";

const shuffletheNumbers = () => {
  // Shuffle the deck of theNumbers so we get different ones each game then grab the first 8
  const shortenedDeck = _.shuffle(theNumberList).slice(0, 8);
  // Make a deck with 2 of each theNumber and then shuffle that
  return _.shuffle([...shortenedDeck, ...shortenedDeck]);
};

export const useMatchGame = () => {
  const [theNumbers, settheNumbers] = useState(shuffletheNumbers());
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [comparisonCards, setComparisonCards] = useState<number[]>([]);
  const [totalMoves, setTotalMoves] = useState(0);

  useEffect(() => {
    // After they've selected two cards we'll hide them after one second
    let timeout: ReturnType<typeof setTimeout>;
    if (comparisonCards.length == 2) {
      timeout = setTimeout(() => {
        setComparisonCards([]);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [comparisonCards]);

  const reset = () => {
    setMatchedCards([]);
    setComparisonCards([]);
    setTotalMoves(0);
    setTimeout(() => {
      // We want to wait to shuffle the theNumbers otherwise any cards that are "flipped" will show
      // the new theNumber before it flips over
      settheNumbers(shuffletheNumbers());
    }, 500);
  };

  const chooseCard = (index: number) => {
    // we're comparing this card to a previously selected card
    if (comparisonCards.length === 1) {
      // don't let them choose the same card twice
      if (comparisonCards[0] === index) {
        return;
      }

      // increase move count
      setTotalMoves((moves) => moves + 1);

      setComparisonCards((cards) => {
        // get the selected cards
        const newCards = [...cards, index];

        // compare the theNumbers. If they match, update the visible cards
        if (theNumbers[newCards[0]] === theNumbers[newCards[1]]) {
          setMatchedCards((c) => [...c, ...newCards]);
        }

        // return the update selected cards so the user can see both at the same time
        return newCards;
      });
    } else {
      // new guess, reset the array
      setComparisonCards([index]);
    }
  };

  return {
    theNumbers,
    reset,
    chooseCard,
    activeCardIndex: comparisonCards[comparisonCards.length - 1],
    matchedCards,
    comparisonCards,
    totalMoves,
    matchCount: matchedCards.length / 2,
    totalPairs: theNumbers.length / 2,
  };
};
