import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Modal,
  Image,
  Pressable,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";
import BoxQuestion from "./BoxQuestion";

const FindSumScreen = ({ route, navigation }) => {
  const { level } = route.params;
  const carouselRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  const generateRandomNumbers = (id) => {
    let sumQuestion;
    switch (level) {
      case 2:
        sumQuestion = 99;
        break;
      case 3:
        sumQuestion = 999;
        break;
      default:
        sumQuestion = 9;
        break;
    }
    // change level
    const newRandomNumber1 = Math.floor(Math.random() * sumQuestion) + 1;
    const newRandomNumber2 = sumQuestion + 1 - newRandomNumber1;
    const newRandomNumber3 = Math.floor(Math.random() * sumQuestion) + 1;
    const newRandomNumber4 = Math.floor(Math.random() * sumQuestion) + 1;
    const newRandomNumber5 = Math.floor(Math.random() * sumQuestion) + 1;
    const newRandomNumber6 = Math.floor(Math.random() * sumQuestion) + 1;

    const newQuestion = {
      id: id,
      number1: newRandomNumber1,
      number2: newRandomNumber2,
      number3: newRandomNumber3,
      number4: newRandomNumber4,
      number5: newRandomNumber5,
      number6: newRandomNumber6,
    };
    setQuestionList((prevQuestionList) => {
      return [...prevQuestionList, newQuestion];
    });
  };

  const generate15Questions = () => {
    for (let i = 1; i <= 15; i++) {
      generateRandomNumbers(i);
    }
  };

  const renderCard = ({ item }) => {
    return (
      <BoxQuestion
        item={item}
        key={item.id}
        setScore={setScore}
        setIsPlaying={setIsPlaying}
        level={level}
        currentIndex={currentIndex}
      />
    );
  };

  const onFinish = () => {
    setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
      const nextIndex = (currentIndex + 1) % questionList.length;
      setCurrentIndex(nextIndex);
      carouselRef.current.snapToItem(nextIndex);
      setCount((value) => value + 1);
    }, 2000);
    if (count == 2) {
      setIsPlaying(false);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    generate15Questions();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/bgImage.png")}
        style={styles.image}
      >
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <View style={styles.row}>
              <Text style={styles.text}>
                <Icon name="trophy" size={14} color="#fff" /> Điểm số {score}
              </Text>
              <Text style={styles.text}>
                <Icon name="clock-o" size={14} color="#fff" /> Cấp độ {level}
              </Text>
            </View>
            <CountdownCircleTimer
              onComplete={onFinish}
              size={80}
              isPlaying={isPlaying}
              duration={8}
              colors={"grey"}
              key={key}
            >
              {({ remainingTime }) => (
                <Text style={{ color: "white" }}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
          <View style={styles.questionBox}>
            <View style={styles.box}>
              <Carousel
                ref={carouselRef}
                data={questionList}
                layout={"default"}
                useScrollView={true}
                renderItem={renderCard}
                sliderWidth={335}
                itemWidth={335}
                scrollEnabled={true}
                onSnapToItem={(index) => setCurrentIndex(index)}
                enableSnap={true}
                loop={false}
              />
            </View>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{ width: "50%", height: "50%" }}
                source={require("../../../../assets/brain.png")}
              />
              <Text style={styles.modalText}>
                Số điểm của bạn là{" "}
                <Text style={{ fontWeight: "bold", color: "green" }}>
                  {score}
                </Text>{" "}
              </Text>
              <Text style={styles.modalText}>
                Bạn đúng
                <Text style={{ fontWeight: "bold", color: "green" }}>
                  {score}
                </Text>{" "}
                /15 câu
              </Text>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <Pressable
                  style={[styles.button, styles.buttonHome]}
                  onPress={() => navigation.navigate("BottomTabs")}
                >
                  <Text style={styles.textStyle}>Trang chủ</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FindSumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.60)",
    padding: 16,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
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

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    width: "94%",
    height: "50%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
  },
  buttonHome: {
    color: " grey",
    backgroundColor: "grey",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    marginRight: 50,
    marginLeft: 50,
  },
});
