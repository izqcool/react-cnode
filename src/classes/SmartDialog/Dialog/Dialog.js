import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Dialog.scss';

const BASE_Z_INDEX = 10000;

export class Dialog extends React.Component {
    static PropTypes = {
        sequenceId: PropTypes.number.isRequired,
        total: PropTypes.number,
        styles: PropTypes.object,
        maskStyles: PropTypes.object.isRequired,
        allowOutsideClick: PropTypes.bool,
        children: PropTypes.any,
        onClose: PropTypes.func
    };

    static defaultProps = {
        total: 0,
        styles: {},
        maskStyles: {},
        allowOutsideClick: true,
        children: null,
        onClose: () => {
        }
    };

    constructor(props) {
        super(props);
        this.$model = React.createRef();
        this.onClose = this.onClose.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
    }

    componentDidMount() {
        console.log(this.$model);
        const width = this.$model.current.getBoundingClientRect().width;
        const x = (window.innerWidth - width) / 2;
        const y = 100 * this.props.total + 100;
        this.$model.current.style.transform = `translate(${x}px,${y}px)`;
    }

    onClose() {
        this.props.onClose();
    }

    onMaskClick() {
        if(this.props.allowOutsideClick) {
            this.onClose();
        }
    }

    render() {
        const {sequenceId,children} = this.props;
        const _styles = this.props.styles;
        const _maskStyles = this.props.maskStyles;
        console.log(_maskStyles);
        return (
            <div className={styles.dialog}>
                <div className={styles.model} ref={this.$model} style={{..._styles,'zIndex':BASE_Z_INDEX + sequenceId + 1}}>
                    <div className={styles.modelDialog}>
                        {children}
                    </div>
                </div>
                <div className={styles.mask} style={{..._maskStyles,'zIndex': BASE_Z_INDEX + sequenceId}} onClick={this.onMaskClick}>
                </div>
            </div>
        )
    }
}