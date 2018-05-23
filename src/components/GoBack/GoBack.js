import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './GoBack.scss';


export class GoBack extends React.Component {


    constructor(props) {
        super(props);
        this.onGoBack = this.onGoBack.bind(this);
    }

    static propsTypes = {
        onGoBack: PropTypes.func.isRequired
    };
    static defaultProps = {
        onGoBack: ()=>{

        }
    };

    onGoBack() {
        this.props.onGoBack();
    }


    render() {
        return (
            <div className={styles.back} onClick={this.onGoBack}>
                ←
            </div>
        )
    }
}