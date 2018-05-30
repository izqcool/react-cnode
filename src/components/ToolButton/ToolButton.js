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
        loginUser: PropTypes.object.isRequired
    };
    static defaultProps = {
        isLogin: false,
        onButtonClick: ()=>{

        },
        type: 'goBack',
        isAvatar: false,
        loginUser: {}
    };

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }



    onButtonClick() {
        this.props.onButtonClick();
    }


    render() {
        const {isLogin,type,loginUser} = this.props;
        if(isLogin) {
            return (
                <div className={styles.avatar} onClick={this.onButtonClick}>
                    <img src={loginUser.avatar_url} alt=""/>
                </div>
            )
        }else {
            if(type==='goBack') {
                return (
                    <div className={styles.back} onClick={this.onButtonClick}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true">

                        </i>
                    </div>
                )
            }

            if(type==='login') {
                return (
                    <div className={styles.login} onClick={this.onButtonClick}>
                        <i className="fa fa-address-book" aria-hidden="true">

                        </i>
                    </div>
                )
            }
        }
    }
}