import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabs from "./containers/BottomTabs";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingScreen from "./screens/gameScreen/math/shopping/ShoppingScreen";
import HomeScreen from "./screens/HomeScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    // <SafeAreaProvider>
    //   <StatusBar barStyle={"dark-content"} />
    //   <NavigationContainer onReady={() => changeNavigationBarColor("white")}>
    //     <BottomTabs />
    //   </NavigationContainer>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="">
    //       <Stack.Screen name="Details" component={ShoppingScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </SafeAreaProvider>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabs" headerMode="none">
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Shopping" component={ShoppingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
