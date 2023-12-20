import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const WordMap = () => {
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
    "WHALE",
    "YOUTH",
    "ZEAL",
    "BLITZ",
    "BLINK",
    "CHESS",
    "CRISP",
    "DAISY",
    "FUNKY",
    "GLIDE",
    "HAZEL",
    "JUMBO",
    "KITTY",
    "LUCKY",
    "MIRTH",
    "NOBLE",
    "PLUSH",
    "QUEST",
    "RUMBA",
    "SPICY",
    "TANGO",
    "UNZIP",
    "VELVET",
    "WITTY",
    "XEROX",
    "YODEL",
    "ZAPPY",
  ];
  const levels = {
    1: { gridSize: 6, amount: 3 },
    2: { gridSize: 7, amount: 6 },
    3: { gridSize: 8, amount: 9 },
    4: { gridSize: 9, amount: 11 },
    5: { gridSize: 10, amount: 13 },
    6: { gridSize: 10, amount: 15 },
  };
  function randomWords(array, n) {
    if (n > array.length) {
      console.error("Cannot pick more elements than the length of the array.");
      return;
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array.slice(0, n);
  }
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
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
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
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState(randomWords(BigList, levels[1].amount));
  const [grid, setGrid] = useState(generateGrid(words, levels[1].gridSize));
  const [selectedCells, setSelectedCells] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [disabledWords, setDisabledWords] = useState([]);

  const handleCellPress = (row, col) => {
    const isSelected = selectedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    if (isSelected) {
      // Deselect the cell if it's already selected
      setSelectedCells((prevSelectedCells) =>
        prevSelectedCells.filter(
          (cell) => !(cell.row === row && cell.col === col)
        )
      );
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
        });
        checkGameCompletion();
      }
    }
  };

  const isPrefixOfAnyWord = (prefix) => {
    return words.some((word) => word.startsWith(prefix));
  };

  const checkGameCompletion = () => {
    if (correctWords.length === words.length) {
      resetGame();
    }
  };

  const resetGame = () => {
    const newList = randomWords(BigList, levels[level + 1].amount);
    // Reset the game state
    setWords(newList);
    setGrid(generateGrid(newList, gridSize));
    setSelectedCells([]);
    setCorrectWords([]);
    setDisabledWords([]);
    setLevel(level + 1);
  };

  return (
    <View style={styles.container}>
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
                disabled={disabledWords.some(
                  (obj) => obj.row === rowIndex && obj.col === colIndex
                )}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color
  },
  gridContainer: {
    flexDirection: "column",
    marginVertical: 20,
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
    backgroundColor: "#4CAF50", // Word box background color
    color: "#ffffff", // Word text color
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
