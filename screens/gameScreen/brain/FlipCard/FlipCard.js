import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

const FlipCard = () => {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    // Generate cards based on the level
    const levelCards = generateLevelCards(level);

    setCards(levelCards);
    setSelectedCards([]);
    setMoves(0);
  };

  const generateLevelCards = (currentLevel) => {
    const imagesPerLevel = currentLevel + 2; // Adjust the number of images based on the level
    const availableImages = Array.from(
      { length: imagesPerLevel },
      (_, index) => index + 1
    );
    console.log(availableImages);
    // Duplicate each image to create pairs
    const allImages = [...availableImages, ...availableImages];

    // Shuffle the images
    const shuffledImages = shuffleArray(allImages);

    // Create cards with shuffled images
    const levelCards = shuffledImages.map((image, index) => ({
      id: index + 1,
      image: `https://picsum.photos/8${image}`,
      flipped: false,
      matched: false,
    }));

    return levelCards;
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const flipCard = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, flipped: !card.flipped } : card
      )
    );
  };

  const checkForMatch = () => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;

      if (firstCard.image === secondCard.image) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: true, matched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card
          )
        );
        setSelectedCards([]);
        setMoves((prevMoves) => prevMoves + 1);
      }, 1000);
    }
  };

  const handleCardPress = (card) => {
    if (!card.flipped && selectedCards.length < 2) {
      flipCard(card.id);
      setSelectedCards((prevSelected) => [...prevSelected, card]);
    }
  };

  const handleLevelComplete = () => {
    // Increase the level and reset the game
    setLevel((prevLevel) => prevLevel + 1);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <TouchableOpacity
        key={card.id}
        onPress={() => handleCardPress(card)}
        style={styles.cardContainer}
      >
        {card.flipped || card.matched ? (
          <Image source={{ uri: card.image }} style={styles.cardImage} />
        ) : (
          <Animated.View
            style={[styles.cardBack, { transform: [{ rotateY: "180deg" }] }]}
          />
        )}
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    checkForMatch();
  }, [selectedCards]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card Flipping Game - Level {level}</Text>
      <Text style={styles.moves}>Moves: {moves}</Text>
      <View style={styles.cardGrid}>{renderCards()}</View>
      {cards.every((card) => card.matched) && (
        <TouchableOpacity
          onPress={handleLevelComplete}
          style={styles.nextLevelButton}
        >
          <Text style={styles.nextLevelButtonText}>Next Level</Text>
        </TouchableOpacity>
      )}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  moves: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    width: 80,
    height: 80,
    margin: 5,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardBack: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  nextLevelButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  nextLevelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FlipCard;
