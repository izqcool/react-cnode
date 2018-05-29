import React from 'react';
import {Http,Loading,UserHeader,ArticleList,ToolButton} from '../../components';
import * as styles from './User.scss';

const http = new Http();


export class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            whichTag: 'recent_replies',
            itemDate: []
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getTabs = this.getTabs.bind(this);
        this.onClickTab = this.onClickTab.bind(this);
        this.onGoBack = this.onGoBack.bind(this);
    };

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        const {match} = this.props;
        const name = match.params.username;
        http.get(`/user/${name}`).then((res) => {
            console.log(res);
            this.setState({
                data: res.data,
                itemDate: res.data.recent_replies,
                dataLoaded: true
            });
        }).catch((err) => {
            console.log(err);
        })
    }


    getTabs() {
        const {whichTag} = this.state;
        const tabLists = [
            {
                tab: '最近回复',
                tag:'recent_replies',
                active: true
            },
            {
                tab: '最新发布',
                tag: 'recent_topics',
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
        const {data} = this.state;
        this.setState({
            whichTag: item,
            itemDate: data[item]
        });
    }

    onGoBack() {
        window.history.go(-1);
    }

    render() {
        const {dataLoaded,data,itemDate} = this.state;
        console.log(itemDate);
        const {history} = this.props;
        const tabs = this.getTabs();
        if(dataLoaded) {
            return (
                <div className={styles.user}>
                    <UserHeader avatarUrl={data.avatar_url}
                                name={data.loginname}
                                createAt={data.create_at}
                                score={data.score}/>
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
                            <ArticleList datas={itemDate} history={history} type="name"/>
                        </div>
                    </div>
                    <ToolButton onButtonClick={this.onGoBack}/>
                </div>
            )
        }else {
            return (
                <Loading/>
            )
        }
    }

}
