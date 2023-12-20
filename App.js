import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Modal, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabs from "./containers/BottomTabs";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingScreen from "./screens/gameScreen/math/shopping/ShoppingScreen";
import HomeScreen from "./screens/HomeScreen";
import Toast from "react-native-toast-message";
import FindSumScreen from "./screens/gameScreen/math/findSum/FindSumScreen";
import MathScreen from "./screens/gameScreen/math/MathScreen";
import LevelOptionsModal from "./screens/gameScreen/math/findSum/LevelOptionsModal";
import LanguageScreen from "./screens/gameScreen/language/LanguageScreen";
import BrainScreen from "./screens/gameScreen/brain/BrainScreen";
import FocusScreen from "./screens/gameScreen/focus/FocusScreen";
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
              options={{ title: "Math Game", headerBackTitle: " " }}
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

            {/* Language Game */}
            <Stack.Screen
              name="Language"
              options={{ title: "Language Game", headerBackTitle: " " }}
              component={LanguageScreen}
            />

            {/* Focus Game */}
            <Stack.Screen
              name="Focus"
              options={{ title: "Focus Game", headerBackTitle: " " }}
              component={FocusScreen}
            />

            {/* Brain Game */}
            <Stack.Screen
              name="Brain"
              options={{ title: "Brain Game", headerBackTitle: " " }}
              component={BrainScreen}
            />
          </Stack.Navigator>
          <Toast position="bottom" bottomOffset={80} visibilityTime={2000} />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
