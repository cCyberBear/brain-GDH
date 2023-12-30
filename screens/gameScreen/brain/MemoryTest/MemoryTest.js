import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Toast from "react-native-toast-message";

const Card = ({ id, isFlipped, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)}>
    <View style={[styles.cardContainer, isFlipped && styles.flippedCard]}>
      <Animated.Text style={[styles.cardText, isFlipped && styles.flippedText]}>
        {isFlipped ? "" : ""}
      </Animated.Text>
    </View>
  </TouchableOpacity>
);

const levelMap = {
  1: {
    card: 4,
    revealCard: 2,
    revealTime: 2000,
  },
  2: {
    card: 8,
    revealCard: 3,
    revealTime: 2000,
  },
  3: {
    card: 8,
    revealCard: 4,
    revealTime: 2500,
  },
  4: {
    card: 12,
    revealCard: 5,
    revealTime: 2500,
  },
  5: {
    card: 12,
    revealCard: 6,
    revealTime: 3000,
  },
  6: {
    card: 16,
    revealCard: 7,
    revealTime: 3000,
  },
  7: {
    card: 20,
    revealCard: 8,
    revealTime: 3500,
  },
  8: {
    card: 24,
    revealCard: 9,
    revealTime: 3500,
  },
  9: {
    card: 28,
    revealCard: 10,
    revealTime: 4000,
  },
  10: {
    card: 32,
    revealCard: 12,
    revealTime: 4000,
  },
  11: {
    card: 32,
    revealCard: 12,
    revealTime: 4000,
  },
  12: {
    card: 32,
    revealCard: 13,
    revealTime: 4000,
  },
  13: {
    card: 32,
    revealCard: 14,
    revealTime: 4000,
  },
  14: {
    card: 32,
    revealCard: 15,
    revealTime: 4000,
  },
  15: {
    card: 36,
    revealCard: 16,
    revealTime: 4000,
  },
  16: {
    card: 36,
    revealCard: 17,
    revealTime: 4000,
  },
  17: {
    card: 36,
    revealCard: 18,
    revealTime: 4000,
  },
  18: {
    card: 40,
    revealCard: 19,
    revealTime: 4000,
  },
  19: {
    card: 40,
    revealCard: 20,
    revealTime: 4000,
  },
  20: {
    card: 40,
    revealCard: 25,
    revealTime: 4000,
  },
};

const GameBoard = () => {
  const renderCard = (n) => {
    return Array.from({ length: n }, (_, index) => ({
      id: index + 1,
      isFlipped: false,
    }));
  };
  const flipInitialCards = (level) => {
    const randomIndices = [];
    while (randomIndices.length < levelMap[level].revealCard) {
      const randomIndex = Math.floor(Math.random() * levelMap[level].card);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const initialCards = Array.from(
      { length: levelMap[level].card },
      (_, index) => ({
        id: index + 1,
        isFlipped: false,
      })
    ).map((card, index) => ({
      ...card,
      isFlipped: randomIndices.includes(index),
    }));
    setCards(initialCards);
    setRevealedCards(initialCards);

    setTimeout(() => {
      setCards(
        Array.from({ length: levelMap[level].card }, (_, index) => ({
          id: index + 1,
          isFlipped: false,
        }))
      );
    }, levelMap[level].revealTime);
  };
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(renderCard(levelMap[1].card));
  const [curLevel, setCurLevel] = useState(1);
  const [flippedCards, setFlippedCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);

  useEffect(() => {
    // Set the initial state without revealing cards
    setCards(renderCard(levelMap[curLevel].card));

    // Use a timeout to reveal the cards after a short delay
    setTimeout(() => {
      flipInitialCards(curLevel);
    }, 1000); // Adjust the delay time as needed
  }, [curLevel]);

  const handleCardPress = (cardId) => {
    const selectedCard = cards.find((card) => card.id === cardId);
    if (selectedCard.isFlipped || revealedCards.includes(selectedCard)) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    setFlippedCards([...flippedCards, selectedCard]);

    if (flippedCards.length === levelMap[curLevel].revealCard - 1) {
      const sortedUpdatedCards = updatedCards
        .slice()
        .sort((a, b) => a.id - b.id);
      const sortedRevealedCards = revealedCards
        .slice()
        .sort((a, b) => a.id - b.id);

      const isCorrect =
        JSON.stringify(sortedUpdatedCards) ===
        JSON.stringify(sortedRevealedCards);
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
        flipInitialCards(curLevel);
        Toast.show({
          type: "error",
          text1: "Incorrect!",
          text2: "Try again.",
        });
      }

      // Clear the flippedCards array
      setFlippedCards([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.gameBoard}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            isFlipped={card.isFlipped}
            onPress={handleCardPress}
          />
        ))}
      </View>
    </View>
  );
};

const MemoryTest = () => {
  return (
    <View style={styles.container}>
      <GameBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  scoreContainer: {
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  gameBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    width: 70,
    height: 70,
    margin: 8,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2980b9",
    elevation: 3,
  },
  flippedCard: {
    backgroundColor: "#2ecc71",
  },
  cardText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    opacity: 0, // Initially invisible
  },
  flippedText: {
    opacity: 1, // Visible when flipped
  },
});

export default MemoryTest;
