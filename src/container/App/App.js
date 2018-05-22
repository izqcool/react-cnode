import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header} from '../Header';
import {Home} from '../Home';
import * as styles from './App.scss';

export class App extends React.Component {

    render() {
        const {history,location} = this.props;

        return (
            <div className={styles.app} >
                <Header location={location}/>
                <div className={styles.content}>
                    <Switch>
                        <Route exact path="/" component={ ()=>(<Home tab="all" history={history}/>)} />
                        <Route exact path="/home" component={ ()=>(<Home tab="all" history={history}/>)} />
                        <Route exact path="/good" component={ ()=>(<Home tab="good" history={history}/>)} />
                        <Route exact path="/ask" component={ ()=>(<Home tab="ask" history={history}/>)} />
                        <Route exact path="/share" component={ ()=>(<Home tab="share" history={history}/>)} />
                        <Route exact path="/job" component={ ()=>(<Home tab="job" history={history}/>)} />
                    </Switch>
                </div>

            </div>
        )
    }
}