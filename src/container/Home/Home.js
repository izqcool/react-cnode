import React from 'react';
import {Http,ArticleTitle} from '../../components';
const http = new Http();
export class Home extends React.Component {


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ArticleTitle/>
            </div>
        )
    }
}