import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Modal, Dialog, Popup, Popover } from 'rn-ui'

class Button extends React.Component {
  render(){
    const {
      text,
      onPress
    } = this.props
    
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>    
    )
  }
}

class ContentItem extends React.Component {
  render(){
    const {
      title
    } = this.props

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页'
  };

  constructor(props){
    super(props)

    this.state = {
      // Modal相关配置
      modalAlignCenterVisible: false,
      modalAlignTopVisible: false,
      modalAlignEndVisible: false,
    }
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}>
        <ContentItem title='1. Modal弹窗'>
          <Button text='居中显示' onPress={this.showModalAlignCenter} />
          <Modal 
            visible={this.state.modalAlignCenterVisible}
            onClose={this.hideModalAlignCenter}
            contentContainerStyle={{
              padding: 16
            }}>
            <Text>居中显示的Modal弹窗</Text>
          </Modal>

          <Button text='顶部显示' onPress={this.showModalAlignTop} />
          <Modal 
            alignContent='flex-start'
            visible={this.state.modalAlignTopVisible}
            onClose={this.hideModalAlignTop}
            contentContainerStyle={{
              flex: 1,
              padding: 16,
              borderRadius: 0,
              paddingVertical: 80
            }}>
            <Text>顶部显示的Modal弹窗</Text>
          </Modal>

          <Button text='底部显示' onPress={this.showModalAlignEnd} />
          <Modal 
            alignContent='flex-end'
            visible={this.state.modalAlignEndVisible}
            onClose={this.hideModalAlignEnd}
            contentContainerStyle={{
              flex: 1,
              padding: 16,
              borderRadius: 0,
              paddingVertical: 80
            }}>
            <Text>底部显示的Modal弹窗</Text>
          </Modal>
        </ContentItem>




      </ScrollView>
    )
  }

  showModalAlignCenter = () => {
    this.setState({
      modalAlignCenterVisible: true    
    })
  }

  hideModalAlignCenter = () => {
    this.setState({
      modalAlignCenterVisible: false
    })
  }

  showModalAlignTop = () => {
    this.setState({
      modalAlignTopVisible: true    
    })
  }

  hideModalAlignTop = () => {
    this.setState({
      modalAlignTopVisible: false
    })
  }

  showModalAlignEnd = () => {
    this.setState({
      modalAlignEndVisible: true    
    })
  }

  hideModalAlignEnd = () => {
    this.setState({
      modalAlignEndVisible: false
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  header: {
    height: 42,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderColor: '#F2F2F2',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  content: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6'
  },

  button: {
    margin: 6,
    borderRadius: 6,
    backgroundColor: 'blue',
    height: 42,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16
  }
});
