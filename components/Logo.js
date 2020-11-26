import React from 'react'
import { Image, StyleSheet } from "react-native"

const Logo = ({ width, height }) => {
    return (
        <Image style={styles.logo} source={require('../assets/airbnbwhite.png')} style={styles.logo
        } />

    )
}
const styles = StyleSheet.create({
    logo: {
        height: 40,
        width: 40,
        marginTop: 30,
    }
})
export default Logo;