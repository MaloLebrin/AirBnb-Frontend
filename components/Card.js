import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import Ratings from "./Ratings";

const Card = ({ data }) => {

    _renderItem = ({ item, index }) => {
        return <Image style={styles.img} source={{ uri: item.url }} />;
    };
    // console.log(data);
    return data ? (
        <View style={styles.container}>
            <Carousel
                data={data.photos}
                renderItem={_renderItem}
                sliderWidth={370}
                itemWidth={370}
                loop={true}
            />
            <View style={styles.titleAndProfileImg}>
                <View>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={styles.rating}>
                        {/* <Text>étoiles {data.ratingValue}</Text> */}
                        <Ratings rating={data.ratingValue} />
                        <Text style={styles.reviews}>{data.reviews} reviews</Text>
                        <Text style={styles.price}> {data.price} € </Text>
                    </View>
                </View>
                <Image
                    style={styles.profilePicture}
                    source={{ uri: data.user.account.photo.url }}
                />
            </View>
        </View>
    ) : (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
    </View>
        )
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderBottomColor: "#BBBBBB",
        borderBottomWidth: 1
    },
    img: {
        height: 215
    },
    price: {
        color: "white",
        fontSize: 22,
        backgroundColor: "#F35960",
        position: "absolute",
        bottom: 90,
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    profilePicture: {
        height: 50,
        width: 50,
        borderRadius: 30
    },
    titleAndProfileImg: {
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rating: {
        flexDirection: "row",
        alignItems: "center"
    },
    reviews: {
        fontSize: 14,
        color: "#BBBBBB",
        marginLeft: 10
    }
});
export default Card;