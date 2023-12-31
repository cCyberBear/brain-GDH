import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

const WordPredict = () => {
  const [dictionary, setDictionary] = useState("");
  const [score, setScore] = useState(0);

  const [text, setText] = useState("");
  const [initLet, setInitLet] = useState("");
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const handleChangeText = (text) => {
    const lowercaseWord = text.toLowerCase();
    setText(lowercaseWord);
  };

  const remainingCharacters = 15 - text.length;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    setInitLet(letters[randomIndex]);

    const loadDictionary = async () => {
      try {
        const { data } = await axios.get("https://vnkd.dev/words.json");
        setDictionary(data);
      } catch (error) {}
    };

    loadDictionary();
  }, []);

  const onPressSend = () => {
    const lowercaseWord = text.toLowerCase();
    if (dictionary.includes(initLet.toLowerCase() + lowercaseWord)) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      setInitLet(letters[randomIndex]);
      setScore(score + 1);
      setText("");
      Toast.show({
        text1: "You right",
        type: "success",
        position: "top",
        topOffset: 100,
      });
    } else {
      Toast.show({
        text1: "You wrong, try again!",
        type: "error",
        topOffset: 100,
        position: "top",
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/bgImage.png")}
      style={styles.image}
    >
      <Text style={styles.prompt}>
        <Icon name="trophy" size={18} color="#fff" /> Điểm: {score * 100}
      </Text>
      <View style={styles.container}>
        <Text style={styles.question}>
          Enter the appropriate word starting with letter {initLet}______:
        </Text>
        <View style={styles.bottom}>
          <View style={styles.textBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChangeText}
              placeholder="Nhập từ ở đây"
              maxLength={15}
              value={text}
            />
            <Text style={styles.remainingCharacters}>
              {remainingCharacters} / 15
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressSend}
          >
            <Icon name="send" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    margin: 30,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  textBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eab676",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  bottom: {
    marginTop: 100,
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    color: "#fff",
    lineHeight: 50,
    fontWeight: "bold",
    marginTop: 14,
  },
  question: {
    textAlign: "center",
    fontSize: 22,
    color: "#333",
    lineHeight: 50,
  },
  buttonContainer: {
    backgroundColor: "#eab676",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eab676",
    marginBottom: 10,
  },
});

export default WordPredict;
