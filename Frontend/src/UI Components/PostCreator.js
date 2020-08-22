import React, { useRef } from 'react';
import './PostCreator.css';

export default function PostCreator(props) {
  const beeName = useRef('');
  const bzzBody = useRef('');
  const refreshHome = useRef(false);

  const handleChange = e => {
    if (e.target.name === 'beeName') {
      beeName.current = e.target.value;
    } else {
      bzzBody.current = e.target.value;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    document.getElementById('grayedout').style.display = 'block';

    // Add bee at the end of the string
    if (/bee$/.test(beeName.current)) {
      let temp = beeName.current.split('');
      temp = temp.slice(0, -3);
      beeName.current = temp.join('');
    }
    if (!/Bee$/.test(beeName.current)) {
      beeName.current = beeName.current + 'Bee';
    }

    // Send request to server
    let request = await fetch('http://localhost:5000/create/bzz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `beeName=${beeName.current}&bzzBody=${bzzBody.current}`,
    });

    // When a post is sent to the server the home component will refresh, along with all the posts.
    if (request.ok) {
      document.getElementById('grayedout').style.display = 'none';
      props.onPostCreated(refreshHome.current);
      refreshHome.current = !refreshHome.current;
    }

    document.querySelector('#bee-name').value = '';
    document.querySelector('#bee-body').value = '';

    beeName.current = '';
    bzzBody.current = '';
  };

  return (
    <div>
      <div className='container-pc'>
        <div id='form-container'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <input
              type='text'
              name='beeName'
              id='bee-name'
              placeholder='Bee Name'
              onChange={handleChange}
            />
            <textarea
              name='bzzBody'
              id='bee-body'
              placeholder='Write your bzzz here...'
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
