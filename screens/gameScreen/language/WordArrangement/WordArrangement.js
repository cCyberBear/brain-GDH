import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import WordDisplay from "./WordDisplay";
import LetterTile from "./LetterTile";
import Toast from "react-native-toast-message";

const levels = {
  1: [
    "rừng",
    "mưa",
    "nắng",
    "lá",
    "buồn",
    "niềm tin",
    "chờ",
    "thương",
    "mây",
    "yêu",
    "mơ",
    "hoa",
    "hy vọng",
    "đất",
    "sao",
    "vui",
    "mây",
    "chờ",
    "gió",
    "thương",
    "hạnh phúc",
    "yêu",
    "nắng",
    "biển",
    "đất",
    "niềm tin",
    "niềm tin",
    "đất",
    "núi",
    "núi",
    "giấc",
    "đất",
    "niềm tin",
    "hạnh phúc",
    "mơ",
    "mong",
    "lá",
    "buồn",
    "biển",
    "mong",
    "nắng",
    "biển",
    "vui",
    "nắng",
    "nhớ",
    "thương",
    "mong",
    "gió",
    "mưa",
    "sông",
    "mơ",
    "hoa",
    "mong",
    "mơ",
    "lá",
    "nắng",
    "đất",
    "lá",
    "buồn",
    "mây",
    "buồn",
    "rừng",
    "sao",
    "sông",
    "biển",
    "mưa",
    "hy vọng",
    "hoa",
    "mơ",
    "niềm tin",
    "nắng",
    "nắng",
    "niềm tin",
    "núi",
    "biển",
    "vui",
    "rừng",
    "đất",
    "niềm tin",
    "rừng",
    "mây",
    "thương",
    "yêu",
    "gió",
    "rừng",
    "thương",
    "lá",
    "giấc",
    "biển",
    "chờ",
    "lá",
    "buồn",
    "nắng",
    "hạnh phúc",
    "mây",
    "mong",
    "lá",
    "sao",
    "mây",
    "hy vọng",
  ],
  2: [
    "biển đảo",
    "bông hoa",
    "cây trời",
    "đất mặt trời",
    "gió mây",
    "hồ núi",
    "khúc hát",
    "lòng người",
    "mưa trăng",
    "nắng xuân",
    "núi vực",
    "quê hương",
    "sông nước",
    "thuyền biển",
    "tình yêu",
    "trời đất",
    "xanh lá",
    "yêu thương",
    "đẹp đẽ",
    "tốt bụng",
    "hay hoành tráng",
    "sáng sủa",
    "vui vẻ",
    "tâm lành",
    "mạnh mẽ",
    "sức mạnh",
    "khỏe mạnh",
    "lớn lớn",
    "thông minh",
    "trí tuệ",
    "tiến bộ",
    "phát triển",
    "thành công",
    "hạnh phúc",
    "giàu sang",
    "sống hạnh phúc",
    "yêu thương",
    "công danh",
    "vinh quang",
  ],
};
const WordArrangement = () => {
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);
  const [shuffledWord, setShuffledWord] = useState(
    word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  );
  const [selectedLetters, setSelectedLetters] = useState([]);

  const handleTilePress = (index) => {
    const newSelectedLetters = [...selectedLetters, shuffledWord[index]];
    setSelectedLetters(newSelectedLetters);

    if (newSelectedLetters.length === word.length) {
      const selectedWord = newSelectedLetters.join("");
      if (selectedWord === word) {
        if (count <= 3) {
          setCount(count + 1);
          createWordOnLevel(1);
          Toast.show({
            text1: "chúc mừng bạn đã đoán đúng",
            type: "success",
          });
        } else {
          createWordOnLevel(2);
          Toast.show({
            text1: "chúc mừng bạn đã đoán đúng",
            type: "success",
          });
        }
      } else {
        Toast.show({
          text1: "Sai rồi hãy chọn lại nhé",
          type: "error",
        });
        setSelectedLetters([]);
      }
    }
  };
  function generateRandomWord(currentLevel) {
    const words = levels[currentLevel];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  const createWordOnLevel = (level) => {
    const createdWord = generateRandomWord(level);
    console.log(createdWord);
    setWord(createdWord);
    setShuffledWord(
      createdWord
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    );
    setSelectedLetters([]);
  };
  useEffect(() => {
    createWordOnLevel(1);
  }, []);

  return (
    <View style={styles.container}>
      <WordDisplay word={selectedLetters} />
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
    backgroundColor: "#ecf0f1",
  },
  tileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default WordArrangement;
