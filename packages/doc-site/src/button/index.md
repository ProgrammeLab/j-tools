# Button 按钮

## 基本使用

```tsx
import { Button } from 'jj-design';

export default () => {
  return (
    <>
      <Button>Default</Button>
      &nbsp;
      <Button btnType="primary">Primary</Button>
      &nbsp;
      <Button btnType="text">text btn</Button>
      &nbsp;
      <Button btnType="danger">danger btn</Button>
    </>
  );
};
```

## size

```tsx
import { Button } from 'jj-design';

export default () => {
  return (
    <>
      <Button>default middle</Button>
      &nbsp;
      <Button size="small">small</Button>
      &nbsp;
      <Button size="large">large</Button>
    </>
  );
};
```

## round 圆角

```tsx
import { Button } from 'jj-design';

export default () => {
  return (
    <>
      <Button round>round button</Button>
    </>
  );
};
```

## block 全宽

```tsx
import { Button } from 'jj-design';

export default () => {
  return (
    <>
      <Button block>block button</Button>
    </>
  );
};
```
