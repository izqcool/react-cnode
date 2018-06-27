import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../../classes/Helpers';
import * as styles from './MessageList.scss';

const tabMap = {
    'at':'@',
    'reply':'回复'
};

export class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.onComment = this.onComment.bind(this);
    };

    static propTypes = {
        datas: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    };
    //
    static defaultProps = {
        datas: [],
        history: {}
    };



    componentDidMount() {

    }

    onComment(id,reply_id) {
        const {history} = this.props;
        history.push(`/comment/${id}/${reply_id}`);
    }

    render() {
        const {datas} = this.props;
        return (
            <div className={styles.container}>

                {
                    datas.map((data,i)=> {
                        return (
                            <div className={styles.items} key={i} onClick={()=>{this.onComment(data.topic.id,data.reply.id)} }>
                                <div className={styles.left}>
                                    <div className={styles.author}>
                                        <img src={data.author.avatar_url} alt=""/>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.title}>
                                        {data.topic.title}
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.name_and_type}>
                                            <div className={styles.name}>
                                                {data.author.loginname}
                                            </div>
                                            <div className={`${styles.type} ${data.type==='reply' ? styles.reply:''} ${data.type==='at' ? styles.at:''}`}>
                                                {tabMap[data.type]}
                                            </div>
                                        </div>
                                        <div className={styles.time}>
                                            {Helpers.dateFromNow(data.reply.create_at)}
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