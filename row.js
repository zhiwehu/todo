import React, {Component} from "react";

import {View, Text, StyleSheet} from "react-native";

class Row extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textWrap}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d"
  }
});

export default Row;
