import React from 'react';
import {Http} from '../../components';
const http = new Http();
export class Home extends React.Component {


    componentDidMount() {
        http.get('/topics',{
            params: {
                tab:'all'
            }
        }).then((res)=> {
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                this is home page
            </div>
        )
    }
}