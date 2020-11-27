import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const SignUpScreen = ({ setToken }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [description, setDescription] = useState("")
  const [data, setData] = useState()
  const [secure, setSecure] = useState(true)

  const OnSubmit = async () => {
    if (email && password && username && description && password2) {
      try {
        if (password === password2) {
          const response = await axios.post(
            `https://express-airbnb-api.herokuapp.com/user/sign_up`,
            // "http://localhost:3001/user/signup",
            { email, username, password, description, }
          )
          // console.log('signup', response.data);
          setData(response.data)
          setToken(response.data.token)
          setId(response.data._id)
        } else {
          alert('both password are different')
        }
      } catch (error) {
        alert(error.response.data.error);
      }

    } else {
      alert("Remplir tous les champs !")
    }
  }
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.wrapper}>
          <Image style={styles.logo} source={require('../assets/airbnbwhite.png')} />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.textInput}
            keyboardType={"email-address"}
            placeholder="Email"
            placeholderTextColor="#E1E1E1"
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#E1E1E1"
            onChangeText={name => setUsername(name)}
          />
          <TextInput
            multiline={true}
            numberOfLines={8}
            maxLength={200}
            style={styles.textArea}
            placeholder="Description (8 lines max)"
            placeholderTextColor="#E1E1E1"
            onChangeText={description => setDescription(description)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#E1E1E1"
            secureTextEntry={secure}
            onChangeText={password => setPassword(password)}
          />
          {secure ?
            (<AntDesign name="eye" size={24} color="#E1E1E1" style={styles.eye1}
              onPress={() => setSecure(false)}
            />) :
            (<Entypo name="eye-with-line" size={24} color="#E1E1E1" style={styles.eye1}
              onPress={() => setSecure(true)} />
            )}

          <TextInput
            style={styles.textInput}
            placeholder="Confirme Password"
            placeholderTextColor="#E1E1E1"
            secureTextEntry={secure}
            onChangeText={password => setPassword2(password)}
          />
          {secure ?
            (<AntDesign name="eye" size={24} color="#E1E1E1" style={styles.eye2}
              onPress={() => setSecure(false)}
            />) :
            (<Entypo name="eye-with-line" size={24} color="#E1E1E1" style={styles.eye2}
              onPress={() => setSecure(true)} />
            )}

          <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
            <Text style={styles.buttonText}> Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.SignIn}>
              Déjà un compte ? Se connecter
              </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
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
    marginTop: 70,
    padding: 24,
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 130,
    height: 150,
  },
  title: {
    fontSize: 24,
    color: "#e1e1e1",
    marginVertical: 20,
    fontWeight: "bold"
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
  SignIn: {
    marginTop: 15,
    color: "white",
    textDecorationLine: "underline"
  },
  textInput: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 30,
    paddingLeft: 15,
    color: "white"
  },
  textArea: {
    width: 330,
    height: 80,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    textAlignVertical: "top",
    color: "white",
    marginBottom: 20
  },
  eye1: {
    position: "absolute",
    bottom: 285,
    right: 25,
  },
  eye2: {
    position: "absolute",
    right: 25,
    bottom: 210,
  }
});
export default SignUpScreen;