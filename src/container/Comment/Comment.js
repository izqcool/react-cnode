import React from 'react';
import * as styles from './Comment.scss';
import {Storage} from '../../classes';

export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const repliesData = Storage.get('replies');
        console.log(repliesData);
    }

    goBack() {
        window.history.go(-1);
    }



    render() {
        const repliesData = Storage.get('replies');
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back} onClick={this.goBack}>
                        返回
                    </div>
                    <div className={styles.comment}>
                        评论
                        {
                            repliesData ? (
                                `  ${repliesData.length}`
                            ) : (null)
                        }
                    </div>
                </div>
                <div className={styles.content}>

                </div>
                <div className={styles.footer}>

                </div>
            </div>
        )
    }

}