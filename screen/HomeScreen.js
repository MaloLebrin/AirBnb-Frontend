import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, ActivityIndicator, TouchableOpacity, SafeAreaView, } from "react-native";

import axios from "axios";
import Card from "../components/Card";
import { FlatList } from "react-native-gesture-handler";

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
            <SafeAreaView>

                <FlatList
                    data={data}
                    keyExtractor={item => String(item._id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Room", { id: item._id })}>
                            <Card data={item} />
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
}
export default HomeScreen;