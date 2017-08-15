/* eslint-disable import/no-extraneous-dependencies, no-console */

import React from 'react';
import { render } from 'react-dom';
import Spread from '../index';

const root = document.getElementById('root');
const markup = (
    <div>
        <h1>react-spread-input demo</h1>
        <Spread count={6} onChange={console.log} />

        <br />

        <Spread disabled count={6} onChange={console.log} />

        <br />

        <Spread required count={6} onChange={console.log} />

        <br />

        <Spread value="123" count={6} onChange={console.log} />

        <br />

        <Spread value="123456" count={6} onChange={console.log} />
    </div>
);

render(markup, root);
