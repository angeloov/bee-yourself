import React, { useState, useRef } from 'react';
import './PostCreator.css';

export default function PostCreator(props) {
  const [bzzBody, setBzzBody] = useState('');
  const refreshHome = useRef(false);

  const handleChange = e => {
    setBzzBody(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    document.getElementById('grayedout').style.display = 'block';

    // Add bee at the end of the string
    /* if (/bee$/.test(beeName)) {
      finalName = beeName.split('').slice(0, -3);
      finalName = finalName.join('');
    }
    if (!/Bee$/.test(beeName)) {
      finalName = finalName + 'Bee';
    } */

    let request = await fetch('http://localhost:5000/create/bzz', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `bzzBody=${bzzBody}`,
    });

    // When a post is sent to the server the home component will refresh, along with all the posts.
    if (request.ok) {
      document.getElementById('grayedout').style.display = 'none';
      props.onPostCreated(refreshHome.current);
      refreshHome.current = !refreshHome.current;
    }

    setBzzBody('');
  };

  return (
    <div>
      <div className='container-pc'>
        <div id='form-container'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <textarea
              name='bzzBody'
              id='bee-body'
              placeholder='Write your bzzz here...'
              value={bzzBody}
              onChange={handleChange}
            ></textarea>
            <div id='btn-cont'>
              <input type='submit' className='submit' value='Post'></input>
            </div>
          </form>
        </div>
      </div>
      <div id='grayedout'></div>
    </div>
  );
}
