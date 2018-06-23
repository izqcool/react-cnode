import React from 'react';
import {SmartDialog, Http} from '../../classes';
import * as styles from './Publish.scss';

const http = new Http();

export class Publish extends React.Component {
    tabLists = [
        {
            type: 'ask',
            text: '问答'
        },
        {
            type: 'share',
            text: '分享'
        },
        {
            type: 'job',
            text: '招聘'
        },
        {
            type: 'dev',
            text: '测试'
        }
    ];
    dialog = null;
    alertDialog = null;
    constructor(props) {
        super(props);
        this.state = {
            tabChoose: {
                type: 'dev',
                text: '测试'
            }
        };
        this.titleRef = React.createRef();
        this.contentRef = React.createRef();
        this.goBack = this.goBack.bind(this);
        this.onShowTab = this.onShowTab.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.onPublish = this.onPublish.bind(this);
        this.createAlertDialog = this.createAlertDialog.bind(this);
    }

    goBack() {
        window.history.go(-1);
    }

    onChangeTab(item) {
        this.setState({
            tabChoose:item
        });
        this.dialog.close();
    }

    onShowTab() {
         this.dialog = new SmartDialog({
            styles: {},
            maskStyles: {
                backgroundColor:'#000'
            },
            component: (
                <div className={styles.tabWrapper}>
                    <ul>
                        {
                            this.tabLists.map((item,index)=>{
                                return (
                                    <li key={index} onClick={()=>{this.onChangeTab(item)}}>{item.text}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        });
        this.dialog.show();
    }

    createAlertDialog(message) {
        this.alertDialog = new SmartDialog({
            maskStyles: {
                backgroundColor:'#000'
            },
            component: (
                <div className={styles.tabWrapper}>
                    <div className={styles.dialogMes}>
                        {message}
                    </div>
                    <div className={styles.confirm} onClick={()=>{this.alertDialog.close()}}>OK</div>
                </div>
            )
        });
        this.alertDialog.show();
        return false;
    }

    onPublish() {
        const type = this.state.tabChoose.type;
        const titleValue = this.titleRef.current.value;
        const contentValue = this.contentRef.current.value;
        const token = window.localStorage.getItem('cnodeToken');
        if(titleValue.trim()==='') {
            this.createAlertDialog('标题不能为空!');
            return;
        }
        if(contentValue.trim()==='') {
            this.createAlertDialog('你还没写东西呢!');
            return;
        }
        http.post(`/topics`,{
            data: {
                accesstoken: token,
                title: titleValue,
                tab: type,
                content: contentValue
            }
        }).then((res)=>{
            if(res.success) {
                this.createAlertDialog(`发布成功！`);
            }
        }).catch((err)=>{
            this.createAlertDialog(err.error_msg);
            return false;
        })
    }

    render() {
        const chooseText = this.state.tabChoose.text;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back} onClick={this.goBack}>返回</div>
                    <div className={styles.title}>发表帖子</div>
                    <div className={styles.publish} onClick={()=>{this.onPublish()}}>发布</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.tab}>
                        <i className="fa fa-list" aria-hidden="true"></i>
                        <div className={styles.tab_wrapper} onClick={this.onShowTab}>
                            <div>{chooseText}</div>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <i className="fa fa-bolt" aria-hidden="true"></i>
                        <input type="text" placeholder="请输入标题" className={styles.title_input} ref={this.titleRef}/>
                    </div>
                    <div className={styles.text}>
                        <textarea name="" id="" placeholder="请在此处输入帖子内容" ref={this.contentRef}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}