import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Spread extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
    }

    componentDidMount = () => {
        const firstField = this.rsi_0;

        if (firstField.length) {
            firstField[0].focus();
        }
    }

    parse = (e, count) => {
        const clipboard = e.clipboardData.getData('Text') || '';
        const limit = Math.min(clipboard.length, count);

        e.preventDefault();
        e.stopPropagation();

        const values = clipboard.substr(0, limit);

        // values.split('').map((character, index) =>
            // dispatch(change(formName, `field_${index}`, character, true)),
        // );
    }

    keyDown = (e, index) => {
        const prev = document.querySelectorAll(`input[name="field_${index - 1}"]`);
        const current = document.querySelectorAll(`input[name="field_${index}"]`);
        const isBackspace = e.keyCode === 8;
        const hasValue = (!!current[0].value && current[0].value !== '');

        if (isBackspace && !hasValue) {
            current[0].blur();
            if (prev.length) {
                prev[0].focus();
            }
        }
    }

    keyUp = (e, index) => {
        const current = document.querySelectorAll(`input[name="field_${index}"]`);
        const next = document.querySelectorAll(`input[name="field_${index + 1}"]`);
        const isNumeric = (e.keyCode >= 48 && e.keyCode <= 57) || (/^\d$/.test(e.key));
        const isEnter = e.keyCode === 13;

        // If key pressed was alphanumeric
        if (isNumeric || isEnter) {
            current[0].blur();
            if (next.length) {
                next[0].focus();
            }
        }
    }

    declareReference = (input, index) => {
        this[`rsi_${index}`] = input;
    }

    render = () => {
        const { count, ...props } = this.props;
        const { keyUp, keyDown, paste, declareReference } = this;
        const maxLength = 1;
        const autoComplete = 'off';
        const type = 'tel';
        const required = 'required';
        const defaults = { maxLength, autoComplete, type, required };

        return (
            <div className="input-spread">
                {Array(count).fill().map((_, index) => (
                    <input key={index} ref={(input) => declareReference(input, index)} onKeyUp={(e) => keyUp(e, index)} onKeyDown={(e) => keyDown(e, index)} onPaste={(e) => paste(e, count)} {...defaults} {...props} />
                ))}
            </div>
        );
    }
}
