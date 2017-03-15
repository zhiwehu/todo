import React, {Component} from "react";

import {View, Text, StyleSheet, Switch, TouchableOpacity, TextInput} from "react-native";

class Row extends Component {

  render() {
    const { complete } = this.props;

    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)} >
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </TouchableOpacity>
    );

    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.remove}>X</Text>
      </TouchableOpacity>
    );

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    );

    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput
          autoFocus
          multiline
          value = {this.props.text}
          onChangeText = {this.props.onUpdate}
          style={styles.input}
        />

      </View>
    );

    return (
      <View style={styles.container}>
        <Switch
          value = {complete}
          onValueChange = {this.props.onComplete}
        />

        {this.props.editing ? editingComponent : textComponent}
        {this.props.editing ? doneButton : removeButton}
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
  complete: {
    textDecorationLine: "line-through"
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d"
  },
  input: {
    flex: 1,
    height: 100,
    padding: 0,
    fontSize: 24,
    color: "#4d4d4d"
  },
  remove: {
    fontSize: 20,
    color: "red"
  },
  done: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    padding: 7
  },
  doneText: {
    fontSize: 20,
    color: "#4d4d4d"
  }
});

export default Row;
