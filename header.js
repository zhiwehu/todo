// 引入React和Component
import React, {Component} from "react";
// 引入Text，显示文字
import {View, Text, StyleSheet, TextInput} from "react-native";

// 定义Header类，这个类是Component的子类
class Header extends Component {
  /*
   实现Header类的render方法，这个方法返回一个View，显示Footer
   */
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          placeholder="什么需要做?"
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

// 创建StyleSheet
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 50
  }
});

// 导出这个模块，供外部调用
export default Header;
