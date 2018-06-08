import React from 'react';
import PropTypes from 'prop-types';
import {Helpers,Storage} from '../../classes';
import * as _ from 'lodash';
import * as styles from './CommentList.scss';

export class CommentList extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        floorNum: PropTypes.number.isRequired,
        onClickAvatar: PropTypes.func.isRequired,
        onLike: PropTypes.func.isRequired,
        onAit: PropTypes.func.isRequired,
    };
    static defaultProps = {
        data: {},
        floorNum: 0,
        onClickAvatar: () => {},
        onLike: () => {},
        onAit: () => {},
    };

    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
        this.onClickAvatar = this.onClickAvatar.bind(this);
        this.linkToUser = this.linkToUser.bind(this);
        this.isLike = this.isLike.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onAit = this.onAit.bind(this);
    }

    componentDidMount() {
        this.linkToUser();
    }

    // change link for a which for @ user
    linkToUser() {
        const allLinks = this.contentRef.current.querySelectorAll('a');
        allLinks.forEach((item,i)=>{
            let newLink = item.href;
            if(_.includes(item.href,'/user')) {
                newLink =  _.replace(item.href,'/user','/#/user');
            }
            item.href = newLink;
        });

    }

    onClickAvatar() {
        this.props.onClickAvatar();
    }
    onLike(id) {
        this.props.onLike(id);
    }

    isLike(allLikes) {
        const loginUser = Storage.get('loginUser');
        let loginId;
        if(loginUser) {
            loginId = loginUser.id;
        }else {
            loginId = null;
        }
        const isLike = _.includes(allLikes,loginId);
        return isLike;
    }

    onAit() {
        this.props.onAit();
    }


    render() {
        const {data,floorNum} = this.props;

        const isLike = this.isLike(data.ups);

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        <img src={data.author.avatar_url} alt="" onClick={this.onClickAvatar}/>
                    </div>
                    <div className={styles.floor}>
                        {`${floorNum} 楼`}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <div>
                            {data.author.loginname}
                        </div>
                        <div>
                            {Helpers.dateFromNow(data.create_at)}
                        </div>
                    </div>
                    <div className={styles.text} ref={this.contentRef} dangerouslySetInnerHTML={{__html: data.content}}>

                    </div>
                    <div className={styles.event}>
                        <div className={styles.praise}>
                            <i className={`${isLike ? styles.is_uped:styles.is_down} fa fa-thumbs-o-up`} aria-hidden="true" onClick={()=>{this.onLike(data.id)}}></i>
                        </div>
                        <div className={styles.ait}>
                            <i className="fa fa-reply" aria-hidden="true" onClick={this.onAit}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}