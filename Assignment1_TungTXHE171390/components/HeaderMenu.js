import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HeaderMenu() {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Type feature's name"
                    placeholderTextColor="#aaa"
                />
            </View>
            <View style={styles.iconContainer}>
                <Icon name="format-list-bulleted" size={30} color="#000" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchBar: {
        flex: 9,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
