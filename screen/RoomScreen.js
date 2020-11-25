import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import {
    ScrollView,
    TouchableWithoutFeedback
} from "react-native-gesture-handler";
import Card from "../components/Card";

const Room = ({ }) => {
    const { params } = useRoute();
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [viewMore, setViewMore] = useState(false)

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