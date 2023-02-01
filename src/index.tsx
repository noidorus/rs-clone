// eslint-disable-next-line no-use-before-define
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

console.log('hahahah');

const elem = (
  <div>
    <h1>RS Clone</h1>
  </div>
);

hydrateRoot(document.getElementById('root'), elem);
