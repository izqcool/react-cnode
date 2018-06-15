import React from 'react';
import * as styles from './Publish.scss';

export class Publish extends React.Component {

    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        window.history.go(-1);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back} onClick={this.goBack}>返回</div>
                    <div className={styles.title}>发表帖子</div>
                    <div className={styles.publish}>发布</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.tab}>
                        <i className="fa fa-list" aria-hidden="true"></i>
                        <div className={styles.tab_wrapper}>
                            <div>测试</div>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <i class="fa fa-bolt" aria-hidden="true"></i>
                        <input type="text" placeholder="请输入标题" className={styles.title_input}/>
                    </div>
                    <div className={styles.text}>
                        <textarea name="" id="" placeholder="请在此处输入帖子内容"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}