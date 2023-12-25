import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Card = ({ value, isFlipped, onCardPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isFlipped && styles.flipped]}
      onPress={() => onCardPress(value)}
      disabled={isFlipped}
    >
      {isFlipped ? <Text>{value}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    margin: 5,
  },
  flipped: {
    backgroundColor: "lightgreen",
  },
});

export default Card;
