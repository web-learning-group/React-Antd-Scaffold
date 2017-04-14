import React from 'react';
import $ from 'jquery'
import {Card, Table, Col, Row} from 'antd';
import AirportInfo from './AirportInfo.jsx'
import '../css/style.css'

class Taf extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            taf: "",
            icao: "",
            name: "",
            city: "",
            country: "",
            issue_time: "",
            valid_time_from: "",
            valid_time_to: "",
            wind: "",
            visibility: "",
            cloud_text: "",
            cond_text: ""
        }
    }

    reqTaf(){
        $.ajax({
            type: "GET",
            url: "https://api.checkwx.com/station/ZBAA",
            beforeSend: function (request) {
                request.setRequestHeader("X-API-Key", "58bb294229f3e")
            },
            success: function(result){
                this.setState({
                    icao: result.data[0].icao,
                    name: result.data[0].name,
                    city: result.data[0].city,
                    country: result.data[0].country
                })
            }.bind(this)
        });

        $.ajax({
            type: "GET",
            url: "https://api.checkwx.com/taf/ZBAA/decoded",
            beforeSend: function (request) {
                request.setRequestHeader("X-API-Key", "58bb294229f3e")
            },
            success: function(result){
                this.setState({
                    taf: result.data[0].raw_text,
                    issue_time: result.data[0].issue_time,
                    valid_time_from: result.data[0].valid_time_from,
                    valid_time_to: result.data[0].valid_time_to,
                    wind: result.data[0].forecast.wind_degrees
                                  + '° at '
                                  + result.data[0].forecast.wind_speed_kt
                                  + ' knots',
                    visibility: result.data[0].forecast.visibility + ' ' + result.data[0].forecast.visibility_type,
                    cloud_text: result.data[0].forecast[0].clouds[0].cloud_text,
                    cond_text: result.data[0].forecast[0].conditions[0].cond_text
                })
            }.bind(this)
        });

    }

    componentWillMount(){
        this.reqTaf();
    }

    render(){
      const columns1 = [{
          title: 'Issued',
          dataIndex: 'issued'
      },{
          title: 'Valid From',
          dataIndex: 'valid_from'
      },{
          title: 'Valid To',
          dataIndex: 'valid_to'
      }];
      const columns2 = [{
          title: 'Wind',
          dataIndex: 'wind'
      },{
          title: 'Visibility',
          dataIndex: 'visibility'
      },{
          title: 'Clouds',
          dataIndex: 'clouds'
      },{
          title: 'Conditions',
          dataIndex: 'conditions'
      }];

      const data1 = [{
          issued: this.state.issue_time,
          valid_from: this.state.valid_time_from,
          valid_to: this.state.valid_time_to
      }];
      const data2 = [{
          wind: this.state.wind,
          visibility: this.state.visibility,
          clouds: this.state.cloud_text,
          conditions: this.state.cond_text
      }];

        return(
            <div>
                <Row>
                    <Col span="8">
                    </Col>
                    <Col span="16">
                        <AirportInfo
                            icao={this.state.icao}
                            name={this.state.name}
                            city={this.state.city}
                            country={this.state.country}
                            wx = {this.state.taf}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col>
                    <Card>
                        <Table pagination={false} dataSource={data1} columns={columns1}></Table>
                        <Table pagination={false} dataSource={data2} columns={columns2}></Table>
                    </Card>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

export default Taf;
