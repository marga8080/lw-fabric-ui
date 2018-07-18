import React from 'react';


export function Text(props) {
  return <span {...props}>{props.children}</span>;
}
export function Image(props) {
  return (
    <img
      style={props.style}
      src={props.source}
      className={props.className}
      alt=""
    />
  );
}
export function View(props) {
  return <div {...props}>{props.children}</div>;
}
