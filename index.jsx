import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Spread extends Component {

    static propTypes = {
        className: PropTypes.string,
        regex: PropTypes.instanceOf(RegExp),
        onChange: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
    }

    static defaultProps = {
        className: '',
        regex: /^\d$/,
    }

    constructor(props) {
        super(props);

        const values = [];
        const classNames = [];

        Array(props.count).fill().map((_, index) => {
            values[index] = '';
            classNames[index] = '';
            return index;
        });

        this.state = { values, classNames };
    }

    componentDidMount = () => {
        const firstField = this.rsi_0;

        if (firstField) {
            firstField.focus();
        }
    }

    setValue = (index, value) => {
        const { values } = this.state;
        values[index] = value;
        this.setState(values);
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
        // const hasValue = (!!current.value && current.value !== '');

        if (isBackspace) {
            this.setValue(index, '');
            current.blur();
            if (prev) {
                prev.focus();
            }
        }
    }

    keyUp = (e, index) => {
        const { regex } = this.props;
        const current = this[`rsi_${index}`];
        const next = this[`rsi_${index + 1}`];
        const isEnter = e.keyCode === 13;

        // If key pressed was alphanumeric
        if (regex.test(e.key) || isEnter) {
            current.blur();

            const { classNames } = this.state;
            classNames[index] = regex.test(e.key) ? 'success' : 'error';
            this.setState(classNames);

            if (next) {
                next.focus();
            }
        }
    }

    change = (e, index, onChange) => {
        const { regex } = this.props;
        const { classNames, values } = this.state;

        // check if the input matches regex validation
        if (regex.test(e.target.value)) {
            this.setValue(index, e.target.value);
            onChange(e, values.join(''));
        } else {
            classNames[index] = regex.test(values[index]) ? 'success' : 'error';
            this.setState(classNames);
        }
    }

    declareReference = (input, index) => {
        this[`rsi_${index}`] = input;
    }

    render = () => {
        const { count, onChange, className, regex, ...props } = this.props;
        const { keyUp, keyDown, paste, change, declareReference } = this;
        const maxLength = 1;
        const autoComplete = 'off';
        const type = 'tel';
        const required = 'required';
        const defaults = { maxLength, autoComplete, type, required };

        return (
            <div className={classnames('input-spread', className)}>
                {Array(count).fill().map((_, index) => (
                    <input
                      value={this.state.values[index]}
                      className={this.state.classNames[index]}
                      key={index}
                      ref={(input) => declareReference(input, index)}
                      onKeyUp={(e) => keyUp(e, index)}
                      onKeyDown={(e) => keyDown(e, index)}
                      onPaste={(e) => paste(e, count)}
                      onChange={(e) => change(e, index, onChange)}
                      {...defaults}
                      {...props}
                    />
                ))}
            </div>
        );
    }
}
