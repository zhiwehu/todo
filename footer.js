// 引入React和Component
import React, {Component} from "react";
// 引入Text，显示文字
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

// 定义Footer类，这个类是Component的子类
class Footer extends Component {
  /*
   实现Header类的render方法，这个方法返回一个View，显示Footer
   */
  render() {
    const {filter} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === 'ALL' && styles.selected]} onPress={() => this.props.onFilter('ALL')}>
            <Text>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === 'ACTIVE' && styles.selected]} onPress={() => this.props.onFilter('ACTIVE')}>
            <Text>未完成</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === 'COMPLETE' && styles.selected]} onPress={() => this.props.onFilter('COMPLETE')}>
            <Text>已完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filters: {
    flexDirection: "row"
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent"
  },
  selected: {
    borderColor: "rgba(175, 47, 47, .2)"
  }
});

// 导出这个模块，供外部调用
export default Footer;