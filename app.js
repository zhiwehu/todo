// 引入React和Component
import React, { Component } from "react";
// 引入View，类似于html的Div
import { View, Text, StyleSheet, Platform } from "react-native";
// 引入我们的Header模块
import Header from "./header";
// 引入我们的Footer模块
import Footer from "./footer";

// 定义App类，这个类是Component的子类
class App extends Component {

  // 构造方法,初始化state
  constructor(props) {
    super(props);
    // 初始化2个状态
    this.state = {
      value: "",
      items: []
    };
  }

  /*
   传给Header.TextInput.onSubmitEditing的回调函数
   更新this.state.items
   设置this.state.value为空
   */
  handleAddItem() {
    if (!this.state.value) return;
    // 创建一个新的items,从this.state.items里copy现有的数据,再增加一个新的
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];
    // 更新state
    this.setState({
      items: newItems,
      value: ""
    });
  }

  /*
   实现App类的render方法，这个方法返回一个View，
   其组成分别是Header, Content和Footer
   */
  render() {
    return (
      <View style={styles.container}>
        <Header
          value = {this.state.value}
          onAddItem = {this.handleAddItem.bind(this)}
          onChange = {(value) => this.setState({value})}
        />

        <View style={styles.content}>
          <Text>我是Content</Text>
        </View>

        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  content: {
    flex: 1
  }
});

// 导出这个模块，供外部调用
export default App;