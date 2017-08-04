# React Spread Input

![Example](https://cdn.dribbble.com/users/584114/screenshots/3467631/verification.gif)

**Usage**

```js
import ReactInputSpread from 'react-spread-input';

const count = 6;
const className = 'input-spread';
const onChange = (value) => (
    console.log(value)  // '194191'
);

const props = { count, className, onChange };

const Spread = (props) => (
    <ReactInputSpread {...props} />
);
```

**Adding custom regex**

```js
...

<ReactInputSpread regex={/^[A-Z0-9-]$/} {...props} />

```
