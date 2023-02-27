import React, { MouseEventHandler } from 'react';
import './toggle.scss';

interface Props {
  value: boolean;
  onChange: MouseEventHandler;
}

const Toggle = ({ value, onChange }: Props) => (
  <label className='root' htmlFor="toggler">
    <input
      id="toggler"
      type="checkbox"
      onClick={onChange}
      checked={value}
      readOnly
    />
    <span className='slider' />
    <span className='wave' />
  </label>
);

export default Toggle;