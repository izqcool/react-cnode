import React from 'react';
import {Http} from '../../classes';
import {Loading,ArticleList} from '../../components';
import * as styles from './Message.scss';

const http = new Http();

export class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            whichTag: 'hasnot_read_messages',
        };
        this.getData = this.getData.bind(this);
        this.getTabs = this.getTabs.bind(this);
        this.onClickTab = this.onClickTab.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const token = window.localStorage.getItem('cnodeToken');
        http.get(`/messages`,{
            params: {
                "accesstoken": token
            }
        }).then((res)=>{
            console.log(res);
            if(res.success) {
                this.setState({
                    data: res.data
                });
            }
            this.setState({
                isLoaded: true
            });
        }).catch((err)=>{
            console.log(err);
        })
    }

    getTabs() {
        const {whichTag} = this.state;
        const tabLists = [
            {
                tab: '未读消息',
                tag:'hasnot_read_messages',
                active: true
            },
            {
                tab: '已读消息',
                tag: 'has_read_messages',
                active: true
            }
        ];

        return tabLists.map((tab)=>{
            return {
                ...tab,
                active: tab.tag === whichTag
            }
        });
    }

    onClickTab(item) {
        this.setState({
            whichTag: item
        });
    }

    render() {
        const {isLoaded,data,whichTag} = this.state;
        console.log(data);
        const tabs = this.getTabs();
        return (
            <div className={styles.container}>
                {
                    isLoaded ? (
                        <div className={styles.content}>
                            <div className={styles.tab}>
                                {
                                    tabs.map((tab,i)=>{
                                        return (
                                            <div key={i} className={`${tab.active ? styles.active: '' } ${styles.tab_items}`}
                                                 onClick={()=>{this.onClickTab(tab.tag)}}>
                                                {tab.tab}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    ) : (
                        <Loading/>
                    )
                }
            </div>
        )
    }

}