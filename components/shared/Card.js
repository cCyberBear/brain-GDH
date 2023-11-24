import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: "https://picsum.photos/900/900" }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Trò Chơi Tập Trung</Text>
        <Text style={styles.subText}>4 Trò Chơi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  image: {
    width: "100%",
    height: 290,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Card;
