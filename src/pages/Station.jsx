import React from 'react';
import $ from 'jquery'
import GoogleMap from 'google-map-react'
import {Card, Col, Row} from 'antd';

class Station extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            icao: "",
            iata: "",
            name: "",
            type: "",
            city: "",
            state: "",
            country: "",
            latitude:"",
            longitude: "",
            elevation: "",
            center: {
              lat: 80.080101,
              lng: 116.584999
            },
            zoom: 13
        }
    }

    // static defaultProps = {
    //     center: {
    //       // lat: 1, //Cannot read property 'state' of undefined
    //       // lng: this.state.longitude
    //       lat: 80.080101, lng: 116.584999
    //     },
    //     zoom: 13
    // };


    reqStation(){
        $.ajax({
            type: "GET",
            url: "https://api.checkwx.com/station/ZBAA",
            beforeSend: function (request) {
                request.setRequestHeader("X-API-Key", "58bb294229f3e")
            },
            success: function(result){
                this.setState({
                    icao: result.data[0].icao,
                    iata: result.data[0].iata,
                    name: result.data[0].name,
                    type: result.data[0].type,
                    city: result.data[0].city,
                    state: result.data[0].state,
                    country: result.data[0].country,
                    latitude:result.data[0].latitude,
                    longitude: result.data[0].longitude,
                    elevation: result.data[0].elevation,
                    center: {
                        lat: result.data[0].latitude,
                        lng: result.data[0].longitude
                    }
                })
            }.bind(this)
        });
    }

    componentWillMount(){
        this.reqStation();
    }

    render(){
        return(
            <div>
                <Row>
                    <Card style={{margin: 20}}>
                      <h1>{this.state.icao}</h1>
                      <h2>{this.state.name}</h2>
                      <h3>{this.state.city}, {this.state.country}</h3>
                    </Card>
                </Row>
                <Row>
                    <Col span={12} style={{padding: 20}}>
                        <Card title="Airport Information" style={{height: 460}}>
                            <p>Latitude: {this.state.latitude}</p>
                            <p>Longitude: {this.state.longitude}</p>
                            <p>Elevation: {this.state.elevation}</p>
                        </Card>
                    </Col>
                    {/*Make sure the container element has width and height. The map will try to fill the parent container, but if the container has no size, the map will collapse to 0 width / height.*/}
                    <Col span={12} style={{padding: 20, height: 500}}>
                          <GoogleMap
                              bootstrapURLKeys={{
                                key: "AIzaSyCVV8sIU0v8jw5Sdy-VU2Pj1pGZ6WjE7fw"
                            }}
                            center = {this.state.center}
                            defaultZoom = {this.state.zoom}
                            />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Station;
