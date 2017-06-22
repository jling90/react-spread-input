import React, { Component } from 'react';

class InputSpread extends Component {

    componentDidMount = () => {
        const firstField = document.querySelectorAll('input[name="field_0"]');

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
        const current = document.querySelectorAll(`input[name="field_${index}"]`);
        const next = document.querySelectorAll(`input[name="field_${index + 1}"]`);
        const isAlpha = e.keyCode >= 65 && e.keyCode <= 90;
        const isNumeric = e.keyCode >= 48 && e.keyCode <= 57;

        // If key pressed was alphanumeric
        if (isAlpha || isNumeric) {
            return next.length ? next[0].focus() : current[0].blur();
        }

        return true;
    }

    render = ({ count, ...props }) => {
        const { moveNext, verifyKey } = this;
        const digitFields = Array(count).fill().map((_, index) => (
            <input required key={index} name={`field_${index}`} maxLength="1" autoComplete="off" onKeyUp={(e) => moveNext(e, index)} onKeyDown={verifyKey} {...props} />
        ));

        return (
            <div className="input-spread">
                {digitFields}
            </div>
        );
    }
}

export default InputSpread;
