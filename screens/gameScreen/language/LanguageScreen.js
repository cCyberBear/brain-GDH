import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import search from "../../../assets/searchImage.png";
import confused from "../../../assets/confusedImage.jpeg";
import question from "../../../assets/questionImage.png";
import Card from "../../../components/shared/Card";

const data = [
  {
    id: 1,
    title: "Tìm Từ Trong Ma Trận Chữ",
    quanity:
      "Bạn hãy tìm và đánh dấu các từ trong ma trận chữ theo hàng dọc và hàng ngang.",
    image: search,
    link: "WordMap",
  },
  {
    id: 2,
    title: "Đoán Chữ Theo Chữ Cái Đầu Tiên",
    quanity:
      "Bạn hãy đoán các từ có nghĩa dựa trên chữ cái đầu tiên được cung cấp.    ",
    image: question,
    link: "WordPredict",
  },
  {
    id: 3,
    title: "Xếp Chữ Tạo Nghĩa",
    quanity: "Bạn hãy sắp xếp thành từ có nghĩa.",
    image: confused,
    link: "WordArrangement",
  },
];

const LanguageScreen = ({ navigation }) => {
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

export default LanguageScreen;

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
