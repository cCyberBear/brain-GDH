// App.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { Card } from "react-native-elements";
import { adjustBrightness } from "../../../../utils/Path";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

const ColorCard = ({ color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={[
          styles.card,
          { backgroundColor: color, borderColor: color },
        ]}
      />
    </TouchableOpacity>
  );
};

const colors = [
  "#FF5733", // Orange
  "#5733FF", // Purple
  "#FF3366", // Pink
  "#FFD700", // Gold
  "#8A2BE2", // Blue Violet
  "#FF6347", // Tomato
  "#008080", // Teal
  "#FF8C00", // Dark Orange
  "#00FF7F", // Spring Green
  "#800080", // Purple
  "#00CED1", // Dark Turquoise
  "#FF4500", // Orange Red
  "#6A5ACD", // Slate Blue
  "#8B4513", // Saddle Brown
  "#00FA9A", // Medium Spring Green
  "#FF1493", // Deep Pink
];

const ColorPicker = () => {
  const [grid, setGrid] = useState(null);
  const [score, setScore] = useState(0);
  const [curLevel, setCurLevel] = useState(1);

  const handleCardPress = (row, col, corR, corC) => {
    if (row === corR && col === corC) {
      setScore(curLevel * 100 + score);
      setCurLevel(curLevel + 1);
      Toast.show({
        type: "success",
        text1: "Bạn đã chọn đúng",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Bạn đã chọn sai",
      });
    }
  };

  const renderGrid = (level = 1) => {
    let gridSize = Math.floor(level / 5) + 3;
    let ajust = 50 - (level / 5) * 5;
    const randomIndex = Math.floor(Math.random() * colors.length);
    if (gridSize > 8) {
      gridSize = 8;
    }
    if (ajust < 5) {
      ajust = 5;
    }
    const differentCardRow = Math.floor(Math.random() * gridSize);
    const differentCardCol = Math.floor(Math.random() * gridSize);
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      const rowItems = [];
      for (let col = 0; col < gridSize; col++) {
        const isDifferentCard =
          row === differentCardRow && col === differentCardCol;
        const color = isDifferentCard
          ? adjustBrightness(colors[randomIndex], ajust)
          : adjustBrightness(colors[randomIndex], 0);

        rowItems.push(
          <ColorCard
            key={`${row}-${col}`}
            row={row}
            col={col}
            color={color}
            onPress={() =>
              handleCardPress(row, col, differentCardRow, differentCardCol)
            }
          />
        );
      }

      grid.push(
        <View key={row} style={styles.row}>
          {rowItems}
        </View>
      );
    }

    return grid;
  };

  useEffect(() => {
    setGrid(renderGrid(curLevel));
  }, [curLevel]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/bgImage.png")}
        style={styles.image}
      >
        <Text style={styles.scoreText}>
          <Icon name="trophy" size={18} color="#fff" /> Điểm: {score}
        </Text>
        <View style={styles.cardContainer}>{grid !== null ? grid : ""}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  cardContainer: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#2596be",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a subtle box shadow
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});

export default ColorPicker;
