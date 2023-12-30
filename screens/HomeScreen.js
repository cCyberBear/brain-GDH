import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import Card from "../components/shared/Card";
import { LinearGradient } from "expo-linear-gradient";
import brain1 from "../assets/brain1.png";
import brain2 from "../assets/brain2.png";
import brain3 from "../assets/brain3.png";
import brain4 from "../assets/brain4.png";

const data = [
  {
    id: 1,
    title: "Trò chơi tập trung",
    quanity: "Có 2 trò chơi",
    image: brain1,
    link: "Focus",
  },
  {
    id: 2,
    title: "Trò chơi trí nhớ",
    quanity: "Có 2 trò chơi",
    image: brain2,
    link: "Brain",
  },
  {
    id: 3,
    title: "Trò chơi ngôn ngữ",
    quanity: "Có 3 trò chơi",
    image: brain3,
    link: "Language",
  },
  {
    id: 4,
    title: "Trò chơi tính toán",
    quanity: "Có 2 trò chơi",
    image: brain4,
    link: "Math",
  },
];

const HomeScreen = ({ navigation }) => {
  const renderCard = ({ item }) => {
    return <Card item={item} navigation={navigation} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#ffffff", "#ffd363"]} style={styles.gradient}>
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

export default HomeScreen;

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
