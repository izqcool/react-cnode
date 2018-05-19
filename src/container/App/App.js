import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header} from '../Header';
import {Home} from '../Home';
import 'normalize.css';
import * as styles from './App.scss';

export class App extends React.Component {

    render() {
        const {history,location} = this.props;
        console.log(history);
        console.log(location);

        return (
            <div className={styles.app} >
                <Header location={location}/>
                <div className={styles.content}>
                    <Route exact path="/home" component={Home}/>
                </div>
            </div>
        )
    }
}