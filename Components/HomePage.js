import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   updateDoc,
//   increment,
//   arrayUnion,
//   addDoc,
//   collection,
// } from "firebase/firestore";
// import { app } from "../Firebase";

const { width, height } = Dimensions.get("window");
export default function HomePage({ navigation }) {
  // useEffect(async () => {
  //   const db = getFirestore(app);
  //   const docRef = await addDoc(collection(db, "PostCol"), {
  //     text: "This is Another Description",
  //     title: "This is  Title",
  //     currentDateInMilis: Date.now(),
  //     image: "https://picsum.photos/200",
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.ImageStyle}
        source={require("../assets/MaskImage.png")}
      />
      {/* <View style={styles.DivStyle}></View> */}
      <TouchableOpacity
        style={styles.BtnStyle}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageStyle: {
    width: width,
    height: height,
  },
  DivStyle: {
    width: width * 1.7,
    height: width * 1.7,
    borderRadius: 1000,
    backgroundColor: "#f2f2f2",
    position: "absolute",
    bottom: -width,
  },
  BtnStyle: {
    backgroundColor: "tomato",
    width: width / 1.5,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 50,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 21,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
