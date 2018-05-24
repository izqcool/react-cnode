import React from 'react';
import * as styles from './Loading.scss';

export class Loading extends React.Component {
    render() {
        return (
            <div className={styles.loading}>
                <i class="fa fa-spinner" aria-hidden="true">

                </i>
            </div>
        )
    }
}