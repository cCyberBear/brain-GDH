import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const BoxQuestion = ({ item, setScore, setIsPlaying }) => {
  const level = 100;
  const [array, setArray] = useState([item]);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [unableClick, setUnableClick] = useState(false);
  const transformedArray = array.flatMap((obj) => {
    return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
  });
  const handlePress = (choice) => {
    const isChecked = selectedChoices.includes(choice);
    if (isChecked) {
      setSelectedChoices(selectedChoices.filter((c) => c !== choice));
    } else {
      if (selectedChoices.length < 2) {
        setSelectedChoices([...selectedChoices, choice]);
        if (selectedChoices.length == 1) {
          const result = selectedChoices[0] + choice;
          if (result && result === level) {
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

  const shuffleArray = () => {
    const shuffledItems = [...transformedArray];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [
        shuffledItems[j],
        shuffledItems[i],
      ];
    }
    setArray(shuffledItems);
  };

  const filteredArray = array.filter((value) => !("id" in value));

  useEffect(() => {
    shuffleArray();
  }, []);

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
      <Text style={styles.question}>Hai số nào có tổng bằng 100</Text>
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
