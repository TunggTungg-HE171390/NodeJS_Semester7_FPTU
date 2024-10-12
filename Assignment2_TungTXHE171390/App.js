import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Image, Modal, TouchableOpacity, Text, SectionList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const groupImages = (images) => {
  const grouped = [];
  for (let i = 0; i < images.length; i += 4) {
    grouped.push({
      data: [images.slice(i, i + 4)],
    });
  }
  return grouped;
};

const App = () => {
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      await loadImages();  //Gọi hàm loadImages để tải ảnh từ bộ nhớ cục bộ và hiển thị trong modal.
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({    //Mở camera
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], //quản lý định dạng và chất lượng ảnh
      quality: 1,
    });  

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const newImages = [...images, uri];
      setImages(newImages);
      await AsyncStorage.setItem("images", JSON.stringify(newImages));
    }////mảng này được lưu vào bộ nhớ cục bộ bằng AsyncStorage.setItem.
  };

  //Hàm này tải ảnh từ bộ nhớ
  const loadImages = async () => {
    const storedImages = await AsyncStorage.getItem("images");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  };

  const handleMarkerPress = () => {
    setModalVisible(true);
  };

  const groupedImages = groupImages(images);

  const renderImageItem = ({ item }) => (
    <View style={styles.row}>
      {item.map((uri, index) => (
        <Image key={index} source={{ uri }} style={styles.image} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={location}
            title="Vị trí hiện tại"
            onPress={handleMarkerPress}
          />
        </MapView>
      )}
      <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
        <Icon name="camera" size={40} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="times" size={24} color="#000" />
            </TouchableOpacity>
            {images.length > 0 ? (
              <SectionList
                sections={groupedImages}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.imageList}
                contentContainerStyle={styles.imageListContent}
              />
            ) : (
              <Text>Hãy check-in địa điểm này</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cameraButton: {
    position: "absolute",
    bottom: 60,
    right: 25,
    backgroundColor: "#000",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  imageList: {
    flex: 1,
  },
  imageListContent: {
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 0.5,
    borderRadius: 10,
  },
});

export default App;
