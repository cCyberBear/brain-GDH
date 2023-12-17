import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const IntroScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.col}>
        <View style={styles.introText}>
          <Text style={styles.tag}>Rèn luyện</Text>
          <Text style={styles.everyday}>Mỗi ngày</Text>
          <Text>
            <Icon name="star" size={14} color="grey" /> Nội dung rèn luyện
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/brain.png")}
          />
        </View>
      </View>
      <View style={styles.feature}>
        <Text style={styles.title}>chức năng</Text>
        <FlatList
          data={[
            { key: "Ghi Nhớ", id: 1, icon: "check-circle" },
            { key: "Tập Trung", id: 2, icon: "circle" },
            { key: "Ngôn Ngữ", id: 3, icon: "circle" },
            { key: "Toán Học", id: 4, icon: "check-circle" },
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.heading}>0{item.id}</Text>
                <Text style={styles.item}>{item.key}</Text>
              </View>
              <Icon
                name={item.icon}
                size={30}
                color={item.icon == "circle" ? "#fff" : "green"}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "col",
  },
  tag: {
    width: 100,
    backgroundColor: "yellow",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 4,
    fontSize: 12,
  },
  everyday: {
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  col: {
    flex: 1,
    flexDirection: "row",
    padding: 25,
    paddingBottom: 50,
  },
  introText: {
    width: "50%",
    height: 200,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  feature: {
    flex: 3,
    backgroundColor: "pink",
    borderTopRightRadius: "20",
    borderTopLeftRadius: "20",
    padding: 20,
  },
  item: {
    fontSize: 16,
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    color: "grey",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },
});
