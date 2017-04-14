import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery'

// 引入Antd组件
// import {Card, Col, Row} from 'antd';
// import 'antd/lib/Card/style/css'
// import 'antd/lib/Col/style/css'
// import 'antd/lib/Row/style/css'
// import '../css/home.css'

class Taf extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            taf: ""
        }
    }

    reqTaf(){
        $.ajax({
            type: "GET",
            url: "https://api.checkwx.com/taf/ZBAA",
            beforeSend: function (request) {
                request.setRequestHeader("X-API-Key", "58bb294229f3e")
            },
            success: function(result){
                this.setState({
                    taf: result.data[0]
                })
            }.bind(this)
        });
    }

    componentDidMount(){
        this.reqTaf();
    }

    render(){
        return(
            <div>
                {this.state.taf}
            </div>
        )
    }
}

export default Taf;
