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
                                                            onClickAvatar={()=>{this.onGoUser(item.author.loginname)}}/>
                                    })
                                }
                            </div>
                            <div className={styles.footer}>

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