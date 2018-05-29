import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './ToolButton.scss';

const iconClassMap = {

};

export class ToolButton extends React.Component {

    static propTypes = {
        onButtonClick: PropTypes.func.isRequired,
        isLogin : PropTypes.bool.isRequired
    };
    static defaultProps = {
        isLogin: false,
        onButtonClick: ()=>{

        }
    };

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }



    onButtonClick() {
        this.props.onButtonClick();
    }


    render() {
        const {isLogin} = this.props;
        return (
            <div className={styles.back} onClick={this.onButtonClick}>
                <i className="fa fa-long-arrow-left" aria-hidden="true">

                </i>
            </div>
        )
    }
}