import React from 'react';
import * as styles from './CommentBtn.scss';

export class CommentBtn extends React.Component {


    render() {
        return (
            <div className={styles.container} onClick={this.onButtonClick}>
                <i className="fa fa fa-comment" aria-hidden="true">

                </i>

            </div>
        )
    }
}