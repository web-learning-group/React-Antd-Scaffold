import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import './css/main.css'

class Init extends React.Component{
    render(){
        return(
            <div>
                <Sidebar/>
                <div id="mainContent">
                    <Topbar/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Init;
