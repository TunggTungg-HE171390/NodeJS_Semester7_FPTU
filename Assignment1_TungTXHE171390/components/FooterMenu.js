import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const menuItemsToDisplay = [
    {
        title: "Button",
        data: [
            { name: "Home", icon: require("../Images/HOME.png") },
            { name: "All Apps", icon: require("../Images/ic_all_app.png") },
            { name: "Gold", icon: require("../Images/ic_gold_ai_lab.png") },
            { name: "Game", icon: require("../Images/GAME.png") },
            { name: "Profile", icon: require("../Images/img_place_holder_avatar_employee_info.png") },
        ],
    }
];

export default function FooterMenu() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {menuItemsToDisplay[0].data.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={item.icon} style={styles.iconImage} />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    row: {
        flexDirection: "row", // Hiển thị theo chiều ngang
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemContainer: {
        flex: 18,
        marginHorizontal: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 11,
        marginTop: 5,
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain', // Điều chỉnh hình ảnh để vừa với kích thước
    },
});

