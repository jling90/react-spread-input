# React Spread Input

![Example](https://cdn.dribbble.com/users/584114/screenshots/3467631/verification.gif)

**Usage**

```js
import ReactInputSpread from 'react-spread-input';

const count = 6;
const onChange = (value) => (
    console.log(value)  // '194191'
)

const Spread = ({ onChange, count }) => (
    <ReactInputSpread count={count} onChange={onChange} />
);
```
