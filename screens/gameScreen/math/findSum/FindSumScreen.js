import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";

const FindSumScreen = ({ navigation }) => {
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
                <Icon name="trophy" size={14} color="#fff" /> Điểm số 01
              </Text>
              <Text style={styles.text}>
                <Icon name="clock-o" size={14} color="#fff" /> Cấp độ 1
              </Text>
            </View>
            <CountdownCircleTimer
              // onComplete={() => setModalVisible(true)}
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
              {/* <Carousel
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
              /> */}
            </View>
          </View>
        </View>
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
});
