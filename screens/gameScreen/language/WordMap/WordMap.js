import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import HowToPlayModel from "../../../../components/shared/HowToPlayModel";
import { Modal } from "react-native";
import { Image } from "react-native";

const BigList = [
  "APPLE",
  "CLOUD",
  "GREEN",
  "LIGHT",
  "MOUSE",
  "TABLE",
  "HAPPY",
  "WATER",
  "DANCE",
  "MUSIC",
  "CHAIR",
  "PENCIL",
  "BEACH",
  "SMILE",
  "ROBOT",
  "TRAIN",
  "SWIFT",
  "GRAPE",
  "TIGER",
  "MELON",
  "OCEAN",
  "SUNNY",
  "NIGHT",
  "LEAFY",
  "BRUSH",
  "JAZZ",
  "PEACE",
  "TOAST",
  "QUIET",
  "ZEBRA",
  "MAGIC",
  "QUICK",
  "SPARK",
  "VIVID",
  "MANGO",
  "WITTY",
  "FROST",
  "FAIRY",
  "CROWN",
  "SMIRK",
  "FRESH",
  "SILK",
  "SUGAR",
  "BLAZE",
  "AMBER",
  "CHARM",
  "DREAM",
  "FLUTE",
  "FABLE",
  "GIANT",
  "HONOR",
  "JOLLY",
  "LUNAR",
  "NOVEL",
  "PULSE",
  "QUILT",
  "RIDER",
  "SHINY",
  "TEASE",
  "VOICE",
  // "WHALE",
  // "YOUTH",
  // "ZEAL",
  // "BLITZ",
  // "BLINK",
  // "CHESS",
  // "CRISP",
  // "DAISY",
  // "FUNKY",
  // "GLIDE",
  // "HAZEL",
  // "JUMBO",
  // "KITTY",
  // "LUCKY",
  // "MIRTH",
  // "NOBLE",
  // "PLUSH",
  // "QUEST",
  // "RUMBA",
  // "SPICY",
  // "TANGO",
  // "UNZIP",
  // "VELVET",
  // "WITTY",
  // "XEROX",
  // "YODEL",
  // "ZAPPY",
];
const levels = {
  1: { gridSize: 6, amount: 3 },
  2: { gridSize: 7, amount: 6 },
  3: { gridSize: 8, amount: 9 },
  4: { gridSize: 9, amount: 11 },
  // 5: { gridSize: 9, amount: 13 },
  // 6: { gridSize: 9, amount: 15 },
};
const randomWords = (array, n) => {
  if (n > array.length) {
    console.error("Cannot pick more elements than the length of the array.");
    return;
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, n);
};
const generateGrid = (wordList, gridSize) => {
  const grid = [];
  const directions = [
    { row: 0, col: 1 }, // horizontal
    { row: 1, col: 0 }, // vertical
  ];

  // Initialize an empty grid
  for (let i = 0; i < gridSize; i++) {
    const row = Array.from({ length: gridSize }, () => "");
    grid.push(row);
  }

  const placeWord = (word) => {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let row, col;

    let collision = true;

    while (collision) {
      // Randomly select a starting position
      if (direction === directions[0]) {
        // Horizontal
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * (gridSize - word.length + 1));
      } else {
        // Vertical
        row = Math.floor(Math.random() * (gridSize - word.length + 1));
        col = Math.floor(Math.random() * gridSize);
      }

      // Check for collisions
      collision = false;
      for (let i = 0; i < word.length; i++) {
        const newRow = row + i * direction.row;
        const newCol = col + i * direction.col;

        if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
          collision = true;
          break;
        }
      }
    }

    // Place the word in the grid
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * direction.row;
      const newCol = col + i * direction.col;
      grid[newRow][newCol] = word[i];
    }
  };

  // Place each word in the grid
  wordList.forEach(placeWord);

  // Fill empty cells with random letters
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random uppercase letter
      }
    }
  }

  return grid;
};

const WordMap = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [visibleHowToPlay, setVisibleHowToPlay] = useState(false);
  const [curLevel, setCurLevel] = useState(0);
  const [words, setWords] = useState([]);
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [disabledWords, setDisabledWords] = useState([]);

  const handleCellPress = (row, col) => {
    const isSelected = selectedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    if (isSelected) {
      // Deselect the cell if it's already selected
      const newSelectedCells = selectedCells.filter(
        (cell) => !(cell.row === row && cell.col === col)
      );
      setSelectedCells(newSelectedCells);
    } else {
      // Select the cell and check if the selected letters form a valid word
      const newSelectedCells = [...selectedCells, { row, col }];
      setSelectedCells(newSelectedCells);
      const selectedWord = newSelectedCells
        .map((cell) => grid[cell.row][cell.col])
        .join("");
      if (isPrefixOfAnyWord(selectedWord)) {
        // Valid prefix, continue selecting
      } else {
        // Invalid prefix, reset selected cells
        setSelectedCells([]);
      }
      if (
        words.includes(selectedWord) &&
        !disabledWords.includes(selectedWord)
      ) {
        // Correct word
        setScore((preScore) => preScore + curLevel * 100);
        setCorrectWords((prevCorrectWords) => [
          ...prevCorrectWords,
          selectedWord,
        ]);
        setDisabledWords((prevDisabledWords) => [
          ...prevDisabledWords,
          ...newSelectedCells,
        ]);
        setSelectedCells([]);
        Toast.show({
          type: "success",
          text1: `CÂU TRẢ LỜI CHÍNH XÁC !!!: ${selectedWord}`,
          text2: `Bạn được cộng ${curLevel * 100} điểm !`,
        });
        if (correctWords.length + 1 === words.length) {
          resetGame();
        }
      }
    }
  };

  const isPrefixOfAnyWord = (prefix) => {
    return words.some((word) => word.startsWith(prefix));
  };

  const resetGame = () => {
    const newList = randomWords(BigList, levels[curLevel + 1].amount);
    setWords(newList);
    setGrid(generateGrid(newList, levels[curLevel + 1].gridSize));
    setSelectedCells([]);
    setCorrectWords([]);
    setDisabledWords([]);
    setCurLevel((pre) => pre + 1);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setVisibleHowToPlay(true);
          }}
        >
          <Icon
            name="question"
            size={24}
            color="grey"
            style={{ paddingRight: 15 }}
          />
        </Pressable>
      ),
    });
    const newList = randomWords(BigList, levels[1].amount);
    setWords(newList);
    setGrid(generateGrid(newList, levels[1].gridSize));
    setCurLevel(1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/bgImage.png")}
        style={styles.image}
      >
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <Text style={{ fontSize: 24, color: "#fff" }}>
              <Icon name="trophy" size={16} color="#fff" /> Your Score:
              <Text style={{ fontWeight: "bold" }}> {score}</Text>
            </Text>
            <Text style={{ fontSize: 24, color: "#fff" }}>
              <Icon name="signal" size={16} color="#fff" /> Level:
              <Text style={{ fontWeight: "bold" }}> {curLevel}</Text>
            </Text>
          </View>
          <View style={styles.wordsContainer}>
            {words.map((word, index) => (
              <Text
                key={index}
                style={[
                  styles.word,
                  correctWords.includes(word) ? styles.correctWord : null,
                  //   incorrectWords.includes(word) ? styles.incorrectWord : null,
                ]}
              >
                {word}
              </Text>
            ))}
          </View>
          <View style={styles.gridContainer}>
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.cell,
                      selectedCells.some(
                        (selectedCell) =>
                          selectedCell.row === rowIndex &&
                          selectedCell.col === colIndex
                      )
                        ? styles.selectedCell
                        : null,
                      disabledWords.some(
                        (obj) => obj.row === rowIndex && obj.col === colIndex
                      )
                        ? styles.disabledCell
                        : null,
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    // disabled={disabledWords.some(
                    //   (obj) => obj.row === rowIndex && obj.col === colIndex
                    // )}
                  >
                    <Text style={styles.cellText}>{cell}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          {visibleHowToPlay && (
            <HowToPlayModel
              visibleHowToPlay={visibleHowToPlay}
              setVisibleHowToPlay={setVisibleHowToPlay}
            />
          )}
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{ width: "50%", height: "50%" }}
                source={require("../../../../assets/brain.png")}
              />
              <Text style={styles.modalText}>
                Bạn đúng đã hoàn thành trò chơi !
              </Text>
              <Text style={styles.modalText}>
                Số điểm của bạn là{" "}
                <Text style={{ fontWeight: "bold", color: "green" }}>
                  {score}
                </Text>{" "}
              </Text>

              <View style={{ flexDirection: "row", gap: 14 }}>
                <Pressable
                  style={[styles.button, styles.buttonHome]}
                  onPress={() => navigation.navigate("BottomTabs")}
                >
                  <Text style={styles.textStyle}>Trang chủ</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // opacity: 0.9,
  },
  title: {
    margin: 20,
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "column",
    marginVertical: 20,
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    margin: 2,
    backgroundColor: "#ffffff", // Cell background color
    borderWidth: 1,
    borderColor: "#e0e0e0", // Cell border color
  },
  cellText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // Cell text color
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  word: {
    fontSize: 18,
    margin: 5,
    padding: 10,
    backgroundColor: "yellow", // Word box background color
    color: "#333", // Word text color
    borderRadius: 5,
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    margin: 2,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedCell: {
    backgroundColor: "#add8e6", // Light blue for selected cells
  },
  cellText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  correctWord: {
    backgroundColor: "#4CAF50", // Green for correct words
    color: "#ffffff",
  },
  incorrectWord: {
    backgroundColor: "#FF6347", // Red for incorrect words
    color: "#ffffff",
  },
  disabledCell: {
    backgroundColor: "#cccccc", // Gray for disabled cells
  },
});

export default WordMap;
