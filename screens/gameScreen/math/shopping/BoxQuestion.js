import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const BoxQuestion = ({
  randomNumbers,
  item,
  setCount,
  count,
  handleButtonClick,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const handlePress = (number) => {
    if (number < item.number1 || number < item.number2) {
      alert("good");
      setCount(count + 1);
    } else {
      alert("stupid");
    }
    setDisabled(true);
    setIsVisible(true);
    setIsChecked(true);
    setTimeout(() => {
      handleButtonClick();
    }, 5000);
  };
  //   useEffect(() => {
  //     const totalTimeInSeconds = 10;
  //     const interval = 100;
  //     const steps = (totalTimeInSeconds * 1000) / interval;
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) => Math.max(prevProgress - 1 / steps, 0));
  //     }, interval);
  //     const timeout = setTimeout(() => {
  //       clearInterval(timer);
  //       setProgress(1);
  //     }, totalTimeInSeconds * 1000);
  //     return () => {
  //       clearInterval(timer);
  //       clearTimeout(timeout);
  //     };
  //   }, []);
  return (
    <>
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Câu hỏi {item.id}
      </Text>
      <Text style={styles.question}>Biểu thức nào có giá trị bé hơn</Text>
      <TouchableOpacity
        style={isChecked ? styles.disabledButton : styles.buttonText}
        onPress={() => handlePress(item?.number1)}
        disabled={isChecked ? true : false}
        title={(item?.number1).toString()}
      >
        <Text>{(item?.number1).toString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={isChecked ? styles.disabledButton : styles.buttonText}
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
  buttonText: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    borderRadius: 12,
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "grey",
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
