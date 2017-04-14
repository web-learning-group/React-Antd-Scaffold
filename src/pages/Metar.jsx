import React from 'react';
import $ from 'jquery'
import {Card, Table, Col, Row} from 'antd';
import {Input, Icon, notification} from 'antd'
import AirportInfo from './AirportInfo.jsx'
import '../css/style.css'

class Metar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            metar: "",
            icao:"",
            name: "",
            city: "",
            country: "",
            observed: "",
            flight_category:"",
            wind:"",
            visibility:"",
            clouds:"",
            temp:"",
            dewpoint:"",
            humidity:"",
            barometer: "",
            elevation: "",
            airportEntry: "ZBAA"
        }
    }

    // const openNotification = () => {
    //     notification.open({
    //       message: "ICAO number is wrong",
    //       description: "Please enter a valid ICAO number."
    //     })
    // }

    reqMetar(){

        $.ajax({
            type: "GET",
            url: "https://api.checkwx.com/station/" + this.state.airportEntry,
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
            url: "https://api.checkwx.com/metar/" + this.state.airportEntry + "/decoded",
            beforeSend: function (request) {
                request.setRequestHeader("X-API-Key", "58bb294229f3e")
            },
            success: function (result) {
                this.setState({
                    metar: result.data[0].raw_text,
                    observed: result.data[0].observed,
                    flight_category:result.data[0].flight_category,
                    wind: result.data[0].wind_degrees + '° at ' + result.data[0].wind_speed_kt + ' knots',
                    visibility:result.data[0].visibility + ' ' + result.data[0].visibility_type,
                    clouds: result.data[0].clouds[0].cloud_text,
                    temp: "Current " + result.data[0].temp_c + '°C / ' + result.data[0].temp_f + '°F',
                    dewpoint:"Dewpoint " + result.data[0].dewpoint_c + '°C / ' + result.data[0].dewpoint_f + '°F',
                    humidity:"Humidity " + result.data[0].humidity + '%',
                    barometer: "Barometer " + result.data[0].barometer_mb + 'hPa / ' + result.data[0].barometer_hg + 'Hg',
                    elevation: "Elevation " + result.data[0].elevation_m + 'm / ' + result.data[0].elevation_ft + 'ft'
                })
            }.bind(this)
        })
    }

    componentDidMount(){
        this.reqMetar();
    }

    onChangeAirport(e){
        this.setState({
          airportEntry: e.target.value
        })
    }

    onEnterAirport(){
          this.reqMetar()
    }

    emitEmpty(){
        this.setState({
          airportEntry: ""
        })
        this.refs.airportInput.focus();
    }

    render(){
        const columns1 = [{
            title: 'Observed',
            dataIndex: 'observed'
        },{
            title: 'Flight Rules',
            dataIndex: 'flight_rules'
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
        }];
        const columns3 = [{
            title: 'Temperatures',
            dataIndex: 'temperature'
        },{
            title: 'Others',
            dataIndex: 'others'
        }];

        const data1 = [{
            observed: this.state.observed,
            flight_rules: this.state.flight_category
        }];
        const data2 = [{
            wind: this.state.wind,
            visibility: this.state.visibility,
            clouds: this.state.clouds
        }];
        const data3 = [{
            temperature: this.state.temp,
            others: this.state.barometer
        },{
            temperature: this.state.dewpoint,
            others: this.state.elevation
        },{
            temperature: this.state.humidity,
            others: "reserved"
        }]
        const suffix = this.state.airportEntry ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;

        return(
            <div>
              <Row>
                <Col span="8">
                  <Card style={{marginTop: 20, height: 150}}>
                    <h1>Search</h1>
                    <Input
                      style={{margin: 10}}
                      placeholder="Airport ICAO Number"
                      prefix={<Icon type="cloud" />}
                      suffix={suffix}
                      value={this.state.airportEntry}
                      onChange={this.onChangeAirport.bind(this)}
                      onKeyDown={this.onEnterAirport.bind(this)}
                      ref="airportInput"
                      />
                  </Card>
                </Col>

                <Col span="16">
                    <AirportInfo
                        icao={this.state.icao}
                        name={this.state.name}
                        city={this.state.city}
                        country={this.state.country}
                        wx = {this.state.metar}
                        />
                </Col>
              </Row>

                <Card style={{margin: 20}}>
                    <Table pagination={false} dataSource={data1} columns={columns1}></Table>
                    <Table pagination={false} dataSource={data2} columns={columns2}></Table>
                    <Table pagination={false} dataSource={data3} columns={columns3}></Table>
                </Card>
            </div>
        )
    }
}

export default Metar;
