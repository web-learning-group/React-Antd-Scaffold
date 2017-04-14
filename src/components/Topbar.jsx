import React from 'react';
import ReactDOM from 'react-dom';

// 引入Antd组件
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/dropdown/style/css'

const menu = (
    <Menu>
        <Menu.Item>
            <a>Exit</a>
        </Menu.Item>
    </Menu>
);

const styleTopbar = {
    textAlign: 'right',
    borderBottom: "1px solid #e9e9e9",
    paddingRight: "20px",
    height: '50px',
    lineHeight: '50px',
    fontSize: '15px'
};

export default class Topbar extends React.Component{
    render(){
        return(
            <div style={styleTopbar}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">Chris, Paul<Icon type="down" /></a>
                </Dropdown>
            </div>
        )
    }
}