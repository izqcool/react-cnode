import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './ToolButton.scss';

const iconClassMap = {

};

export class ToolButton extends React.Component {

    static propTypes = {
        onButtonClick: PropTypes.func.isRequired,
        isLogin : PropTypes.bool.isRequired,
        type : PropTypes.string.isRequired,
        loginUrl : PropTypes.string.isRequired
    };
    static defaultProps = {
        isLogin: false,
        onButtonClick: ()=>{

        },
        loginUrl: '',
        type: 'goBack',
        isAvatar: false,
    };

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }



    onButtonClick() {
        this.props.onButtonClick();
    }


    render() {
        const {isLogin,type,loginUrl} = this.props;
        if(isLogin) {
            return (
                <div className={styles.avatar} onClick={this.onButtonClick} style={{left:'5.5vw'}}>
                    <img src={loginUrl} alt=""/>
                </div>
            )
        }else {
            if(type==='goBack') {
                return (
                    <div className={styles.back} onClick={this.onButtonClick} style={{left:'5.5vw'}}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true">

                        </i>
                    </div>
                )
            }

            if(type==='login') {
                return (
                    <div className={styles.login} onClick={this.onButtonClick} style={{left:'5.5vw'}}>
                        <i className="fa fa-address-book" aria-hidden="true">

                        </i>
                    </div>
                )
            }

            if(type==='message') {
                return (
                    <div className={styles.message} onClick={this.onButtonClick} style={{right:'5.5vw'}}>
                        <i className="fa fa fa-envelope-o" aria-hidden="true">

                        </i>
                    </div>
                )
            }
        }
    }
}