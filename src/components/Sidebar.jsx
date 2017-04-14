import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router'

// 引入Antd组件
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'

const SubMenu = Menu.SubMenu;

export default class Sidebar extends React.Component {
    handleClick(event){
        console.log(event.key);
        if (event.key==='home'){
            browserHistory.push('/')
        }else if(event.key === 'user'){
            browserHistory.push('/user')
        }else if(event.key === 'settings'){
            browserHistory.push('/settings')
        }else if(event.key === 'list'){
            browserHistory.push('/list')
        }else if(event.key === 'metar'){
            browserHistory.push('/metar')
        }else if(event.key === 'station'){
            browserHistory.push('/station')
        }else if(event.key === 'taf'){
            browserHistory.push('/taf')
        }
    }
    render() {
        return (
            <div id="sidebar">
                <Menu
                    onClick={this.handleClick}
                    /*sytle={{width: 200}}//坑！此时width不是200而是100%*/
                    style={{ width: 240 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2']}
                    mode="inline"
                >
                    <Menu.Item key="home"><Icon type="home"/>Home</Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="list">Mock data</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Aviation Information</span></span>}>
                        <Menu.Item key="station">Station</Menu.Item>
                        <Menu.Item key="metar">METAR</Menu.Item>
                        <Menu.Item key="taf">TAF</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="user"><Icon type="user"/>User center</Menu.Item>
                    <Menu.Item key="settings"><Icon type="setting"/>Settings</Menu.Item>
                </Menu>
                <div id="copyright">Copyright @xxx</div>
            </div>
        );
    }
}