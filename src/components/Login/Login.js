import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Login.scss';

export class Login extends React.Component {

    static propTypes = {
        onCancel: PropTypes.func.isRequired
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
    }

    componentDidMount() {
        console.log(this.inputRef.current.value);
    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        return (
            <div className={styles.login}>
                <div className={styles.close}>
                    <i className="fa fa-times" aria-hidden="true" onClick={this.onCancel}></i>
                </div>
                <div className={styles.content}>
                    <input type="text" placeholder="请输入Access Token" ref={this.inputRef}/>
                    <button>登 录</button>
                </div>
            </div>
        )
    }
}