import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './CommentList.scss';

export class CommentList extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };
    static defaultProps = {
        data: {}
    };

    constructor(props) {
        super(props);
    }


    render() {
        const {data} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        <img src={data.author.avatar_url} alt=""/>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={styles.text}>

                    </div>
                    <div className={styles.event}>

                    </div>
                </div>
            </div>
        )
    }

}