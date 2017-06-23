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

    verifyKey = (e) => {
        const isAlpha = e.keyCode >= 65 && e.keyCode <= 90;
        const isNumeric = e.keyCode >= 48 && e.keyCode <= 57;

        // If key pressed was alphanumeric
        if (!isAlpha && !isNumeric) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    moveNext = (e, index) => {
        const current = this[`rsi_${index}`];
        const next = this[`rsi_${index + 1}`];
        const isAlpha = e.keyCode >= 65 && e.keyCode <= 90;
        const isNumeric = e.keyCode >= 48 && e.keyCode <= 57;

        // If key pressed was alphanumeric
        if (isAlpha || isNumeric) {
            return next.length ? next[0].focus() : current[0].blur();
        }

        return true;
    }

    declareReference = (input, index) => {
        this[`rsi_${index}`] = input;
    }

    render = () => {
        const { count, ...props } = this.props;
        const { moveNext, verifyKey, declareReference } = this;

        return (
            <div className="input-spread">
                {Array(count).fill().map((_, index) => (
                    <input required key={index} ref={(input) => declareReference(input, index)} maxLength="1" autoComplete="off" onKeyUp={(e) => moveNext(e, index)} onKeyDown={verifyKey} {...props} />
                ))}
            </div>
        );
    }
}
