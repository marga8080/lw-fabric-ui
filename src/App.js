import * as NetUrl from './api/NetUrl';
import HttpUtil from './utils/HttpUtil';
import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Index from './Home';
import Login from './Login';

class App extends Component {
    componentWillMount() {
        // HttpUtil.get(NetUrl.URL_PUBLIC_KEY).then(json => {
        //     sessionStorage.setItem("pubKey", json.data);
        // }).catch(err => {
        //     console.warn(err)
        // })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/login" component={Login}/>
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
