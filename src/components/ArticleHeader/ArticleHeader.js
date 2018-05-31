import React from 'react';
import PropTypes from 'prop-types';
import {Helpers} from '../../classes';
import * as styles from './ArticleHeader.scss';


export class ArticleHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.onGoUser = this.onGoUser.bind(this);
    };

    static propTypes = {
        avatarUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired


    };

    static defaultProps = {
        history: {},
        avatarUrl: '',
        title: '',
        createAt: '',
        name: ''
    };



    componentDidMount() {

    }


    onGoUser() {

        const {name,history} = this.props;
        history.push(`/user/${name}`)
    }

    render() {
        const {avatarUrl,title,createAt} = this.props;

        return (
            <div className={styles.container} style={{backgroundColor: Helpers.randomColor()}}>
                <div className={styles.left}>
                    <div className={styles.author}  onClick={this.onGoUser}>
                        <img src={avatarUrl} alt=""/>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.time}>
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {Helpers.dateFromNow(createAt)}
                    </div>
                </div>
            </div>
        )
    }
}