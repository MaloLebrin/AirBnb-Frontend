import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screen/HomeScreen";
import AroundMe from "./screen/AroundMe";
import RoomScreen from "./screen/RoomScreen";
import SignInScreen from "./screen/SignInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import SettingsScreen from "./screen/SettingsScreen";
import Constants from 'expo-constants';
import Logo from "./components/Logo"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
          // User is signed in
          <Stack.Navigator>
            <Stack.Screen
              name="Tab"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: "black",
                    inactiveTintColor: "white",
                    style: {
                      backgroundColor: "#F1485C"
                    }
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            tabBarLabel: "Home",
                            headerStyle: { backgroundColor: "#F1485C", height: 90 },
                            headerTitleAlign: "center",
                            headerTitle: () => {
                              return <Logo />
                            }

                          }}
                        >
                          {(props) => <HomeScreen {...props} />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="Room"
                          options={{
                            headerBackTitleVisible: true,
                            headerBackTitleStyle: { color: 'white', marginTop: 25, marginLeft: 10 },
                            headerBackImage: () => (
                              <Ionicons
                                style={{ marginLeft: 20, marginTop: 30 }}
                                name={"ios-arrow-back"}
                                size={30}
                                color={"white"}
                              />
                            ),
                            headerStyle: { backgroundColor: "#F1485C", height: 80, },
                            headerStyle: { backgroundColor: "#F1485C", height: 90 },
                            headerTitleAlign: "center",
                            headerTitle: () => {
                              return <Logo />
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {(props) => <RoomScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="AroundMe"
                    options={{
                      tabBarLabel: "Around me",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"ios-pin"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="AroundME"
                          options={{
                            headerBackTitleVisible: true,
                            headerBackTitleStyle: { color: 'white', marginTop: 25, marginLeft: 10 },
                            headerBackImage: () => (
                              <Ionicons
                                style={{ marginLeft: 20, marginTop: 30 }}
                                name={"ios-arrow-back"}
                                size={30}
                                color={"white"}
                              />
                            ),
                            headerStyle: { backgroundColor: "#F1485C", height: 80, },
                            headerStyle: { backgroundColor: "#F1485C", height: 90 },
                            headerTitleAlign: "center",
                            headerTitle: () => {
                              return <Logo />
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {(props) => <AroundMe {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Room"
                          options={{
                            headerBackTitleVisible: true,
                            headerBackTitleStyle: { color: 'white', marginTop: 25, marginLeft: 10 },
                            headerBackImage: () => (
                              <Ionicons
                                style={{ marginLeft: 20, marginTop: 30 }}
                                name={"ios-arrow-back"}
                                size={30}
                                color={"white"}
                              />
                            ),
                            headerStyle: { backgroundColor: "#F1485C", height: 80, },
                            headerStyle: { backgroundColor: "#F1485C", height: 90 },
                            headerTitleAlign: "center",
                            headerTitle: () => {
                              return <Logo />
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {(props) => <RoomScreen {...props} />}
                        </Stack.Screen>

                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="Settings"
                    options={{
                      tabBarLabel: "Settings",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"ios-options"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Settings"
                          options={{ title: "Settings", tabBarLabel: "Settings" }}
                        >
                          {() => <SettingsScreen setToken={setToken} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}
