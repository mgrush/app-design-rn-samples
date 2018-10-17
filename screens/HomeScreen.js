import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { 
  Modal, 
  Dialog, 
  Popup, 
  Popover,
  SlideUIAnimation
} from 'app-design-rn'

const CalendarManager = NativeModules.CalendarManager
const calendarManagerEmitter = new NativeEventEmitter(CalendarManager)

const subscription = calendarManagerEmitter.addListener(
  'EventReminder',
  (reminder) => console.log(reminder.name)
);

CalendarManager.addEvent('Birthday Party', {
  location: "4 Privet Drive, Surrey",
  time: new Date().getTime() 
})

CalendarManager.findEvents().then((abc) => console.warn(abc))

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

      dialogVisible: false,

      popupVisible: false
    }
  }

  render() {
    /**
    return (
      <View style={{backgroundColor: '#F6F6F6', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SlideUIAnimation 
          duration={300} 
          visible={true} 
          minOpacity={1}
          animateOnDidMount={true} 
          translateOffset={36} 
          translateDirection='left'>
          <View style={{padding: 36, backgroundColor: 'red'}} />
        </SlideUIAnimation>
      </View>
    )
    **/

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}>
        <ContentItem title='1. Modal基本弹窗'>
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


        <ContentItem title='2. Dialog确认弹窗'>
          <Button text='常用弹窗' onPress={this.showDialog}/>
          <Dialog
            title='开启通讯录访问权限'
            visible={this.state.dialogVisible}
            cancelButton={{
              onPress: this.hideDialog
            }}
            confirmButton={{
              onPress: this.hideDialog
            }}>
            <Text>为了更好的为您服务，我们需要您开启应用的通讯录访问权限</Text>
          </Dialog>
        </ContentItem>

        <ContentItem title='3. Popup底部弹窗'>
          <Button text='底部弹窗' onPress={this.showPopup}/>
          <Popup
            title='请设置标题'
            visible={this.state.popupVisible}
            onClose={this.hidePopup}
            cancelButton={{
              onPress: this.hidePopup
            }}
            confirmButton={{
              onPress: this.hidePopup
            }}>
            <View style={{paddingVertical: 42, alignItems: 'center'}}>
              <Text>这里设置底部弹窗的显示内容</Text>
            </View>
          </Popup>
        </ContentItem>

        <ContentItem title='4. Popover悬浮弹窗'>
          <Popover
            position='right'
            itemList={[{
              name: '扫一扫'
            }, {
              name: '帮助'
            }]}
            renderItem={this.renderPopoverItem}
            contentContainerStyle={{padding: 6}}
            onPress={this.onPopoverItemPress}>
            <View style={[styles.button, styles.buttonNoMargin]}>
              <Text style={styles.buttonText}>Right</Text>
            </View>    
          </Popover>

          <Popover
            position='top'
            itemList={[{
              name: '扫一扫'
            }, {
              name: '帮助'
            }]}
            renderItem={this.renderPopoverItem}
            contentContainerStyle={{padding: 6}}
            onPress={this.onPopoverItemPress}>
            <View style={[styles.button, styles.buttonNoMargin]}>
              <Text style={styles.buttonText}>Top</Text>
            </View>    
          </Popover>

          <Popover
            position='bottom'
            itemList={[{
              name: '扫一扫'
            }, {
              name: '帮助'
            }]}
            renderItem={this.renderPopoverItem}
            contentContainerStyle={{padding: 6}}
            onPress={this.onPopoverItemPress}>
            <View style={[styles.button, styles.buttonNoMargin]}>
              <Text style={styles.buttonText}>Bottom</Text>
            </View>    
          </Popover>

          <Popover
            position='left'
            itemList={[{
              name: '扫一扫'
            }, {
              name: '帮助'
            }]}
            renderItem={this.renderPopoverItem}
            contentContainerStyle={{padding: 6}}
            onPress={this.onPopoverItemPress}>
            <View style={[styles.button, styles.buttonNoMargin]}>
              <Text style={styles.buttonText}>Left</Text>
            </View>
          </Popover>
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

  showDialog = () => {
    this.setState({
      dialogVisible: true    
    })
  }

  hideDialog = () => {
    this.setState({
      dialogVisible: false
    })
  }

  showPopup = () => {
    this.setState({
      popupVisible: true    
    })
  }

  hidePopup = () => {
    this.setState({
      popupVisible: false
    })
  }

  showPopoverBottom = () => {
    this.setState({
      popoverBottomVisible: true    
    })
  }

  hidePopoverBottom = () => {
    this.setState({
      popoverBottomVisible: false
    })
  }

  renderPopoverItem = (item) => {
    return (
      <Text>{item.name}</Text>    
    )
  }

  onPopoverItemPress = (item) => {
    console.warn('您点击了：' + item.name)
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

  buttonNoMargin: {
    margin: 0                
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16
  }
});
