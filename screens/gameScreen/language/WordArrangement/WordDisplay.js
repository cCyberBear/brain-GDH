import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordDisplay = ({ word }) => {
  return (
    <View style={styles.container}>
      {word.split("").map((letter, index) => (
        <Text key={index} style={styles.letter}>
          {letter}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 24,
    margin: 5,
  },
});

export default WordDisplay;
