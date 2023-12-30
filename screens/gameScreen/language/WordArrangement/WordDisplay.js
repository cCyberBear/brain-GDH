import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordDisplay = ({ word }) => {
  return (
    <View style={styles.container}>
      {word.map((letter, index) => (
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
    marginBottom: 20,
  },
  letterContainer: {
    backgroundColor: "#3498db",
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  letter: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingTop: 14,
  },
});

export default WordDisplay;
