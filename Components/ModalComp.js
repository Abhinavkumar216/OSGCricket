import { StyleSheet, Text, View, Modal, Image } from "react-native";
import React, { useState } from "react";

const ModalComp = ({ route }) => {
  const ImageURL = route.params.imageUrl;
  console.log("ModalComp => ", ImageURL);
  //   const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: ImageURL }}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
          marginVertical: 5,
          borderRadius: 3,
        }}
      />
    </View>
  );
};

export default ModalComp;

const styles = StyleSheet.create({});
