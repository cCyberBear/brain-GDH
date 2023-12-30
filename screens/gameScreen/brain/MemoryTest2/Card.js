// components/Card.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Card = ({ color, onPress, flipped }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.card, { backgroundColor: flipped ? color : "gray" }]}
      >
        {flipped && <Text style={styles.cardText}>{color}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
