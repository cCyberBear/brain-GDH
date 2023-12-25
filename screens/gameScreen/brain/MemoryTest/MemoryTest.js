import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const Card = ({ id, isFlipped, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)}>
    <View style={[styles.card, isFlipped && styles.flippedCard]}>
      {isFlipped && <Text>{id}</Text>}
    </View>
  </TouchableOpacity>
);

const GameBoard = () => {
  const [cards, setCards] = useState(
    Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      isFlipped: false,
    }))
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [revealedCards, setRevealedCards] = useState(0);

  useEffect(() => {
    const flipInitialCards = () => {
      const randomIndices = [];
      while (randomIndices.length < 2) {
        const randomIndex = Math.floor(Math.random() * 6);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const initialCards = cards.map((card, index) => ({
        ...card,
        isFlipped: randomIndices.includes(index),
      }));
      setCards(initialCards);

      setTimeout(() => {
        setCards(
          Array.from({ length: 6 }, (_, index) => ({
            id: index + 1,
            isFlipped: false,
          }))
        );
      }, 1000);
    };

    flipInitialCards();
  }, []);

  const handleCardPress = (cardId) => {
    if (flippedCards.length === 2) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      const [firstCardId] = flippedCards;
      const isMatch = cardId === firstCardId;

      setTimeout(() => {
        const updatedCardsAfterMatch = cards.map((card) =>
          card.id === cardId || card.id === firstCardId
            ? { ...card, isFlipped: isMatch }
            : card
        );

        setCards(updatedCardsAfterMatch);

        if (isMatch) {
          setMatchedPairs(matchedPairs + 1);
          setRevealedCards(revealedCards + 2);

          // Kiểm tra nếu đã tiết lộ hết tất cả thẻ
          if (revealedCards + 2 === cards.length) {
            // Chuyển qua màn mới hoặc thực hiện các hành động khác tại đây
            alert("Chuyển qua màn mới!");
            // Thực hiện các hành động cần thiết để chuyển qua màn mới
          }
        } else {
          setCards(
            Array.from({ length: 6 }, (_, index) => ({
              id: index + 1,
              isFlipped: false,
            }))
          );
        }
        Toast.show({
          text1: "ok",
        });
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
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
  },
  gameBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: 80,
    height: 120,
    margin: 5,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  flippedCard: {
    backgroundColor: "lightgreen",
  },
});

export default MemoryTest;
