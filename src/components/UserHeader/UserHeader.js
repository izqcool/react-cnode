import React from 'react';
import PropTypes from 'prop-types';
import {Helpers,SmartDialog} from '../../classes';
import * as styles from './UserHeader.scss';

export class UserHeader extends React.Component {

    setDialog = null;

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
        this.onShowSet = this.onShowSet.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    goGithub(){
        const {name} = this.props;
        window.open(`https://github.com/${name}`)
    }

    onGoPublish() {
        const {history} = this.props;
        history.push(`/publish`);
    }

    onSignOut() {
        const {history} = this.props;
        window.localStorage.removeItem('cnodeLoginName');
        window.localStorage.removeItem('cnodeId');
        window.localStorage.removeItem('cnodeUrl');
        window.localStorage.removeItem('cnodeToken');
        this.setDialog.close();
        history.push(`/`);
    }

    onShowSet() {
        this.setDialog = new SmartDialog({
            styles: {},
            maskStyles: {
                backgroundColor:'#7d7c7c'
            },
            allowOutsideClick: false,
            component: (
                <div className={styles.setDialog}>
                    <div className={styles.header}>
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <div>设置</div>
                    </div>
                    <div className={styles.about}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <div>关于</div>
                    </div>
                    <div className={styles.out} onClick={this.onSignOut}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <div>退出</div>
                    </div>
                    <div className={styles.close}>
                        <i className="fa fa-times-circle-o" aria-hidden="true" onClick={()=>{this.setDialog.close()}}></i>
                    </div>
                </div>
            )
        });
        this.setDialog.show();
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
                                <div className={styles.set} onClick={this.onShowSet}>
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