import React from 'react'
import { Input, Card, Icon, Col, Button } from 'antd'

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      airportEntry: ""
    }
  };

  handleChange(e) {
    this.state.airportEntry = e.target.value;
  }

  handleValue() {
    const value = this.state.airportEntry;
    //console.log(value);
    //value = value.replace(/[^0-9|a-z|\@|\.]/ig,"");
    this.props.handleAirportEntry(value);
  }

  render() {
    return(
        <Card style={{marginTop: 20, height: 150}}>
          <h1 style={{marginLeft: 10}}>Search</h1>
          <Col span="20">
          <Input
            style={{margin: 10}}
            placeholder="Airport ICAO Number"
            onChange={this.handleChange.bind(this)}
            onPressEnter={this.handleValue.bind(this)}
            prefix={<Icon type="cloud" />}
            ref="airportInput"
            />
          </Col>
          <Col span="2">
            <Button onClick={this.handleValue.bind(this)} icon="search" style={{margin: 10}} type="primary"></Button>
          </Col>
        </Card>
    )
  }
}

export default Search
