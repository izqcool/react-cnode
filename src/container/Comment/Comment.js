import React from 'react';
import * as styles from './Comment.scss';
import {Http} from '../../classes';
import {CommentList,Loading} from '../../components';

const http = new Http();

export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded : false,
            isAit: false
        };
        this.inputRef = React.createRef();
        this.goBack = this.goBack.bind(this);
        this.onGoUser = this.onGoUser.bind(this);
        this.getData = this.getData.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onAit = this.onAit.bind(this);
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
                repliesData: res.data.replies.reverse(),
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

    onAit(name) {
        const input = this.inputRef.current;
        console.log(input);
        input.value=`@${name} `;
        this.setState({
            isAit: true
        });
    }



    render() {
        const {dataLoaded,repliesData} = this.state;
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
                                                            onClickAvatar={()=>{this.onGoUser(item.author.loginname)}}
                                        onLike={this.onLike}/>
                                    })
                                }
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.avator}>
                                    <img src="https://avatars2.githubusercontent.com/u/10626543?s=64&v=4" alt=""/>
                                </div>
                                <input type="text" placeholder="嘿，说点什么吧！" ref={this.inputRef}/>
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