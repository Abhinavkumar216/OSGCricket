import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  SafeAreaView,
  Modal,
  RefreshControl,
} from "react-native";
// import axios from "axios";
import Loading from "./Loading";
import { app } from "../Firebase";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

export default function ChatPage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [modalVisible, setModalVisible] = useState(false);
  const [errormsg, setErrorMsg] = useState(null);

  // const GetAllPost = async () => {
  //   const db = getFirestore(app);

  //   try {
  //     let postsArr = [];

  //     const querySnapshot = await getDocs(collection(db, "PostCol"));

  //     querySnapshot.forEach((doc) => {
  //       postsArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setPosts(postsArr);
  //     setLoading(false);
  //   } catch (error) {
  //     Alert.alert("Error", error.message, [
  //       {
  //         text: "Retry",
  //         onPress: () => {
  //           GetAllPost();
  //         },
  //       },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  async function GetAllPost() {
    try {
      const db = getFirestore(app);
      const postRef = collection(db, "PostCol");
      const q = query(postRef, orderBy("currentDateInMilis"));
      const querySnapshot = await getDocs(q);
      let postsArr = [];
      querySnapshot.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArr);
      setLoading(false);
    } catch (err) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  useEffect(async () => {
    await GetAllPost();
    return () => {
      GetAllPost;
    };
  }, [GetAllPost]);

  const renderItem = ({ item }) => {
    const DateConverter = new Date(item.currentDateInMilis);
    return (
      <View style={styles.divStyle}>
        {item.title && <Text style={styles.title}>{item.title} </Text>}
        {item.image && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ModalComp", { imageUrl: item.image });
            }}
          >
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={{
                width: "100%",
                height: 200,
                marginVertical: 5,
                borderRadius: 3,
              }}
            />
          </TouchableOpacity>
        )}
        {item.text && <Text style={styles.text}>{item.text} </Text>}
        {item.currentDateInMilis && (
          <Text style={styles.date}>{DateConverter.toLocaleString()}</Text>
        )}
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  const openWhatsapp = () => {
    Linking.canOpenURL(
      "https://wa.me/+919777777010?text=HI,%20OSG%20I%20WANT%20ID"
    ).then((res) => {
      if (res) {
        Linking.openURL(
          "https://wa.me/+919777777010?text=HI,%20OSG%20I%20WANT%20ID"
        );
      } else {
        alert("Somthing went wrong");
      }
    });
  };
  const openTelegram = () => {
    Linking.canOpenURL("https://t.me/OSGCRICKET").then((res) => {
      if (res) {
        Linking.openURL("https://t.me/OSGCRICKET");
      } else {
        alert("Somthing went wrong");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {posts.length ? (
        <View style={styles.FlatListWrap}>
          <FlatList
            data={posts}
            style={styles.FlatListStyle}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={async () => {
                  setLoading(true);
                  await GetAllPost();
                }}
              />
            }
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 21, textAlign: "center" }}>{errormsg}</Text>
          <TouchableOpacity onPress={async () => await GetAllPost()}>
            <Text
              style={{
                borderWidth: 1,
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}
            >
              Reload
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{ ...styles.BtnStyle, backgroundColor: "#25D366" }}
          onPress={async () => await openWhatsapp()}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/whatsapp.png")}
          />
          <Text style={styles.btnText}>Join Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.BtnStyle, backgroundColor: "#229ED9" }}
          onPress={() => openTelegram()}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/telegram.png")}
          />
          <Text style={styles.btnText}>Join Telegram</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  FlatListWrap: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
  divStyle: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  BtnStyle: {
    flexDirection: "row",
    backgroundColor: "tomato",
    flexWrap: "wrap",
    width: 150,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    textAlign: "right",
    color: "tomato",
    fontWeight: "700",
    // backgroundColor: "#f1f1f1",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
