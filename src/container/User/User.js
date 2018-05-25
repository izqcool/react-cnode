import React from 'react';
import {Http,Loading,UserHeader} from '../../components';
import * as styles from './User.scss';

const http = new Http();

export class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.getUserInfo = this.getUserInfo.bind(this);
    };

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        const {match} = this.props;
        const name = match.params.username;
        http.get(`/user/${name}`).then((res) => {
            console.log(res);
            this.setState({
                data: res.data,
                dataLoaded: true
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const {dataLoaded,data} = this.state;
        if(dataLoaded) {
            return (
                <div className={styles.user}>
                    <UserHeader/>
                </div>
            )
        }else {
            return (
                <Loading/>
            )
        }
    }

}
