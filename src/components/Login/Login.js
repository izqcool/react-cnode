import React from 'react';
import PropTypes from 'prop-types';
import {Storage} from '../../classes';
import {Http} from '../../components';
import * as styles from './Login.scss';

const http = new Http();

export class Login extends React.Component {

    static propTypes = {
        onCancel: PropTypes.func.isRequired,
    };
    //
    static defaultProps = {
        onCancel: () => {

        }
    };

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount() {
        console.log(this.inputRef.current.value);
    }

    onCancel() {
        this.props.onCancel();
    }

    onConfirm() {
        const accessToken = this.inputRef.current.value;
        console.log(accessToken);
        http.post(`/accesstoken`,{
            params: {
                "accesstoken": accessToken
            }
        }).then((res)=>{
            Storage.put('loginUser',res);
            this.props.onCancel();
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div className={styles.login}>
                <div className={styles.close}>
                    <i className="fa fa-times" aria-hidden="true" onClick={this.onCancel}></i>
                </div>
                <div className={styles.content}>
                    {/*请输入Access Token*/}
                    <input type="text" placeholder="6d493a82-127f-4f68-b99e-7bd6c4a6aae0" defaultValue="6d493a82-127f-4f68-b99e-7bd6c4a6aae0"  ref={this.inputRef}/>
                    <button onClick={this.onConfirm}>登 录</button>
                </div>
            </div>
        )
    }
}