/**
 * Created by mawei on 2017/9/13.
 * 主页
 */
import Tenancy from "./modules/tenancy/index";
import User from "./modules/user/index";
import League from "./modules/league/index";
import LeagueEdit from "./modules/league/LeagueEdit";

import './css/Index.css';
// import * as NetUrl from './api/NetUrl';
// import HttpUtil from './utils/HttpUtil';
import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Switch, Route, BrowserRouter,Link } from 'react-router-dom'
const { Header, Content, Sider } = Layout;


const menus = [
    {key: "league", title: "联盟", icon: 'usb', component: League},
    {key: "user", title: "统一用户", icon: 'user', component: User},
    {key: "tenancy", title: "租户管理", icon: 'rocket', component: Tenancy},
];

const routerChildren = (
    <div>
        <Switch>
            <Route exact path="/" component={menus[0].component} />
            {
                menus.map(item => (
                    <Route path={"/" + item.key} component={item.component} key={item.key}/>
                ))
            }

            <Route path="/league-edit" component={LeagueEdit}/>
        </Switch>
    </div>
);

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            key : menus[0].key,
            title : menus[0].title,
            user: {},
            contentHeight: document.body.clientHeight - 64, // 64=顶部导航高度
        };
        this._onWindowResize = this._onWindowResize.bind(this);
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    menuClick(item) {
        let _this = this;
        menus.forEach(menu => {
            //console.log(menu.component)
            if (item.key === menu.key){
                _this.setState({ title : menu.title, key : menu.key });
                return;
            }
        });
    }


    logout() {
        sessionStorage.removeItem("accessToken");
        this.props.history.replace("/login");
    }

    componentWillMount() {
        // let accessToken = sessionStorage.getItem("accessToken");
        // if (accessToken) {
        //     HttpUtil.get(NetUrl.URL_CHECK_LOGIN + accessToken).then(json => {
        //         this.setState({user: json});
        //     }).catch(err => {
        //         this.props.history.push("/login");
        //     });
        // } else {
        //     this.props.history.push("/login");
        // }
    }

    componentDidMount() {
        window.addEventListener('resize', this._onWindowResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._onWindowResize);
    }

    _onWindowResize() {
        this.setState({contentHeight: document.body.clientHeight - 64}); // 64=顶部导航高度
    }

    render() {
        return (
            <BrowserRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" >
                            <Icon type="windows" />
                            {
                                this.state.collapsed ? '' : <span style={{marginLeft:'12px'}}>Fabric</span>
                            }
                        </div>
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={[menus[0].key]}
                            mode="inline"
                            onClick={this.menuClick.bind(this)}
                        >
                            {
                                menus.map(item =>
                                    (
                                        <Menu.Item key={item.key} style={{fontSize:'14px'}}>
                                            <Icon type={item.icon} /><span>{item.title}</span>
                                            <Link to={item.key}/>
                                        </Menu.Item>
                                    )
                                )
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#EBECEB', padding: 0 }} >
                            <div className="heard-left">
                                <Icon type="environment-o" />
                                <span style={{marginLeft:'10px'}}>{this.state.title}</span>
                            </div>

                            <div className="heard-right">
                                <span style={{marginRight:'13px'}}>{this.state.user.name}</span>
                                <span className="logout" onClick={this.logout.bind(this)}>
                                    <Icon type="logout" style={{marginRight:'7px'}}/>
                                    退出
                                </span>
                            </div>
                        </Header>
                        <Content style={{background: '#fff', height:'100%'}}>
                            <div style={{ minHeight: this.state.contentHeight + 'px'}}>
                                {routerChildren}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}