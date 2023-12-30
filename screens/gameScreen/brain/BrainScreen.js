import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import flipCard from "../../../assets/flipCard.jpeg";
import angryImage from "../../../assets/angryImage.jpeg";
import Card from "../../../components/shared/Card";

const data = [
  {
    id: 1,
    title: "Tìm Cặp Thẻ",
    quanity: "Bạn hãy tìm và kết hợp các cặp thẻ giống nhau được úp xuống.",
    image: flipCard,
    link: "FlipCard",
  },

  {
    id: 2,
    title: "Đánh Số Vị Trí Màu Sắc",
    quanity:
      "Bạn hãy đánh số vị trí ban đầu của các thẻ màu sau khi chúng bị xáo trộn.",
    image: angryImage,
    link: "MemoryTest2",
  },
];

const BrainScreen = ({ navigation }) => {
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

export default BrainScreen;

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
