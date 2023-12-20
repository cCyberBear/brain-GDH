import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BoxQuestion from "./BoxQuestion";
import Carousel from "react-native-snap-carousel";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const ShoppingScreen = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    const nextIndex = (currentIndex + 1) % questionList.length;
    setCurrentIndex(nextIndex);
    carouselRef.current.snapToItem(nextIndex);
  };

  const generateRandomNumbers = (id) => {
    const newRandomNumber1 = Math.floor(Math.random() * 100) + 1;
    let newRandomNumber2;
    do {
      newRandomNumber2 = Math.floor(Math.random() * 100) + 1;
    } while (newRandomNumber2 === newRandomNumber1);

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
            <CountdownCircleTimer
              onComplete={() => setModalVisible(true)}
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
                scrollEnabled={false}
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
                Bạn đã hoàn thành{" "}
                <Text style={{ fontWeight: "bold", color: "green" }}>
                  {count}
                </Text>{" "}
                câu trong 60 giây !!!
              </Text>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <Pressable
                  style={[styles.button, styles.buttonHome]}
                  onPress={() => navigation.navigate("BottomTabs")}
                >
                  <Text style={styles.textStyle}>Trang chủ</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.navigate("Shopping")}
                >
                  <Text style={styles.textStyle}>Làm lại</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
