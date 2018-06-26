import React from 'react';
import * as styles from './Comment.scss';
import * as _ from 'lodash';
import {Http} from '../../classes';
import {CommentList,Loading} from '../../components';

const http = new Http();

export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded : false,
            isAit: false,
            reply_id: ''
        };
        this.inputRef = React.createRef();
        this.goBack = this.goBack.bind(this);
        this.onGoUser = this.onGoUser.bind(this);
        this.getData = this.getData.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onAit = this.onAit.bind(this);
        this.onComment = this.onComment.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const {match} = this.props;
        const id = match.params.topic_id;
        http.get(`/topic/${id}`).then((res)=>{
            this.setState({
                repliesData: res.data.replies.reverse(),
                dataLoaded: true
            });
        }).catch((err)=>{
            console.log(err);
        });

    }

    refresh() {
        this.getData();
    }

    goBack() {
        window.history.go(-1);
    }

    onGoUser(name) {
        const {history} = this.props;
        history.push(`/user/${name}`);
    }

    onLike(id) {
        const token = window.localStorage.getItem('cnodeToken');
        http.post(`/reply/${id}/ups`,{
            params: {
                accesstoken: token
            }
        }).then((res)=>{
            if(res.success) {
                this.getData();
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    onAit(name,id) {
        const input = this.inputRef.current;
        input.value=`@${name} `;
        this.setState({
            isAit: true,
            reply_id: id

        });
    }

    onComment() {
        const token = window.localStorage.getItem('cnodeToken');
        const {reply_id} = this.state;
        let isAited = this.state.isAit;
        const {match} = this.props;
        const topicId = match.params.topic_id;
        const inputValue = this.inputRef.current.value;
        if(_.includes(inputValue,'@')) {
            isAited = false;
            this.setState({
                isAit: false
            });
        }

        // 评论文章
        if(!isAited) {
            http.post(`/topic/${topicId}/replies`,{
                data: {
                    "accesstoken" : token,
                    "content" : inputValue,
                }
            }).then((res)=>{
                this.refresh();
                this.inputRef.current.value = '';
            }).catch((err)=>{
                console.log(err);
            })
        }else {
            http.post(`/topic/${topicId}/replies`,{
                data: {
                    "accesstoken" : token,
                    "content" : inputValue,
                    "reply_id": reply_id
                }
            }).then((res)=>{
                this.refresh();
                this.inputRef.current.value = '';
            }).catch((err)=>{
                console.log(err);
            })
        }

    }



    render() {
        const {dataLoaded,repliesData} = this.state;
        const imgUrl = window.localStorage.getItem('cnodeUrl');
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
                                            `  ${repliesData.length}`
                                        ) : (null)
                                    }
                                </div>
                            </div>
                            <div className={styles.content}>
                                {
                                    repliesData.map((item,i)=>{
                                        return <CommentList key={i} data={item}
                                                            floorNum={repliesData.length-i}
                                                            onAit={()=>{this.onAit(item.author.loginname)}}
                                                            onClickAvatar={()=>{this.onGoUser(item.author.loginname,item.id)}}
                                        onLike={this.onLike}/>
                                    })
                                }
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.avator}>
                                    <img src={imgUrl} alt=""/>
                                </div>
                                <input type="text" placeholder="嘿，说点什么吧！" ref={this.inputRef}/>
                                <div className={styles.confirm}>
                                    <i className="fa fa-reply" aria-hidden="true" onClick={this.onComment}></i>
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