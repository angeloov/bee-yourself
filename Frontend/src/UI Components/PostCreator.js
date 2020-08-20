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

  const handleSubmit = e => {
    e.preventDefault();

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
    (async () => {
      document.getElementById('grayedout').style.display = 'block';
      let request = await fetch('http://localhost:5000/create/bzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `beeName=${beeName.current}&bzzBody=${bzzBody.current}`,
      });

      /* let wait500ms = new Promise(resolve => {
        setTimeout(() => resolve('done'), 500);
      }); */

      if (request.ok) {
        /* await wait500ms; */
        document.getElementById('grayedout').style.display = 'none';
      }
      // TODO: Else -> handle server error

      document.querySelector('#bee-name').value = '';
      document.querySelector('#bee-body').value = '';
    })();

    // TODO: Refresh the posts
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
              <input
                type='submit'
                className='submit'
                value='Post'
                onClick={() => {
                  // When you click the button the state of the home component changes, and so does the
                  // home components itself, showing the post that you posted. 
                  props.onPostCreated(refreshHome.current);
                  refreshHome.current = !refreshHome.current;
                }}
              ></input>
            </div>
          </form>
        </div>
      </div>
      <div id='grayedout'></div>
    </div>
  );
}
