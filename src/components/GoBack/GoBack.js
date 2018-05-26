import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './GoBack.scss';

const iconClassMap = {

};

export class GoBack extends React.Component {

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
            // fa fa-long-arrow-left
            <div className={styles.back} onClick={this.onGoBack}>
                <i class="fa fa-long-arrow-left" aria-hidden="true">

                </i>
            </div>
        )
    }
}