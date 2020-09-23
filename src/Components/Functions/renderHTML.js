import React from 'react'

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  export default renderHTML