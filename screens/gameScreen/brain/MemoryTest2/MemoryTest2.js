import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "teal",
  "lime",
  "indigo",
  "violet",
  "maroon",
];
const levels = {
  1: {
    color: 3,
    timeReveal: 5,
  },
  2: {
    color: 3,
    timeReveal: 3,
  },
  3: {
    color: 6,
    timeReveal: 5,
  },
  4: {
    color: 6,
    timeReveal: 3,
  },
  5: {
    color: 9,
    timeReveal: 5,
  },
  6: {
    color: 9,
    timeReveal: 5,
  },
  7: {
    color: 12,
    timeReveal: 5,
  },
  8: {
    color: 12,
    timeReveal: 4,
  },
  9: {
    color: 15,
    timeReveal: 5,
  },
  10: {
    color: 15,
    timeReveal: 4,
  },
};

const MemoryTest2 = () => {
  const [cards, setCards] = useState(
    colors.map((color, index) => ({ color, number: null }))
  );
  const [roundCard, setRoundCard] = useState([]);
  const [pressOrder, setPressOrder] = useState(1);
  const [score, setScore] = useState(0);
  const [curLevel, setCurLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(levels[1].timeReveal);

  const initialize = (level) => {
    const random = colors
      .sort(() => Math.random() - 0.5)
      .slice(-levels[level].color);
    setCards(random.map((color, index) => ({ color, number: null })));
    setRoundCard(random.map((color, index) => ({ color, number: index + 1 })));

    const revealTimer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(revealTimer);
      setCards(
        random
          .map((color, index) => ({ color, number: null }))
          .sort(() => Math.random() - 0.5)
      );
      setPressOrder(1);
      setTimeRemaining(levels[level].timeReveal);
    }, levels[level].timeReveal * 1000);
  };
  useEffect(() => {
    setTimeRemaining(levels[curLevel].timeReveal);
    initialize(curLevel);
  }, [curLevel]);

  const handleCardPress = (selectedColor) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.color === selectedColor && card.number === null
          ? { ...card, number: pressOrder }
          : card
      )
    );
    setPressOrder((prevOrder) => prevOrder + 1);
    if (
      cards.filter((num) => num.number !== null).length + 1 ===
      roundCard.length
    ) {
      const userPicked = cards
        .map((item) => ({
          ...item,
          number: item.number !== null ? item.number : pressOrder,
        }))
        .slice()
        .sort((a, b) => a.number - b.number);

      const round = roundCard.slice().sort((a, b) => a.number - b.number);

      const isCorrect = JSON.stringify(userPicked) === JSON.stringify(round);

      if (isCorrect) {
        setScore(score + 100 * curLevel);
        setCurLevel(curLevel + 1);
        Toast.show({
          type: "success",
          text1: "Level Up!",
          text2: `You have advanced to Level ${curLevel + 1}`,
        });
      } else {
        // If not, reset the game with the current level
        initialize(curLevel);
        Toast.show({
          type: "error",
          text1: "Incorrect!",
          text2: "Try again.",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{`Score: ${score}`}</Text>
      <Text style={styles.timer}>{`Time: ${timeRemaining}s`}</Text>
      <View style={styles.cardContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: card.color }]}
            onPress={() => handleCardPress(card.color)}
          >
            <Text style={styles.text}>{card.number}</Text>
          </TouchableOpacity>
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
    backgroundColor: "#f0f0f0", // Light background color
  },
  score: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold", // Make the font bold
    color: "#333", // Darker text color
  },
  timer: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", // Allow cards to wrap to the next line
    margin: 10, // Add some margin
  },
  card: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add elevation for a subtle shadow effect
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MemoryTest2;
