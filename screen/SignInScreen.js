import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

const SignInScreen = ({ setToken }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState()
  const [secure, setSecure] = useState(true)
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `https://airbnb-clone-malo.herokuapp.com/user/login`,
        // "http://localhost:3001/user/login",
        { email, password }
      )
      console.log('login', response.data);
      setData(response.data)
      setToken(response.data.token)
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={require('../assets/airbnbwhite.png')} />
        <Text style={styles.title}>Login</Text>
        <TextInput placeholder="Email"
          placeholderTextColor="#E1E1E1"
          style={styles.textInput}
          onChangeText={email => setEmail(email)}
        />
        <TextInput placeholder="Password"
          placeholderTextColor="#E1E1E1"
          secureTextEntry={secure}
          style={styles.textInput}
          onChangeText={password => setPassword(password)}
        />
        {secure ?
          (<AntDesign name="eye" size={24} color="#E1E1E1" style={styles.eye}
            onPress={() => setSecure(false)}
          />) :
          (<Entypo name="eye-with-line" size={24} color="#E1E1E1" style={styles.eye}
            onPress={() => setSecure(true)} />
          )}

        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={async () => {
            onSubmit()
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.Signup}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F35960",
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 70
  },
  title: {
    fontSize: 24,
    color: "#e1e1e1",
    marginVertical: 20,
    fontWeight: "bold"
  },

  logo: {
    width: 130,
    height: 150,
    marginBottom: 30,
  },
  buttonSubmit: {
    width: 190,
    height: 65,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  buttonText: {
    color: "#F35960",
    fontSize: 24
  },
  Signup: {
    marginTop: 15,
    color: "white",
    textDecorationLine: "underline",
  },
  textInput: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 30,
    color: "white",
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: 25,
    bottom: 305,

  }
});
export default SignInScreen;