import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../Helpers';
import * as styles from './ArticleList.scss';

const tabMap = {
  'share':'分享',
  'ask':'问答',
  'good':'精华',
  'job':'招聘'
};

export class ArticleList extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.onGoArticle = this.onGoArticle.bind(this);
    };

    static propTypes = {
        datas: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    };
    //
    static defaultProps = {
        datas: [],
        history: {},
        type: 'num'
    };



    componentDidMount() {

    }

    onGoArticle(id) {
        const {history} = this.props;
        history.push(`/topic/${id}`);
    }

    render() {
        const {datas,type} = this.props;
        return (
            <div className={styles.container}>

                {
                    datas.map((data,i)=> {
                        // return <div key={i}>{Helpers.dateFromNow(data.last_reply_at)}</div>
                        return (
                            <div className={styles.items} key={i} onClick={()=>{this.onGoArticle(data.id)} }>
                                <div className={styles.left}>
                                    <div className={styles.author}>
                                        <img src={data.author.avatar_url} alt=""/>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.title}>
                                        {data.title}
                                    </div>
                                    <div className={styles.info}>
                                        {
                                            type==='num'? (
                                                <div className={styles.num}>
                                                    {`${data.reply_count}/${data.visit_count}`}
                                                </div>
                                            ):(null)
                                        }
                                        {
                                            type==='name'? (
                                                <div className={styles.name}>
                                                    {data.author.loginname}
                                                </div>
                                            ):(null)
                                        }
                                        <div className={styles.sort}>
                                            <div>
                                                {tabMap[data.tab]}
                                            </div>
                                            {
                                                data.good? (
                                                    <div className={styles.good}>精</div>
                                                ):(null)
                                            }
                                            {
                                                data.top? (
                                                    <div className={styles.top}>顶</div>
                                                ):(null)
                                            }
                                        </div>
                                        <div className={styles.time}>
                                            {Helpers.dateFromNow(data.last_reply_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )


    }
}