import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Spread extends Component {

    static propTypes = {
        className: PropTypes.string,
        regex: PropTypes.instanceOf(RegExp),
        onChange: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        value: PropTypes.string,
        successStyle: PropTypes.objectOf(PropTypes.string),
        errorStyle: PropTypes.objectOf(PropTypes.string),
    }

    static defaultProps = {
        className: '',
        regex: /^\d$/,
        value: '',
        successStyle: { boxShadow: '0 0 0 2px #20FC8F' },
        errorStyle: { boxShadow: '0 0 0 2px #FF1C7C' },
    }

    constructor(props) {
        super(props);

        const { count, value } = props;
        const values = [];
        const classNames = [];

        Array(count).fill().forEach((q, index) => {
            values[index] = '';
            classNames[index] = '';
        });

        if (value) {
            value.split('').forEach((entry, index) => {
                values[index] = entry;
                classNames[index] = 'success';
            });
        }

        this.state = { values, classNames, keyIsDown: false };
    }

    componentDidMount = () => {
        const firstField = this.rsi_0;

        if (firstField) {
            firstField.focus();
        }

        this.keyDown = _.throttle(this.keyDown.bind(this), 20);
        this.keyUp = _.throttle(this.keyUp.bind(this), 20);
    }

    setValue = (index, value) => {
        const { values } = this.state;
        values[index] = value;
        this.setState({ values });
    }

    paste = (e, count) => {
        const clipboard = e.clipboardData.getData('Text') || '';
        const limit = Math.min(clipboard.length, count);
        const characters = clipboard.substr(0, limit);
        const { values } = this.state;

        e.preventDefault();
        e.stopPropagation();

        characters.split('').forEach((character, index) => (
            values[index] = character
        ));
    }


    keyDown = (key, index) => {
        if (this.state.keyIsDown) return;
        const { regex } = this.props;
        if (regex.test(key)) {
            this.setValue(index, '');
        }
        this.setState({ keyIsDown: true });
    }

    keyUp = (key, keyCode, index) => {
        if (!this.state.keyIsDown) return;
        this.setState({ keyIsDown: false });

        const { regex } = this.props;
        const prev = this[`rsi_${index - 1}`];
        const current = this[`rsi_${index}`];
        const next = this[`rsi_${index + 1}`];
        const isEnter = keyCode === 13;
        const isBackspace = keyCode === 8;
        const hasValue = (!!current.value && current.value !== '');
        const { classNames } = this.state;

        if (isBackspace) {
            if (hasValue) {
                this.setValue(index, '');
                classNames[index] = 'error';
            } else {
                current.blur();
                if (prev) {
                    prev.focus();
                }
            }
            return;
        }

        // If key pressed was alphanumeric
        if (regex.test(key) || isEnter) {
            current.blur();

            classNames[index] = regex.test(key) ? 'success' : 'error';
            this.setState({ classNames });

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
            this.setState({ classNames });
        }
    }

    declareReference = (input, index) => {
        this[`rsi_${index}`] = input;
    }

    render = () => {
        const { count, onChange, className, regex, value, successStyle, errorStyle, ...props } = this.props;
        const { keyUp, keyDown, paste, change, declareReference } = this;
        const maxLength = 1;
        const autoComplete = 'off';
        const type = 'text';
        const required = 'required';
        const defaults = { maxLength, autoComplete, type, required };

        return (
            <div className={classnames('input-spread', className)}>
                {Array(count).fill().map((q, index) => {
                    let styles = {};
                    if (this.state.classNames[index] === 'success') {
                        styles = { ...styles, ...successStyle };
                    } else if (this.state.classNames[index] === 'error') {
                        styles = { ...styles, ...errorStyle };
                    }
                    return (
                        <input
                          value={this.state.values[index]}
                          className={this.state.classNames[index]}
                          key={index}
                          ref={(input) => declareReference(input, index)}
                          onKeyUp={(e) => { keyUp(e.key, e.keyCode, index); }}
                          onKeyDown={(e) => { keyDown(e.key, index); }}
                          onPaste={(e) => paste(e, count)}
                          onChange={(e) => change(e, index, onChange)}
                          style={styles}
                          {...defaults}
                          {...props}
                        />
                    );
                })}
            </div>
        );
    }
}
