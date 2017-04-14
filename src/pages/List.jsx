import React from 'react';
import Mock from 'mockjs'
import $ from 'jquery'
import { Table, Tooltip, Icon} from 'antd';

// 引入Mock
let debug = 1;
if (debug) {
    Mock.mock(/mockData/,{
        "data|121-140": [{
            "key|+1":1,
            "name":"@name",
            "sex|1":["男","女"],
            "age":"@integer(22, 60)",
            "email":"@email"
        }]
    })
}

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataList: []
        }
    }

    componentDidMount(){
        $.ajax({
            url: 'mockData'
        }).done(function(res){
            let data = JSON.parse(res);
            this.setState({
                dataList: data.data
            })
        }.bind(this))
    }

    render(){
        // 设置列
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            render: (text) => ( <a href={text} target="_blank">{text}</a> )
        }, {
            title: '操作',
            dataIndex: 'handle',
            key: 'handle',
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
            render:
                (t,r,i) => (
                    <span>
                    <Tooltip title="编辑"><Icon type="edit" style={{color:'#3dbd7d'}} /></Tooltip>&nbsp;&nbsp;
                        <Tooltip title="切换性别"><Icon type="retweet" style={{color:'#49a9ee'}} /></Tooltip>&nbsp;&nbsp;
                        <Tooltip title="删除"><Icon type="delete" style={{color:'#FD5B5B'}}/></Tooltip>
                </span>
                )
        }];

        // 设置分页
        const pagination = {
            size:"default",
            showQuickJumper:true,
            total: this.state.dataList.length,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: (current) => {
                console.log('Current: ', current);
            },
        };

        return(
            <Table
                columns={columns}
                dataSource={this.state.dataList}
                pagination={pagination}
            />
        )
    }
}

export default List;
