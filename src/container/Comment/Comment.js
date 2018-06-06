import React from 'react';
import * as styles from './Comment.scss';
import {Http} from '../../classes';
import {CommentList,Loading} from '../../components';

const http = new Http();

export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded : false
        };
        this.goBack = this.goBack.bind(this);
        this.onGoUser = this.onGoUser.bind(this);
        this.getData = this.getData.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const {match} = this.props;
        const id = match.params.topic_id;
        http.get(`/topic/${id}`).then((res)=>{
            console.log(res);
            this.setState({
                repliesData: res.data.replies,
                dataLoaded: true
            });
        }).catch((err)=>{
            console.log(err);
        });

    }

    goBack() {
        window.history.go(-1);
    }

    onGoUser(name) {
        const {history} = this.props;
        history.push(`/user/${name}`);
    }

    onLike(id) {
        http.post(`/reply/${id}/ups`,{
            params: {
                accesstoken: '6d493a82-127f-4f68-b99e-7bd6c4a6aae0'
            }
        }).then((res)=>{
            console.log(res);
            if(res.success) {
                this.getData();
            }
        }).catch((err)=>{
            console.log(err);
        });
    }



    render() {
        const {dataLoaded,repliesData} = this.state;
        let reverseData;
        if(repliesData) {
            reverseData = repliesData.reverse();
        }
        return (
            <div className={styles.container}>
                {
                    dataLoaded ? (
                        <div>
                            <div className={styles.header}>
                                <div className={styles.back} onClick={this.goBack}>
                                    返回
                                </div>
                                <div className={styles.comment}>
                                    评论
                                    {
                                        repliesData ? (
                                            `  ${reverseData.length}`
                                        ) : (null)
                                    }
                                </div>
                            </div>
                            <div className={styles.content}>
                                {
                                    reverseData.map((item,i)=>{
                                        return <CommentList key={i} data={item}
                                                            floorNum={reverseData.length-i}
                                                            onClickAvatar={()=>{this.onGoUser(item.author.loginname)}}
                                        onLike={this.onLike}/>
                                    })
                                }
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.avator}>
                                    <img src="https://avatars2.githubusercontent.com/u/10626543?s=64&v=4" alt=""/>
                                </div>
                                <input type="text" defaultValue="嘿，说点什么吧！"/>
                                <div className={styles.confirm}>
                                    <i className="fa fa-reply" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    ):(
                        <Loading/>
                    )
                }
            </div>
        )
    }

}