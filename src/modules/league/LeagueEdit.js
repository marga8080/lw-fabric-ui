/**
 * Created by mawei on 2018/7/17.
 * 联盟配置
 */
import * as NetUrl from '../../api/NetUrl';
import HttpUtil from '../../utils/HttpUtil';
import React, {Component} from 'react';
import {Form, Button, Input, Radio, Switch, Modal, Spin} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class LeagueEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            league : {},
            submiting: false,
        }
        let params = this.props.location.query;
        if (params) {
            this.unid = params.unid;
        }
    }

    componentDidMount() {
        if (this.unid) {
            let _this = this;
            if (this.loading) { // 防止重复加载
                return;
            }
            this.loading = true;
            this.setState({loading: true});
            HttpUtil.get(NetUrl.URL_LEAGUE, {unid: this.unid}).then(json => {
                _this.loading = false;
                _this.setState({loading: false});
                let league = json.data || {};
                _this.setState({league});
            }).catch(err => {
                _this.loading = false;
                _this.setState({loading: false});
                console.warn(err);
                Modal.error({
                    title: '温馨提示',
                    content: err.message,
                });
            });
        }
    }

    _back() {
        this.props.history.push('/league');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        if (this.submiting) {
            // 提交当中 避免多次提交
            return;
        }
        this.submiting = true;
        this.setState({submiting: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log(values);
                if (_this.unid) {
                    _this._update(values);
                } else {
                    _this._save(values);
                }
            } else {
                this.submiting = false;
                this.setState({submiting: false});
            }
        });
    }

    _save(values) {
        let _this = this;
        HttpUtil.post(NetUrl.URL_LEAGUE, values).then(json => {
            _this.submiting = false;
            _this.setState({submiting: false});
            this.props.history.push('/league');
        }).catch(err => {
            _this.submiting = false;
            _this.setState({submiting: false});
            console.warn(err);
            Modal.error({
                title: '温馨提示',
                content: err.message,
            });
        });
    }

    _update(values) {
        let _this = this;
        values.unid = this.unid;
        HttpUtil.put(NetUrl.URL_LEAGUE, values).then(json => {
            _this.submiting = false;
            _this.setState({submiting: false});
            this.props.history.push('/league');
        }).catch(err => {
            _this.submiting = false;
            _this.setState({submiting: false});
            console.warn(err);
            Modal.error({
                title: '温馨提示',
                content: err.message,
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 12},
        };
        let league = this.state.league;
        return (
            <div>
                <div style={{padding: '20px 20px 10px 30px', fontSize: '18px'}}>
                    {
                        this.unid ? '编辑联盟' : '新增联盟'
                    }
                </div>
                <div style={{padding: '0 20px 20px'}}>
                    <div className="separation-line"/>
                </div>
                <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="名称" >
                        {getFieldDecorator('name', {
                            initialValue: league.name,
                            rules: [{required: true, message: '请输入名称!'}],
                        })(
                            <Input placeholder="名称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Fabric版本" >
                        {getFieldDecorator('version', {
                            initialValue: league.version,
                            rules: [{required: true, message: 'Fabric版本!'}],
                        })(
                            <Input placeholder="Fabric版本"/>
                        )}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit" loading={this.state.submiting} style={{marginLeft: '90px'}}>保存</Button>
                        <Button onClick={this._back.bind(this)} style={{marginLeft: '20px'}}>取消</Button>
                    </FormItem>
                </Form>
                </Spin>
            </div>
        )
    }
}

const LeagueEdit = Form.create()(LeagueEditForm);
export default LeagueEdit;