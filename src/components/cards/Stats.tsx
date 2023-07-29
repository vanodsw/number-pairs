import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Colors, Spacing, Theme } from "src/constants";

type StatsCardProps = {
  title: string;
  numerator: number;
};

export const StatsCard = (props: StatsCardProps) => {
  const { numerator } = props;

  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.numerator}>{numerator}</Text>
      </View>
    </View>
  );
};

const borderRadius = Theme.radiusSm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyDarkest,
    margin: Spacing.sm,
    borderRadius,
    borderWidth: 2,
    borderColor: Colors.greyMedium,
  },
  content: {
    padding: Spacing.sm,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.greyLight,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  numerator: {
    color: Colors.greyLight,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
