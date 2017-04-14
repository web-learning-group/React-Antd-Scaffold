import React from 'react';
import {Card} from 'antd';

export default class AirportInfo extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card style={{marginTop: 20, height: 150}}>
              <h2>{this.props.icao}</h2>
              <h3>{this.props.name}</h3>
              <h4>{this.props.city}, {this.props.country}</h4>
              <br/>
              <p style={{fontSize: 15}}>{this.props.wx}</p>
            </Card>
        )
    }
}
