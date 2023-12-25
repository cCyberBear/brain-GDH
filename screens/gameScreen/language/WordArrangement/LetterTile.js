import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LetterTile = ({ letter, onPress }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Text style={styles.letter}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#2ecc71",
    padding: 20,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
  },
  letter: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LetterTile;
