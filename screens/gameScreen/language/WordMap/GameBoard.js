// components/GameBoard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GameBoard = ({ grid, onSelect }) => {
  return (
    <View style={styles.board}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.cell, cell.selected && styles.selectedCell]}
              onPress={() => onSelect(rowIndex, colIndex)}
            >
              <Text style={styles.cellText}>{cell.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCell: {
    backgroundColor: "yellow",
  },
  cellText: {
    fontSize: 16,
  },
});

export default GameBoard;
