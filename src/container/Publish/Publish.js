import React from 'react';
import * as styles from './Publish.scss';

export class Publish extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}>返回</div>
                    <div className={styles.title}>发表帖子</div>
                    <div className={styles.publish}>发布</div>
                </div>
            </div>
        )
    }
}