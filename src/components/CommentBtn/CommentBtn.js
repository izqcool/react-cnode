import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './CommentBtn.scss';

export class CommentBtn extends React.Component {

    static propTypes = {
        replyCount: PropTypes.number.isRequired,
        onGoComment: PropTypes.func.isRequired
    };
    static defaultProps = {
        replyCount: 0,
        onGoComment: () => {}
    };

    constructor(props){
        super(props);
        this.onGoComment = this.onGoComment.bind(this);
    }

    onGoComment() {
        this.props.onGoComment();
    }


    render() {
        const {replyCount} = this.props;
        return (
            <div className={styles.container} onClick={this.onGoComment}>
                <i className="fa fa fa-comment" aria-hidden="true">

                </i>
                {replyCount}
            </div>
        )
    }
}