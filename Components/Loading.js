import React from "react";
import { StatusBar } from "expo-status-bar";

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={styles.container}>
    <StatusBar style="auto" />
    <ActivityIndicator
      size={50}
      color="tomato"
      style={{ marginVertical: 20 }}
    />
    <Text>Please Wait</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
