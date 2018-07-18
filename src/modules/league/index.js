/**
 * Created by mawei on 2018/3/21.
 *
 * 网关路由配置
 */

import * as NetUrl from '../../api/NetUrl';
import HttpUtil from '../../utils/HttpUtil';
import DateUtils from '../../utils/DateUtils';
import React, {Component} from 'react';
import {Row, Col, Table, Button, Modal, Input, Icon} from 'antd';

export default class League extends Component {

    constructor(props) {
        super(props);

        this.state = {

            dataSource: [],
            pageTotal: 0,
            pageNo: 1,
            selectedRowKeys: [],
            loading: false
        };
        this.RO = {};
    }


    componentWillMount() {
        this._findList();
    }

    _findList(pageNo = 1) {
        if (this.loading) { // 防止重复加载
            return;
        }
        this.loading = true;
        this.setState({loading: this.loading});

        HttpUtil.get(NetUrl.URL_LEAGUE_LIST + "?pageNo=" + pageNo).then(json => {
            this.loading = false;
            this.setState({loading: this.loading});
            let data = json.data || {};
            let ds = data.list || [];
            if (ds.length > 0) {
                ds.map(item => {
                    item.key = item.unid;
                    item.createTime = DateUtils.format(item.createTime, "yyyy-MM-dd hh:mm");
                    item.modifyTime = DateUtils.format(item.modifyTime, "yyyy-MM-dd hh:mm");
                    return item;
                });
            }
            this.setState({dataSource: ds, pageTotal: data.total});
        }).catch(err => {
            this.loading = false;
            this.setState({loading: this.loading});
            console.log(err);
        });
    }


    _delete() {
        let _this = this;
        let ids = this.state.selectedRowKeys;
        if (ids.length === 0) {
            Modal.warning({
                title: '温馨提示',
                content: '您当前没有选中任何记录',
                okText: "确认",
            });
            return;
        }
        Modal.confirm({
            title: '温馨提示',
            content: '确定要删除当前选中的记录吗？',
            okText: "确认",
            cancelText: '取消',
            onOk() {
                HttpUtil.post(NetUrl.URL_LEAGUE_DELETE_BATCH, ids).then(json => {
                    _this._findList();
                    _this.setState({selectedRowKeys: []});
                }).catch(err => {
                    console.warn(err);
                    Modal.error({
                        title: '温馨提示',
                        content: err.message,
                    });
                });
            },
            onCancel() {
                //console.log('Cancel');
            },
        });
    }

    _onCreate() {
        this.props.history.push('/league-edit');
    }

    _onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    _onRowClick(record, index) {
        let path = {
            pathname:'/league-edit',
            query: {unid: record.unid},
        }
        this.props.history.push(path);
    }


    render() {
        const pagination = {
            total: this.state.pageTotal,
            size: 'large',
            //showTotal: (total, range) => `当前${range[0]}/${range[1]}条，共${total}条`,
            current: this.state.pageNo,
            onChange: (pageNo, pageSize) => {
                this.setState({pageNo});
                this._findList(pageNo);
            }
        };

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this._onSelectChange,
        };

        const columns = [{
            title: "名称",
            key: "name",
            dataIndex: 'name'
        }, {
            title: "Fabric版本",
            key: "version",
            dataIndex: "version",
        },   {
            title: "更新时间",
            key: "modifyTime",
            dataIndex: "modifyTime",
        }];

        return (
            <div style={{padding: '10px'}}>
                <Table
                    bordered
                    title={() => this._renderHeader()}
                    rowSelection={rowSelection}
                    onRow={(record, index) => ({
                        onClick: () => this._onRowClick(record, index)
                    })}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    loading={this.state.loading}
                    pagination={pagination}/>
            </div>
        );
    }

    _renderHeader() {
        return (
            <div>
                <Row>
                    <Col span={12} >
                        <Button onClick={this._onCreate.bind(this)} type="primary">新增</Button>
                        <Button onClick={this._delete.bind(this)} type="danger"style={{marginLeft: '20px'}}>删除</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}