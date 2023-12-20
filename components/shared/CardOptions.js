import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import LevelOptionsModal from "../../screens/gameScreen/math/findSum/LevelOptionsModal";

const CardOptions = ({ item, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigatePage = (value) => {
    if (value.link == "FindSum") {
      setModalVisible(true);
    } else {
      navigation.navigate(value.link);
    }
  };
  return (
    <TouchableOpacity onPress={() => navigatePage(item)}>
      <View style={styles.cardContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.mainText}>{item.title}</Text>
          </View>
          <View>
            <Text style={styles.subText}>{item.quanity} Trò Chơi</Text>
          </View>
        </View>
      </View>
      {modalVisible && (
        <LevelOptionsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  image: {
    width: "100%",
    height: 290,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
});

export default CardOptions;
