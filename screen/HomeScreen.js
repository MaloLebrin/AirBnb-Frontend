import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, ActivityIndicator, Button } from "react-native";

import axios from "axios";
import Card from "../components/Card";
import {
    FlatList,
    TouchableWithoutFeedback
} from "react-native-gesture-handler";

const HomeScreen = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://express-airbnb-api.herokuapp.com/rooms"
            );
            setData(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);


    return isLoading ?
        (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        ) : (
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <Card data={item} />
                )}
            />
        );
}
export default HomeScreen;