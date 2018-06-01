import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../../classes';
import * as styles from './CommentList.scss';

export class CommentList extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        floorNum: PropTypes.number.isRequired,
    };
    static defaultProps = {
        data: {},
        floorNum: 0
    };

    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }


    render() {
        const {data,floorNum} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        <img src={data.author.avatar_url} alt=""/>
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
                    <div className={styles.text} dangerouslySetInnerHTML={{__html: data.content}}>

                    </div>
                    <div className={styles.event}>
                        <div className={styles.praise}>
                            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        </div>
                        <div className={styles.ait}>
                            <i class="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}