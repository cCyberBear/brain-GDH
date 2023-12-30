import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";

const CalculateScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <View style={styles.row}>
          <Text style={styles.text}>
            <Icon name="trophy" size={14} color="black" /> Điểm số
          </Text>
          <Text style={styles.text}>
            <Icon name="clock-o" size={14} color="black" /> Cấp độ
          </Text>
        </View>
        <CountdownCircleTimer
          size={80}
          isPlaying={true}
          // isPlaying={false}
          duration={8}
          colors={"grey"}
          key={1}
        >
          {({ remainingTime }) => (
            <Text style={{ color: "black" }}>{remainingTime}</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.questionBox}>
        <View style={styles.box}>
          <Carousel
            // ref={carouselRef}
            // data={questionList}
            // sliderHeight={10}
            // itemHeight={10}
            layout={"default"}
            useScrollView={true}
            // renderItem={renderCard}
            sliderWidth={335}
            itemWidth={335}
            scrollEnabled={false}
            // onSnapToItem={(index) => setCurrentIndex(index)}
            enableSnap={true}
            loop={false}
          />
        </View>
      </View>
      <View style={styles.rowButton}>
        <TouchableOpacity
          style={[styles.selectButton, styles.rightButton]}
          title={"ádasdas"}
        >
          <Icon name="check" size={24} color={"green"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectButton, styles.wrongButton]}
          title={"ád"}
        >
          <Icon name="remove" size={24} color={"red"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CalculateScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 16,
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
    color: "black",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  selectButton: {
    alignItems: "center",
    borderWidth: 5,
    width: 60,
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    margin: 12,
  },
  rightButton: {
    borderColor: "green",
  },
  wrongButton: {
    borderColor: "red",
  },

  //questions
  questionBox: { padding: 12, height: "50%" },
  box: {
    position: "relative",
    padding: 12,
    backgroundColor: "#E5E4E2",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  question: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
