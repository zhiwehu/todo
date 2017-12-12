// 引入React和Component
import React, {Component} from "react";
// 引入View，类似于html的Div
import {View, Text, StyleSheet, Platform, ListView, Keyboard, AsyncStorage, ActivityIndicator} from "react-native";
// 引入我们的Header模块
import Header from "./header";
// 引入我们的Footer模块
import Footer from "./footer";
// 引入Row
import Row from "./row";

const filterItems = (filter, todos) => {
    return todos.filter(todo => {
        if (filter === 'ALL') return true;
        if (filter === 'ACTIVE') return !todo.complete;
        if (filter === 'COMPLETE') return todo.complete;
    });
};

// 定义App类，这个类是Component的子类
class App extends Component {

    // 构造方法,初始化state
    constructor(props) {
        super(props);
        // 创建ListView.DataSource
        const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        // 初始化状态
        this.state = {
            loading: true,
            filter: "ALL",
            value: "",
            items: [],
            dataSource: ds.cloneWithRows([])
        };

        this.setSource = this.setSource.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleUpdateText = this.handleUpdateText.bind(this);
        this.handleToggleEditing = this.handleToggleEditing.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem("items").then(json => {
            try {
                const items = JSON.parse(json);
                this.setSource(items, items, {loading: false});
            } catch (e) {
                this.setState({loading: false});
            }
        });
    }

    handleUpdateText(key, text) {
        const newItems = this.state.items.map((item) => {
            if (item.key !== key) return item;
            return {
                ...item,
                text
            }
        });
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    handleToggleEditing(key, editing) {
        const newItems = this.state.items.map((item) => {
            if (item.key !== key) return item;
            return {
                ...item,
                editing
            }
        });
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    handleFilter(filter) {
        this.setSource(this.state.items, filterItems(filter, this.state.items), {filter: filter})
    }

    handleRemoveItem(key) {
        const newItems = this.state.items.filter((item) => {
            return (item.key !== key);
        });
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    handleToggleComplete(key, complete) {
        const newItems = this.state.items.map((item) => {
            if (item.key !== key) return item;
            return {
                ...item,
                complete
            }
        });

        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    /*
     一个通用的setSource方法,方便调用
     */
    setSource(items, itemsDatasource, otherState = {}) {
        this.setState({
            items,
            dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
            ...otherState
        });
        AsyncStorage.setItem("items", JSON.stringify(items));
    }

    /*
     传给Header.TextInput.onSubmitEditing的回调函数
     更新this.state.items
     设置this.state.value为空
     更新this.state.dataSource
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
        this.setSource(newItems, filterItems(this.state.filter, newItems), {value: ""});
    }

    /*
     实现App类的render方法，这个方法返回一个View，
     其组成分别是Header, Content和Footer
     */
    render() {
        return (
            <View style={styles.container}>
                <Header
                    value={this.state.value}
                    onAddItem={this.handleAddItem.bind(this)}
                    onChange={(value) => this.setState({value})}
                />

                <View style={styles.content}>
                    <ListView
                        style={styles.list}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        onScroll={() => Keyboard.dismiss()}
                        renderRow={({key, ...value}) => {
                            return (
                                <Row
                                    key={key}
                                    onRemove={() => this.handleRemoveItem(key)}
                                    onComplete={(complete) => this.handleToggleComplete(key, complete)}
                                    onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                                    onUpdate={(text) => this.handleUpdateText(key, text)}
                                    {...value}
                                />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return <View key={rowId} style={styles.separator}/>
                        }}
                    />
                </View>

                <Footer
                    filter={this.state.filter}
                    onFilter={this.handleFilter}
                />

                {this.state.loading && <View style={styles.loading}>
                    <ActivityIndicator
                        size="large"
                        animating
                    />
                </View>}
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
    },
    list: {
        backgroundColor: '#FFF'
    },
    separator: {
        borderWidth: 1,
        borderColor: "#F5F5F5"
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    }
});

// 导出这个模块，供外部调用
export default App;