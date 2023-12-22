import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const WordPredict = () => {
  const [text, setText] = useState("");
  const [initLet, setInitLet] = useState("");
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "Đ",
    "E",
    "Ê",
    "G",
    "H",
    "I",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ô",
    "Ơ",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "Ư",
    "V",
    "X",
    "Y",
  ];

  const handleChangeText = (text) => {
    setText(text);
  };

  const remainingCharacters = 6 - text.length;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    setInitLet(letters[randomIndex]);
  }, []);

  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.prompt}>
          Nhập từ thích hợp bắt đầu bằng chữ {initLet}______:
        </Text>
        <View style={styles.textBox}>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChangeText}
            placeholder="Nhập từ ở đây"
            maxLength={6}
          />
          <Text style={styles.remainingCharacters}>
            {remainingCharacters} / 6
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#eab676",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    width: "80%",
    height: "90%",
    borderRadius: 10,
  },
  textBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eab676",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    marginTop: 100,
  },
  textInput: {
    fontSize: 16,
  },
  remainingCharacters: {
    fontSize: 12,
    color: "#aaa",
  },
  prompt: {
    textAlign: "center",
    fontSize: 22,
    color: "#333",
    lineHeight: "50%",
  },
});

export default WordPredict;
