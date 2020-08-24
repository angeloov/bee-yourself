import React, { useState, useRef } from 'react';
import './PostCreator.css';

export default function PostCreator(props) {
  const [beeName, setBeeName] = useState('');
  const [bzzBody, setBzzBody] = useState('');
  const refreshHome = useRef(false);
  
  const handleChange = e => {
    if (e.target.name === 'beeName') {
      setBeeName(e.target.value);
    } else {
      setBzzBody(e.target.value);
    }
  };
  
  const handleSubmit = async e => {
    let finalName = beeName;
    e.preventDefault();
    document.getElementById('grayedout').style.display = 'block';

    // Add bee at the end of the string
    if (/bee$/.test(beeName.current)) {
      finalName = beeName.split('').slice(0, -3);
      finalName = finalName.join('');
    }
    if (!/Bee$/.test(beeName.current)) {
      finalName = finalName + 'Bee';
    }

    let request = await fetch('http://localhost:5000/create/bzz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `beeName=${finalName}&bzzBody=${bzzBody}`,
    });

    // When a post is sent to the server the home component will refresh, along with all the posts.
    if (request.ok) {
      document.getElementById('grayedout').style.display = 'none';
      props.onPostCreated(refreshHome.current);
      refreshHome.current = !refreshHome.current;
    }

    setBeeName('');
    setBzzBody('');
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
              value={beeName}
              onChange={handleChange}
            />
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
