import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../Helpers';
import * as styles from './UserHeader.scss';

export class UserHeader extends React.Component {

    static propTypes = {
        avatarUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        createAt: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,

    };
    static  defaultProps = {
        avatarUrl: '',
        name: '',
        createAt: '',
        score: 0,
    };

    render() {
        const {avatarUrl,name,createAt,score} = this.props;
        console.log(createAt);
        return (
            <div>
                <div className={styles.container} style={{backgroundColor:Helpers.randomColor()}}>
                    <div className={styles.avatar}>
                        <img src={avatarUrl} alt=""/>
                        <div className={styles.name}>
                            {name}
                        </div>
                    </div>
                    <div className={styles.webInfo}>
                        <div className={styles.create_at}>
                            {`注册时间：${Helpers.dateFormat(createAt)}`}
                        </div>
                        <div className={styles.score}>
                            {`积分：${score}`}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}