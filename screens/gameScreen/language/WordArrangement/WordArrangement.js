import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import WordDisplay from "./WordDisplay";
import LetterTile from "./LetterTile";

const WordArrangement = () => {
  const [word, setWord] = useState("REACT");
  const [shuffledWord, setShuffledWord] = useState(
    word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  );
  const [selectedLetters, setSelectedLetters] = useState([]);

  useEffect(() => {
    setShuffledWord(
      word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    );
    setSelectedLetters([]);
  }, [word]);

  const handleTilePress = (index) => {
    const newSelectedLetters = [...selectedLetters, shuffledWord[index]];
    setSelectedLetters(newSelectedLetters);

    if (newSelectedLetters.length === word.length) {
      // Check if the selected letters form the correct word
      const selectedWord = newSelectedLetters.join("");
      if (selectedWord === word) {
        Alert.alert("Congratulations!", "You found the correct word!", [
          { text: "OK", onPress: () => setWord(generateNewWord()) },
        ]);
      } else {
        Alert.alert("Incorrect", "Try again!", [
          { text: "OK", onPress: () => setSelectedLetters([]) },
        ]);
      }
    }
  };

  const generateNewWord = () => {
    // Implement logic to generate a new word for the game
    // For simplicity, return a static word for now
    return "JAVASCRIPT";
  };

  return (
    <View style={styles.container}>
      <WordDisplay word={shuffledWord} />
      <View style={styles.tileContainer}>
        {shuffledWord.split("").map((letter, index) => (
          <LetterTile
            key={index}
            letter={letter}
            onPress={() => handleTilePress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default WordArrangement;
