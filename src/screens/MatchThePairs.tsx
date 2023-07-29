import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import { StatsCard, GameCard } from "components/cards";
import { Button } from "components/buttons";

import { Spacing, Colors } from "constants/index";

import { useMatchGame } from "hooks/useMatchGame";
import { useEffect } from "react";

const ROWS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];

const MatchThePairs = () => {
  const {
    theNumbers,
    reset,
    chooseCard,
    activeCardIndex,
    matchedCards,
    comparisonCards,
    totalMoves,
    totalPairs,
    matchCount,
  } = useMatchGame();

  const handlePress = (index: number) => {
    chooseCard(index);
  };

  useEffect(() => {
    if (matchCount === totalPairs) {
      Alert.alert(
        "Congratulation",
        "Wanna play again",
        [
          {
            text: "No",

            style: "cancel",
          },
          { text: "Yes", onPress: () => reset() },
        ],
        { cancelable: false }
      );
    }
  }, [totalMoves]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <StatusBar style="light" />

        <View style={[styles.row, styles.stats]}>
          <Button width="40%" label="Restart" onPress={() => reset()} />
          <StatsCard title="Total moves" numerator={totalMoves} />
        </View>

        {ROWS.map((indices, rowIndex) => (
          <View style={[styles.row, styles.gameRow]} key={rowIndex}>
            {indices.map((theNumberIndex) => {
              const inMatchedCard = matchedCards.includes(theNumberIndex);
              const cardIsVisible =
                inMatchedCard || comparisonCards.includes(theNumberIndex);

              return (
                <GameCard
                  key={theNumberIndex}
                  index={theNumberIndex}
                  theNumbers={theNumbers}
                  onPress={() => handlePress(theNumberIndex)}
                  selected={activeCardIndex === theNumberIndex}
                  visible={cardIsVisible}
                  disabled={inMatchedCard}
                />
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container and content are used together to make sure the board doesn't get too wide
  // and ensure the board is always centered
  container: {
    flex: 1,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    backgroundColor: Colors.greyDarkest,
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 550,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: Spacing.sm,
  },
  gameRow: {
    flex: 1,
  },
  header: {
    marginHorizontal: Spacing.md,
  },
  stats: {
    marginBottom: Spacing.lg,
  },
  actions: {
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
});

export default MatchThePairs;
