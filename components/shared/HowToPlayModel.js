import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const HowToPlayModel = ({ visibleHowToPlay, setVisibleHowToPlay }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visibleHowToPlay}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setVisibleHowToPlay(!visibleHowToPlay)}>
            <Text>x</Text>
          </Pressable>
          <Text>How to play ?</Text>
          <View>
            <Text>Bạn phải ...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HowToPlayModel;

const styles = StyleSheet.create({
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
});
