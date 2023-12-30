import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const BoxQuestion = ({ item, setScore, setIsPlaying, level, currentIndex }) => {
  const [array, setArray] = useState([item]);
  const [tempArray, setTempArray] = useState([item]);
  let rightAnswer;
  switch (level) {
    case 2:
      rightAnswer = 100;
      break;
    case 3:
      rightAnswer = 1000;
      break;
    default:
      rightAnswer = 10;
      break;
  }
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [unableClick, setUnableClick] = useState(false);
  const handlePress = (choice) => {
    const isChecked = selectedChoices.includes(choice);
    if (isChecked) {
      setSelectedChoices(selectedChoices.filter((c) => c !== choice));
    } else {
      if (selectedChoices.length < 2) {
        setSelectedChoices([...selectedChoices, choice]);
        if (selectedChoices.length == 1) {
          const result = selectedChoices[0] + choice;
          if (result && result === rightAnswer) {
            setScore((preScore) => preScore + 300);
            Toast.show({
              type: "success",
              text1: "CÂU TRẢ LỜI CHÍNH XÁC !!!",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "CÂU TRẢ LỜI CHƯA CHÍNH XÁC !!!",
            });
          }
          setUnableClick(true);
        }
      }
    }
  };
  const transformedArray = array.flatMap((obj) => {
    return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
  });
  const shuffleArray = () => {
    let shuffledItems = [...transformedArray];
    let temp;
    if (currentIndex >= 0 && currentIndex < 8) {
      temp = shuffledItems.slice(0, 5);
    } else if (currentIndex >= 8 && currentIndex < 13) {
      temp = shuffledItems.slice(0, 6);
    } else {
      temp = shuffledItems.slice(0, 7);
    }

    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    setTempArray(temp);
  };
  const filteredArray = tempArray?.filter((value) => !("id" in value));

  useEffect(() => {
    shuffleArray();
  }, [currentIndex]);

  return (
    <>
      <Text
        style={{
          color: "#333",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Câu hỏi {item.id}
      </Text>
      <Text style={styles.question}>Hai số nào có tổng bằng {rightAnswer}</Text>
      {filteredArray.map((item, index) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return (
          <TouchableOpacity
            style={styles.button}
            disabled={unableClick}
            onPress={() => handlePress(value)}
            title={item?.number4}
          >
            <Text key={index}>{value}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.selectedText}>
        Bạn đã chọn: {selectedChoices.join(", ") || " "}
      </Text>
    </>
  );
};

export default BoxQuestion;
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    borderRadius: 12,
  },
});
