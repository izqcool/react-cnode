import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './ToolButton.scss';

const iconClassMap = {

};

export class ToolButton extends React.Component {

    static propTypes = {
        onGoBack: PropTypes.func.isRequired,
        isLogin : PropTypes.bool.isRequired
    };
    static defaultProps = {
        isLogin: false,
        onGoBack: ()=>{

        }
    };

    constructor(props) {
        super(props);
        this.onGoBack = this.onGoBack.bind(this);
    }



    onGoBack() {
        this.props.onGoBack();
    }


    render() {
        const {isLogin} = this.props;
        return (
            <div className={styles.back} onClick={this.onGoBack}>
                <i className="fa fa-long-arrow-left" aria-hidden="true">

                </i>
            </div>
        )
    }
}