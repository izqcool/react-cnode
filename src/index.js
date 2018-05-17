import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {App} from './container';


// console.log(process.env.NODE_ENV);

const vDomTree = (
    <Router>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>

);

document.addEventListener('DOMContentLoaded',function() {
    const container = document.getElementById('app');
    if(container) {
        ReactDom.render(vDomTree,container);
    }else {
        console.warn('cannot find the container');
    }
});