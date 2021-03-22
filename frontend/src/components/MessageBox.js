import React from 'react';
const MessageBox = ({ msg, variant }) => {
  return (<div className={`alert alert-${variant || 'info'}`} > { msg}</div >);
};

export default MessageBox;