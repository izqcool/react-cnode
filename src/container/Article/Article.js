import React from 'react';
import {Http,Loading,ArticleHeader,ToolButton,CommentBtn} from '../../components';
import {Storage} from '../../classes';
import * as styles from './Article.sass';

const http = new Http();

export class Article extends React.Component {
    contentRef = null;
    constructor(props){
        super(props);
        this.contentRef = React.createRef();
        this.state ={
            data:{},
            dataLoaded: false
        };
        this.onGoBack = this.onGoBack.bind(this);
        this.onGoCommentPage = this.onGoCommentPage.bind(this);

    };



    componentDidMount() {
        this.getArticleData();

    }

    getArticleData() {
        const {match} = this.props;
        const id = match.params.id;
        http.get(`/topic/${id}`).then((res)=>{
            console.log(res);
            this.setState({
                data: res.data,
                dataLoaded: true
            });
            if(Storage.get('replies')) {
                Storage.remove();
            }
            //save replies data
            Storage.put('replies',res.data.replies);
        }).catch((err)=>{
            console.log(err);
        });

    }

    onGoBack() {
        window.history.go(-1);
    }

    onGoCommentPage() {
        const {data} = this.state;
        const {history} = this.props;
        history.push(`/comment/${data.id}`);
    }


    render() {
        const {history} = this.props;
        const {dataLoaded,data} = this.state;
        console.log(data);
        const loginUser = Storage.get('loginUser');

        if(dataLoaded) {
            return (
                <div className={styles.article} >
                    <ArticleHeader avatarUrl={data.author.avatar_url} title={data.title} createAt={data.create_at} name={data.author.loginname} history={history}/>
                    <div className={styles.contnet} dangerouslySetInnerHTML={{__html: data.content}}>

                    </div>
                    <div>
                        <ToolButton onButtonClick={this.onGoBack}/>
                    </div>
                    {
                        loginUser ? (
                            <div>
                                <CommentBtn replyCount={data.reply_count}
                                            onGoComment={this.onGoCommentPage}/>
                            </div>
                        ) : (null)
                    }
                </div>
            )
        }else {
            return (
                <Loading/>
            )
        }

    }
}