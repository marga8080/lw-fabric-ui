/**
 * Created by mawei on 2017/9/14.
 * 登录
 */

import BrowserUtil from './utils/BrowserUtil';
import * as NetUrl from './api/NetUrl';
import HttpUtil from './utils/HttpUtil';
import './css/Login.css';
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Alert, Modal} from 'antd';

const FormItem = Form.Item;
const bcrypt = require('bcryptjs');

const ietip = (
    <div style={{fontWeight:'bold'}}>
        温馨提示:您当前使用的是IE浏览器，如果无法登录，请打开IE的"工具"菜单选择"Internet选项"，单击"隐私"标签，把"选择Internet区域设置"调低（默认是中上）
    </div>
);


class LoginForm extends Component {


    constructor(props) {
        super(props);

        this.state = {flag: false, submiting: false};
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        // let _this = this;
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         // console.log('Received values of form: ', values);
        //         // const headersMap = new Map([
        //         //     ['Authorization', 'Basic Y2xpZW50MTpzZWNyZXQ=']
        //         // ]);
        //         this.setState({submiting: true});
        //         HttpUtil.get(NetUrl.URL_STN, {userName: values.username}).then(json => {
        //             this.timestamp = json.data.timeStamp;
        //             this.nonce = json.data.nonce;
        //             try {
        //                 // 密码加密
        //                 let password = _this._encrypt(values.password, json.data.salt);
        //                 values.password = password;
        //             } catch (e) {
        //                 _this.setState({submiting: false});
        //                 Modal.error({
        //                     title: '温馨提示',
        //                     content: e.message,
        //                 });
        //                 return;
        //             }
        //             // 登录
        //             let url = NetUrl.URL_LOGIN2;// + "?grant_type=password";
        //             //url = HttpUtil.urlAppendQeury(url, values);
        //
        //             HttpUtil.post(url, values).then(json => {
        //                 let data = json.data || {};
        //                 sessionStorage.setItem("accessToken", data.access_token);
        //                 //console.log(data);
        //                 //AppData.setUserInfo(data);
        //                 _this.setState({submiting: false});
        //                 _this.props.history.push("/");
        //             }).catch(err => {
        //                 _this.setState({submiting: false});
        //                 console.warn(err);
        //                 Modal.error({
        //                     title: '温馨提示',
        //                     content: err.message,
        //                 });
        //             });
        //
        //         }).catch(err => {
        //             _this.setState({submiting: false});
        //             console.warn(err);
        //             Modal.error({
        //                 title: '温馨提示',
        //                 content: err.message,
        //             });
        //         })
        //     }
        // });
    }

    _encrypt(password, salt) {
        if (!this.timestamp || !this.nonce || !salt) {
            throw new Error("salt、timestamp和nonce不能为空，请刷新页面试试");
        }
        // 慢加密
        let hash = bcrypt.hashSync(password, salt);
        // rsa加密
        let rsa = new window.JSEncrypt();
        let pubKey = sessionStorage.getItem("pubKey");
        if (!pubKey) {
            throw new Error("获取不到公钥，请刷新页面试试");
        }
        rsa.setPublicKey(pubKey);
        //hash_pass,timestamp,nonce
        let hsn = hash + "," + this.timestamp + "," + this.nonce;
        return rsa.encrypt(hsn);
    }

    componentWillMount() {
        // let accessToken = sessionStorage.getItem("accessToken");
        // if (accessToken) {
        //     HttpUtil.get(NetUrl.URL_CHECK_LOGIN + accessToken).then(json => {
        //         this.props.history.push("/");
        //     }).catch(err => {
        //         console.log(err)
        //         //alert(err);
        //     });
        // }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-bg">
                {
                    BrowserUtil.getIEVersion() > 9 ? ( <Alert message={ietip}   type="warning" closable showIcon/>) : null
                }
                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="tit">平台管理</div>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 14}}/>} placeholder="用户名"  className="login-form-input"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 14}}/>} type="password" placeholder="密码"  className="login-form-input"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {/*{getFieldDecorator('rememberMe', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}*/}
                        <Button type="primary" htmlType="submit" loading={this.state.submiting} className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

}

const Login = Form.create()(LoginForm);

export default Login;