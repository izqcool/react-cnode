import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../../classes';
import * as _ from 'lodash';
import * as styles from './CommentList.scss';

export class CommentList extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        floorNum: PropTypes.number.isRequired,
        onClickAvatar: PropTypes.func.isRequired
    };
    static defaultProps = {
        data: {},
        floorNum: 0,
        onClickAvatar: () => {}
    };

    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
        this.onClickAvatar = this.onClickAvatar.bind(this);
        this.linkToUser = this.linkToUser.bind(this);
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


    render() {
        const {data,floorNum} = this.props;

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
                            <i className={`${data.is_uped?styles.is_uped:styles.is_down} fa fa-thumbs-o-up`} aria-hidden="true"></i>
                        </div>
                        <div className={styles.ait}>
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}