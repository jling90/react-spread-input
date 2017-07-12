import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Spread extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        const values = [];

        Array(props.count).fill().map((_, index) => (
            values[index] = null
        ));

        this.state = { values };
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
        const characters = clipboard.substr(0, limit);
        const { values } = this.state;

        e.preventDefault();
        e.stopPropagation();

        characters.split('').map((character, index) => (
            values[index] = character
        ));
    }

    keyDown = (e, index) => {
        const prev = this[`rsi_${index - 1}`];
        const current = this[`rsi_${index}`];
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
        const current = this[`rsi_${index}`];
        const next = this[`rsi_${index + 1}`];
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

    change = (e, index) => {
        const { values } = this.state;

        values[index] = e.target.value;

        this.setState(values);
    }

    declareReference = (input, index) => {
        this[`rsi_${index}`] = input;
    }

    render = () => {
        const { count, ...props } = this.props;
        const { keyUp, keyDown, paste, change, declareReference } = this;
        const maxLength = 1;
        const autoComplete = 'off';
        const type = 'tel';
        const required = 'required';
        const defaults = { maxLength, autoComplete, type, required };

        return (
            <div className="input-spread">
                {Array(count).fill().map((_, index) => (
                    <input
                      value={this.state.values[index]}
                      key={index}
                      ref={(input) => declareReference(input, index)}
                      onKeyUp={(e) => keyUp(e, index)}
                      onKeyDown={(e) => keyDown(e, index)}
                      onPaste={(e) => paste(e, count)}
                      onChange={(e) => change(e, index)}
                      {...defaults}
                      {...props}
                    />
                ))}
            </div>
        );
    }
}
