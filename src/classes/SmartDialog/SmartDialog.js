import React from 'react';
import ReactDOM from 'react-dom';
import {Dialog} from './Dialog';

export class SmartDialog {
    static id = 0;

    _selector = '';

    _isClosed = true;

    component;

    styles;

    maskStyles;

    allowOutsideClick = true;

    onClose;

    constructor(options = {}) {
        const opts = {
            component: null,
            styles: {},
            maskStyles: {},
            allowOutsideClick: true,
            onClose: () => {
            },
            ...options
        };
        this._selector = `#smart_dialog_${SmartDialog.id++}`;
        this.component = opts.component;
        this.styles = opts.styles;
        this.maskStyles = opts.maskStyles;
        this.allowOutsideClick = opts.allowOutsideClick;
        this.onClose = opts.onClose;
    }

    show() {
        this._render();
        this._isClosed = false;
    }

    close() {
        this._isClosed = true;
        const el = document.querySelector(this._selector);
        if(el !==null) {
            document.body.removeChild(el);
        }

        if(typeof this.onClose === 'function') {
            this.onClose();
        }
    }

    isClosed() {
        return this._isClosed;
    }

    _render() {
        let el = document.querySelector(this._selector);
        if(el === null) {
            el = document.createElement('div');
            el.id = this._selector.substr(1);
            el.setAttribute('class','smart_dialog');
            document.body.appendChild(el);
        }

        const total = document.getElementsByClassName('smart_dialog').length;

        const props = {
            sequenceId: total,
            total,
            styles: this.styles,
            maskStyles: this.maskStyles,
            allowOutsideClick: this.allowOutsideClick,
            onClose: this.close.bind(this)
        };

        ReactDOM.render(
            <Dialog {...props}>{this.component}</Dialog>,
            el
        );
    }
}