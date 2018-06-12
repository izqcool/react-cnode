import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../../classes';
import * as styles from './UserHeader.scss';

export class UserHeader extends React.Component {

    static propTypes = {
        avatarUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        createAt: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        isSelf: PropTypes.bool.isRequired

    };
    static  defaultProps = {
        avatarUrl: '',
        name: '',
        createAt: '',
        score: 0,
        isSelf: false
    };

    constructor(props) {
        super(props);
        this.goGithub = this.goGithub.bind(this);
        this.onGoPublish = this.onGoPublish.bind(this);
    }

    goGithub(){
        const {name} = this.props;
        window.open(`https://github.com/${name}`)
    }

    onGoPublish() {
        const {history} = this.props;
        history.push(`/publish`);
    }

    render() {
        const {avatarUrl,name,createAt,score,isSelf} = this.props;
        return (
            <div>
                <div className={styles.container} style={{backgroundColor:Helpers.randomColor()}}>
                    <div className={styles.wrapper}>
                        {
                            isSelf && (
                                <div className={styles.write}>
                                    <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.onGoPublish}></i>
                                </div>
                            )
                        }
                        <div className={styles.avatar} onClick={this.goGithub}>
                            <img src={avatarUrl} alt=""/>
                            <div className={styles.name}>
                                {name}
                            </div>
                        </div>
                        {
                            isSelf && (
                                <div className={styles.set}>
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            )
                        }
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