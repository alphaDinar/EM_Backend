import React, { useRef } from 'react';

function Test() {
  const items = ['item 1', 'item 2', 'item 3'];

  // Define a useRef hook
  const myRef = useRef(null);

  return (
    <div>
      {items.map((item, index) => (
        <MyItem key={index} item={item} ref={myRef} />
      ))}
    </div>
  );
}

// Component that will use the ref
const MyItem = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <span>{props.item}</span>
    </div>
  );
});

export default Test





