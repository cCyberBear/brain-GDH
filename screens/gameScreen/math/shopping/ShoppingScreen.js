import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
  Button,
} from "react-native";
import * as Progress from "react-native-progress";
import CountDown from "react-native-countdown-component";
import Icon from "react-native-vector-icons/FontAwesome";
import BoxQuestion from "./BoxQuestion";
import Carousel from "react-native-snap-carousel";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const ShoppingScreen = () => {
  const carouselRef = useRef(null);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    const nextIndex = (currentIndex + 1) % questionList.length;
    setCurrentIndex(nextIndex);
    carouselRef.current.snapToItem(nextIndex);
  };

  const generateRandomNumbers = (id) => {
    const newRandomNumber1 = Math.floor(Math.random() * 100) + 1;
    const newRandomNumber2 = Math.floor(Math.random() * 100) + 1;
    setRandomNumbers([newRandomNumber1, newRandomNumber2]);
    const newQuestion = {
      number1: newRandomNumber1,
      number2: newRandomNumber2,
      id: id + 1,
    };
    setQuestionList((prevQuestionList) => [...prevQuestionList, newQuestion]);
  };
  const generate20Questions = () => {
    for (let i = 0; i < 20; i++) {
      generateRandomNumbers(i);
    }
  };

  const renderCard = ({ item }) => {
    return (
      <BoxQuestion
        item={item}
        key={item.id}
        randomNumbers={randomNumbers}
        setCount={setCount}
        count={count}
        handleButtonClick={handleButtonClick}
      />
    );
  };

  useEffect(() => {
    generate20Questions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/bgImage.png")}
        style={styles.image}
      >
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <Text style={styles.text}>
              <Icon name="trophy" size={14} color="#fff" /> Điểm số {count}
            </Text>
            <Text style={styles.text}>
              <Icon name="clock-o" size={14} color="#fff" /> Thời gian còn lại
            </Text>
            {/* <CountDown
              digitStyle={{
                backgroundColor: "#FFF",
                borderWidth: 2,
                borderRadius: 50,
                height: 50,
                width: 50,
                borderColor: "#1CC625",
                margin: 8,
              }}
              running="true"
              timeToShow={["S"]}
              until={10}
              onFinish={onFinish}
              size={20}
              timeLabels=""
            /> */}
            <CountdownCircleTimer
              size={80}
              isPlaying
              duration={60}
              colors={"grey"}
            >
              {({ remainingTime }) => (
                <Text style={{ color: "white" }}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
          {/* <Progress.Bar progress={1} width={300} /> */}

          <View style={styles.questionBox}>
            <View style={styles.box}>
              <Carousel
                ref={carouselRef}
                data={questionList}
                layout={"default"}
                useScrollView={true}
                renderItem={renderCard}
                sliderWidth={300}
                itemWidth={300}
                scrollEnabled={false}
                autoplay
                autoplayInterval={10000}
                onSnapToItem={(index) => setCurrentIndex(index)}
                enableSnap={true}
                loop={false}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ShoppingScreen;

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
    borderWidth: 5,
    borderColor: "#D3D3D3",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
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
