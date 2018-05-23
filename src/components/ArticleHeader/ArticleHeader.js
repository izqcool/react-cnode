import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../Helpers';
import * as styles from './ArticleHeader.scss';


export class ArticleHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.onGoArticle = this.onGoArticle.bind(this);
    };

    static propTypes = {
        avatarUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        avatarUrl: '',
        title: '',
        createAt: ''
    };



    componentDidMount() {

    }

    onGoArticle(id) {
        const {history} = this.props;
        history.push(`/topic/${id}`);
    }

    render() {
        const {avatarUrl,title,createAt} = this.props;

        return (
            <div className={styles.container} style={{backgroundColor: Helpers.randomColor()}}>
                <div className={styles.left}>
                    <div className={styles.author}>
                        <img src={avatarUrl} alt=""/>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.time}>
                        <i className={styles.icon}>
                            <img src="../../../public/assets/images/time.png" alt=""/>
                        </i>
                        {Helpers.dateFromNow(createAt)}
                    </div>
                </div>
            </div>
        )
    }
}