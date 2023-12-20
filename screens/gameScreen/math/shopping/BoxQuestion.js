import React, { useRef, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Toast from "react-native-toast-message";

const BoxQuestion = ({ item, setCount, count, handleButtonClick }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const handlePress = (number) => {
    if (number < item.number1 || number < item.number2) {
      Toast.show({
        type: "success",
        text1: "CÂU TRẢ LỜI CHÍNH XÁC !!!",
      });
      setCount(count + 1);
    } else {
      Toast.show({
        type: "error",
        text1: "CÂU TRẢ LỜI KHÔNG ĐÚNG !!!",
      });
    }
    setDisabled(true);
    setIsVisible(true);
    setIsChecked(true);
    setTimeout(() => {
      handleButtonClick();
    }, 2000);
  };
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
      <Text style={styles.question}>Biểu thức nào có giá trị bé hơn</Text>
      <TouchableOpacity
        style={isChecked ? styles.disabledButton : styles.button}
        onPress={() => handlePress(item?.number1)}
        disabled={isChecked ? true : false}
        title={(item?.number1).toString()}
      >
        <Text>{(item?.number1).toString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={isChecked ? styles.disabledButton : styles.button}
        disabled={isChecked ? true : false}
        onPress={() => handlePress(item?.number2)}
        title={(item?.number2).toString()}
      >
        <Text>{(item?.number2).toString()}</Text>
      </TouchableOpacity>
      {isVisible && isChecked && (
        <Animated.View
          style={[styles.notification, { transform: [{ translateY }] }]}
        >
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Câu trả lời chính xác
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default BoxQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    padding: 5,
  },
  questionBox: { padding: 12 },
  box: {
    position: "relative",
    padding: 12,
    backgroundColor: "#E5E4E2",
    borderRadius: 10,
    width: "100%",
    height: "80%",
    overflow: "hidden",
  },
  question: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    borderRadius: 12,
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: "#9da09e",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#d3d4d3",
    color: "red",
  },
  notification: {
    position: "absolute",
    backgroundColor: "green",
    alignItems: "center",
    bottom: -80,
    margin: 12,
    width: "100%",
    padding: 12,
    borderRadius: 10,
  },

  innerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.60)",
    paddingTop: 20,
  },
});
