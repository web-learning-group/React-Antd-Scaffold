import React from 'react';
import {render} from 'react-dom';

// 引入Antd组件
import {Button} from 'antd';
import 'antd/lib/button/style/css'

class User extends React.Component{
    render(){
        return(
            <Button>Settings</Button>
        )
    }
}

export default User;
