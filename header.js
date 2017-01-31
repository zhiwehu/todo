// 引入React和Component
import React, { Component } from "react";
// 引入Text，显示文字
import { View, Text } from "react-native";

// 定义Header类，这个类是Component的子类
class Header extends Component {
  /*
   实现Header类的render方法，这个方法返回一个View，显示Footer
   */
  render() {
    return (
      <View>
        <Text>我是Header</Text>
      </View>
    );
  }
}

// 导出这个模块，供外部调用
export default Header;
