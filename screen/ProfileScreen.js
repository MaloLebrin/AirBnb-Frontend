import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons, AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";


const ProfileScreen = ({ setToken, setId }) => {
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("userToken");
        // console.log(userId, token);
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            }
          }
        )
        // console.log(response.data);
        setData(response.data)
        setEmail(data.email)
        setName(data.username)
        setDescription(data.description)
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data.error);
      }
    }
    fetchData()
  }, [])

  const usePhoto = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    // console.log(status);

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      // console.log(result); // infos sur la photo sélectionnée (sauf si on annule)

      if (result.cancelled === false) {
        // on enregistre la photo dans le state
        setPicture(result.uri);
      } else {
        alert("Pas de photo sélectionnée");
      }
    } else {
      alert("Permission refusée");
    }
  }

  const useCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // console.log(status);

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      console.log(result);

      if (!result.cancelled) {
        setPicture(result.uri);
      }
    }
  }
  const updatePicture = async () => {
    try {
      const uri = picture;
      // console.log(uri);
      const uriParts = uri.split(".");
      // console.log(uriParts);
      const fileType = uriParts[1]; //jpg
      // console.log(fileType);

      const formData = new FormData();
      formData.append("photo", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      const token = await AsyncStorage.getItem("userToken");
      setIsLoading(true);
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + token,
          },
        }
      );

      // console.log('avec la photo', response.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.error);
    }

  }

  const updateInfos = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email)
      formData.append('description', description)
      formData.append("username", name)
      const token = await AsyncStorage.getItem("userToken");
      setIsLoading(true);
      const response = await axios.put("https://express-airbnb-api.herokuapp.com/user/update",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          }
        }
      )
      console.log("update infos", response.data);
      setData(response.data)
      setIsLoading(false);

    } catch (error) {
      alert(error.response.data.error);
      setIsLoading(false);
    }
  }

  return isLoading ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator />
  </View>
  ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.wrapper}>
            <TouchableOpacity style={styles.inner}>
              {data.photo ? (
                <Image
                  style={styles.image}
                  source={{ uri: data.photo[0].url }}
                />
              ) : (
                  <AntDesign name="user" size={100} color="grey" />
                )}
            </TouchableOpacity>
            <Ionicons
              name="ios-images"
              size={35} color="grey"
              style={styles.imageIcon}
              onPress={usePhoto}
            />
            <AntDesign
              name="camera"
              size={35}
              color="grey"
              style={styles.cameraIcon}
              onPress={useCamera}
            />
            <TextInput
              style={styles.textInput}
              keyboardType={"email-address"}
              placeholder="Email"
              placeholderTextColor="#E1E1E1"
              onChangeText={email => setEmail(email)}
              value={email}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#E1E1E1"
              onChangeText={name => setName(name)}
              value={name}
            />
            <TextInput
              multiline={true}
              numberOfLines={8}
              maxLength={200}
              style={styles.textArea}
              placeholder="Description (8 lines max)"
              placeholderTextColor="#E1E1E1"
              onChangeText={description => setDescription(description)}
              value={description}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updatePicture, updateInfos}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setToken(null);
                setId(null);
              }}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>

    );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
  },
  inner: {
    justifyContent: "center", alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#F35960",

  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#F35960",
  },
  imageIcon: {
    position: "absolute",
    right: 20,
  },
  cameraIcon: {
    position: "absolute",
    right: 20,
    top: 100
  },
  textInput: {
    borderBottomColor: "#F35960",
    borderBottomWidth: 1,
    height: 45,
    width: 250,
    paddingLeft: 15,
    marginVertical: 20,
    marginHorizontal: "10%"
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#F35960",
    width: "80%",
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 15,
    textAlignVertical: "top",
    marginBottom: 20,
    marginHorizontal: "10%",
    borderRadius: 5
  },
  updateButton: {
    width: 150,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F35960",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  logoutButton: {
    width: 150,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#F35960",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  logoutButtonText: {
    color: "white"
  },
  updateButtonText: {
    color: "#F35960"
  }
});
export default ProfileScreen;