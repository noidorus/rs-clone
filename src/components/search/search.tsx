import React, { useState } from 'react';
import { SearchPropsType } from '../../types/types';
import './search.scss'

export function Search(props: SearchPropsType) {


  return (
    <div style={{
      position: 'relative',
      display: 'inline-block'
    }}>
      <input 
        className='field'
        type='text'
        placeholder='Search'
        value={props.value}
        onChange={props.handleChange}/>
        <div 
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'grey',
            position: 'absolute',
            top: '5px',
            right: '5px',
            borderRadius: '50%',
            color: 'white',
            textAlign: 'center',
            fontSize: '7px'
          }}
          onClick={props.clearInput}

          >x</div>
    </div>
  )
}
