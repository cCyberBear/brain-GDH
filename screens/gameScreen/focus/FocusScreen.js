import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import math1 from "../../../assets/math1.png";
import colorImage from "../../../assets/colorImage.jpeg";
import Card from "../../../components/shared/Card";

const data = [
  {
    id: 1,
    title: "Tập trung màu sắc",
    quanity: "Bạn hãy nhớ và chọn lại đúng những thẻ đã đổi màu.",
    image: colorImage,
    link: "MemoryTest",
  },
  {
    id: 2,
    title: "Chọn màu khác biệt",
    quanity:
      "Bạn hãy tập trung để chọn thẻ có màu khác sắc độ với các thẻ khác.",
    image: colorImage,
    link: "ColorPicker",
  },
];

const FocusScreen = ({ navigation }) => {
  const renderCard = ({ item }) => {
    return <Card item={item} navigation={navigation} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#F2F2F2", "#ffd363"]} style={styles.gradient}>
        <View style={styles.carouselContainer}>
          <Carousel
            contentContainerCustomStyle={{ alignItems: "center" }}
            data={data}
            renderItem={renderCard}
            sliderWidth={300}
            itemWidth={300}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FocusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  item: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    height: 200,
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
});
