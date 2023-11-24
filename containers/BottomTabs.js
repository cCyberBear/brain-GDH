import CustomBottomTab from "../components/shared/BottomTabs/CustomBottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import IntroScreen from "../screens/IntroScreen";
import SettingScreen from "../screens/SettingScreen";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={{ tabBarLabel: "Intro" }}
          name="Intro"
          component={IntroScreen}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Home" }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Setting" }}
          name="Setting"
          component={SettingScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;
