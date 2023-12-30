import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import BottomTabs from "./containers/BottomTabs";
import BrainScreen from "./screens/gameScreen/brain/BrainScreen";
import FlipCard from "./screens/gameScreen/brain/FlipCard/FlipCard";
import MemoryTest2 from "./screens/gameScreen/brain/MemoryTest2/MemoryTest2";
import FocusScreen from "./screens/gameScreen/focus/FocusScreen";
import MemoryTest from "./screens/gameScreen/focus/MemoryTest/MemoryTest";
import LanguageScreen from "./screens/gameScreen/language/LanguageScreen";
import WordArrangement from "./screens/gameScreen/language/WordArrangement/WordArrangement";
import WordMap from "./screens/gameScreen/language/WordMap/WordMap";
import WordPredict from "./screens/gameScreen/language/WordPredict/WordPredict";
import MathScreen from "./screens/gameScreen/math/MathScreen";
import CalculateScreen from "./screens/gameScreen/math/calculate/CalculateScreen";
import FindSumScreen from "./screens/gameScreen/math/findSum/FindSumScreen";
import LevelOptionsModal from "./screens/gameScreen/math/findSum/LevelOptionsModal";
import ShoppingScreen from "./screens/gameScreen/math/shopping/ShoppingScreen";
import ColorPicker from "./screens/gameScreen/focus/Color/ColorPicker";
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabs">
            {/* Home Screen */}
            <Stack.Screen
              name="BottomTabs"
              options={{ title: "Chọn trò chơi" }}
              component={BottomTabs}
            />
            {/* Math Game */}
            <Stack.Screen
              name="Math"
              options={{ title: "Trò chơi tính toán", headerBackTitle: " " }}
              component={MathScreen}
            />
            <Stack.Screen
              name="Shopping"
              options={{ title: "Shopping Game", headerBackTitle: " " }}
              component={ShoppingScreen}
            />
            <Stack.Screen
              name="FindSum"
              options={{ title: "Finding Sum Game", headerBackTitle: " " }}
              component={FindSumScreen}
            />
            <Stack.Screen
              name="Level"
              options={{ title: "Game tính tổng", headerBackTitle: " " }}
              component={LevelOptionsModal}
            />
            <Stack.Screen
              name="Calculate"
              options={{ title: "Game tính tổng", headerBackTitle: " " }}
              component={CalculateScreen}
            />

            {/* Language Game */}
            <Stack.Screen
              name="Language"
              options={{ title: "Trò chơi ngôn ngữ", headerBackTitle: " " }}
              component={LanguageScreen}
            />
            <Stack.Screen
              name="WordMap"
              options={{
                title: "Ma trận chữ",
                headerBackTitle: " ",
              }}
              component={WordMap}
            />
            <Stack.Screen
              name="WordPredict"
              options={{ title: "Đoán chữ", headerBackTitle: " " }}
              component={WordPredict}
            />
            <Stack.Screen
              name="WordArrangement"
              options={{ title: "Xếp chữ", headerBackTitle: " " }}
              component={WordArrangement}
            />

            {/* Focus Game */}
            <Stack.Screen
              name="Focus"
              options={{ title: "Trò chơi tập trung", headerBackTitle: " " }}
              component={FocusScreen}
            />
            <Stack.Screen
              name="MemoryTest"
              options={{ title: "Nhớ vị trí màu", headerBackTitle: " " }}
              component={MemoryTest}
            />
            <Stack.Screen
              name="ColorPicker"
              options={{ title: "Chọn màu khác biệt", headerBackTitle: " " }}
              component={ColorPicker}
            />
            {/* Brain Game */}
            <Stack.Screen
              name="Brain"
              options={{ title: "Trò chơi trí nhớ", headerBackTitle: " " }}
              component={BrainScreen}
            />
            <Stack.Screen
              name="FlipCard"
              options={{ title: "Tìm thẻ giống nhau", headerBackTitle: " " }}
              component={FlipCard}
            />

            <Stack.Screen
              name="MemoryTest2"
              options={{ title: "Nhớ thứ tự màu", headerBackTitle: " " }}
              component={MemoryTest2}
            />
          </Stack.Navigator>
          <Toast position="bottom" bottomOffset={80} visibilityTime={2000} />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
