import React from 'react';
import { Helmet } from 'react-helmet';

function HelmetHead(props) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
        <link rel="icon" type="image/png" href="/assets/leafsense.png" />
      </Helmet>
    </div>
  );
}

export default HelmetHead;
