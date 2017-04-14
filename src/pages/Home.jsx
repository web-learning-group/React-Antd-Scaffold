import React from 'react';
import {Card, Col, Row} from 'antd';
import '../css/home.css'

class Home extends React.Component{
    render(){
        return(
            <div style={{background: '#ECECEC', padding: "30px"}}>
                <Row>
                    <Col span={8}>
                        <Card title="IBM" bordered={false}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="M$" bordered={false}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Apple" bordered={false}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card></Col>
                </Row>
            </div>
        )
    }
}

export default Home;
