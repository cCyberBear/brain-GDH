import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

const LevelOptionsModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  const levels = [
    { level: 1, id: 1 },
    { level: 2, id: 2 },
    { level: 3, id: 3 },
  ];
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>x</Text>
          </Pressable>
          <Text style={styles.modalText}>Chọn mức độ</Text>
          <View style={{ flexDirection: "column", gap: 14 }}>
            {levels.map((value, index) => (
              <Pressable
                key={index}
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  navigation.navigate("FindSum", {
                    level: value.level,
                  });
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cấp độ {value.level}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LevelOptionsModal;
const styles = StyleSheet.create({
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
