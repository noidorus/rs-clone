// eslint-disable-next-line no-use-before-define
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

console.log('hahahah');
const root = document.getElementById('root') as HTMLDivElement;

const elem = (
  <div>
    <h1>RS Clone</h1>
  </div>
);

hydrateRoot(root, elem);
