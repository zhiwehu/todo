import React, {Component} from "react";

import {View, Text, StyleSheet, Switch, TouchableOpacity} from "react-native";

class Row extends Component {
  render() {
    const complete = this.props.complete;
    return (
      <View style={styles.container}>
        <Switch value={complete}
                onValueChange={this.props.onComplete}
        />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
        </View>
        <TouchableOpacity
          onPress={this.props.onRemove}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  textWrap: {
    borderColor: "green",
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 10
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d"
  },
  complete: {
    borderColor: "yellow",
    borderWidth: 1,
    textDecorationLine: 'line-through'
  },
  destroy: {
    borderColor: "blue",
    borderWidth: 1,
    fontSize:20,
    color: "red"
  }
});

export default Row;