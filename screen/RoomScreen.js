import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Card from "../components/Card";
import MapView from "react-native-maps";

const Room = ({ }) => {
    const { params } = useRoute();
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [viewMore, setViewMore] = useState(false)
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${params.id}`)
                setData(response.data)
                // console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                alert(error.response.data.error);
            }
        }
        fetchData()
    }, [params.id])

    return isLoading ?
        (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        ) : (
            <SafeAreaView>
                <ScrollView>
                    <Card data={data} />
                    <TouchableWithoutFeedback style={styles.wrapper} onPress={() => setViewMore(!viewMore)}>

                        <Text numberOfLines={viewMore ? null : 4} style={styles.description}>{data.description}</Text>
                    </TouchableWithoutFeedback>
                    <MapView
                        style={{ flex: 1, width, height: height - 630 }}
                        initialRegion={{
                            latitude: data.location[1],
                            longitude: data.location[0],

                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        }}
                        showsUserLocation={true}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: data.location[1],
                                longitude: data.location[0],
                            }}
                            title={data.title}
                            description={data.description}
                        />
                    </MapView>
                    {/* <Text>emrhjroj</Text> */}
                </ScrollView>
            </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    wrapper: {
        margin: 20
    },
    description: {
        fontSize: 16,
        textAlign: "justify"
    }
});
export default Room;