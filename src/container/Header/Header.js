import React from 'react';
import {Link} from 'react-router-dom'
import * as styles from './Header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    getNavs() {
        const {location:{pathname}} = this.props;
        const path = pathname === '/' ? '/home' : pathname;
        const commonNav = [
            {
                type: 'home',
                path: '/home',
                text: '主页',
                active: true
            },
            {
                type: 'essence',
                path: '/essence',
                text: '精华',
                active: false
            },
            {
                type: 'question',
                path: '/question',
                text: '问答',
                active: false
            },
            {
                type: 'share',
                path: '/share',
                text: '分享',
                active: false
            },
            {
                type: 'recruitment',
                path: '/recruitment',
                text: '招聘',
                active: false
            }
        ];

        return commonNav.map( (nav) => {
            return {
                ...nav,
                active: path.indexOf(nav.type) !== -1
            }
        });
    }

    getNavComponents(nav) {
        const classes = [
            styles.nav,
            ...(nav.active ? [styles.active]:[])
        ].join(' ').trim();

        return (
            <Link key={nav.type} to={nav.path} className={classes}>
                <span>{nav.text}</span>
            </Link>
        )
    }

    render() {
        const navs = this.getNavs();
        console.log(navs);
        return (
            <div className={styles.container}>
                {
                    navs.map((nav) => this.getNavComponents(nav))
                }
            </div>
        )
    }
}