import * as React from "react";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./Components/Loading";
import ModalComp from "./Components/ModalComp";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
        // initialRouteName="Loading"
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModalComp"
          component={ModalComp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
