import React from 'react';
import './PostCreator.css';

export default function PostCreator() {
  return (
    <div id='container-pc'>
      <div id='form-container'>
        <form action='/' autoComplete="off">
          <input
            type='text'
            name='bee-name'
            id='bee-name'
            placeholder='Bee Name'
          />
          <textarea
            name='bzz'
            id='bee-body'
            placeholder='Write your bzzz here...'
          ></textarea>
          <div id="btn-cont">
            <button className='submit'>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}