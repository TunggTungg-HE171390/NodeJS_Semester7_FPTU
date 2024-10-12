import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Modal, Button, Image, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuItemsToDisplay = [
  {
    title: "WORK",
    data: [
      { name: "Approve Now", image: require("../Images/ic_favourite_approve_now.png") },
      { name: "Reward", image: require("../Images/ic_favourite_reward.png") },
      { name: "Discipline", image: require("../Images/ic_favourite_discipline.png") },
      { name: "Learning", image: require("../Images/ic_favourite_learning.png") },
      { name: "My Tasks", image: require("../Images/ic_favourite_reminder.png") },
    ],
  },
  {
    title: "UTILITIES",
    data: [
      { name: "FPT Care", image: require("../Images/ic_favourite_fpt_care.png") },
      { name: "Events", image: require("../Images/ic_favourite_event.png") },
      { name: "Survey", image: require("../Images/ic_favourite_survey.png") },
      { name: "FPT Dating", image: require("../Images/ic_favourite_dating.png") },
      { name: "Payslip", image: require("../Images/ic_favourite_payslip.png") },
      { name: "Birthday", image: require("../Images/ic_favourite_birthday.png") },
    ],
  },
  {
    title: "NEWS",
    data: [
      { name: "News", image: require("../Images/ic_favourite_news.png") },
      { name: "Star Ave", image: require("../Images/ic_favourite_star_ave.png") },
    ],
  },
  {
    title: "WIKI",
    data: [
      { name: "Employee Info", image: require("../Images/ic_favourite_employee_info.png") },
    ],
  },
  {
    title: "GAME",
    data: [
      { name: "Game", image: require("../Images/ic_favourite_game.png") },
    ],
  },
];

// Hàm hiển thị ứng dụng, chia thành các nhóm
const displayApp = (array, rawSize) => {
  const results = [];
  for (let i = 0; i < array.length; i += rawSize) {
    results.push(array.slice(i, i + rawSize));
  }
  return results;
};

const MenuItem = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItemsToDisplay);

  // Hàm lọc các mục theo tên
  const filterMenuItems = () => {
    const newFilteredMenuItems = menuItemsToDisplay.map((section) => {
      const filteredData = section.data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return { ...section, data: displayApp(filteredData, 4) }; // Sử dụng displayApp để chia nhóm
    }).filter((section) => section.data.length > 0);

    setFilteredMenuItems(newFilteredMenuItems.length > 0 ? newFilteredMenuItems : menuItemsToDisplay);
  };

  // Cập nhật filteredMenuItems mỗi khi searchText thay đổi
  useEffect(() => {
    filterMenuItems();
  }, [searchText]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    // Kiểm tra nếu item là một mảng trước khi gọi map
    if (!Array.isArray(item)) {
      return null; // Nếu item không phải là mảng, không render gì cả
    }

    return (
      <View style={menuStyles.row}>
        {item.map((subItem, index) => (
          <TouchableOpacity key={index} onPress={() => handleItemPress(subItem)} style={menuStyles.itemContainer}>
            <View style={menuStyles.itemImg}>
              <Image
                source={subItem.image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </View>
            <Text style={menuStyles.itemText}>{subItem.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={menuStyles.container}>

      <View style={menuStyles.searchcontainer}>
        <View style={menuStyles.searchBar}>
          <TextInput
            style={menuStyles.input}
            placeholder="Type feature's name"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText} // Cập nhật searchText khi người dùng nhập
          />
        </View>

        <View style={menuStyles.iconContainer}>
          <Icon name="format-list-bulleted" size={30} color="#000" />
        </View>
      </View>

      <Text style={menuStyles.headerText}>All Apps</Text>
      <SectionList
        sections={filteredMenuItems} // Sử dụng danh sách đã lọc
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={menuStyles.itemTitle}>{title}</Text>
        )}
        renderItem={renderItem} // Gọi hàm renderItem để hiển thị các mục
      />
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={menuStyles.modalContainer}>
            <View style={menuStyles.modalView}>
              <Image
                source={selectedItem.image}
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 20,
                  borderRadius: 75,
                  resizeMode: 'cover',
                }}
              />
              <Text style={menuStyles.modalTitle}>{selectedItem.name}</Text>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap", // Cho phép các item wrap vào dòng mới
    marginBottom: 10,
  },
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    flex: 9,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '22%', // Điều chỉnh chiều rộng cho 4 phần tử mỗi dòng
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemTitle: {
    backgroundColor: "#D3D3D3",
    fontSize: 15,
    padding: 10,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,

  },
});

export default MenuItem;
