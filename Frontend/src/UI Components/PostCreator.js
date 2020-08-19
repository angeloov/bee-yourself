import React, { useState } from 'react';
import './PostCreator.css';

export default function PostCreator() {
  const [beeName, setBeeName] = useState('');
  const [bzzBody, setBzzBody] = useState('');

  const handleChange = e => {
    if (e.target.name === 'beeName') {
      setBeeName(e.target.value);
      console.log(beeName);
    } else {
      setBzzBody(e.target.value);
      console.log(bzzBody);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    (async () => {
      let request = await fetch('http://localhost:5000/create/bzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `beeName=${beeName}&bzzBody=${bzzBody}`,
      });
      console.log(request.ok)
      /* let response = await request.json();
      if (response === 'Succesful') {
        console.log('Finire il caricamento');
      } */
      setBeeName('');
      setBzzBody('');
    })();
  };

  return (
    <div id='container-pc'>
      <div id='form-container'>
        <form autoComplete='off'>
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
              onClick={handleSubmit}
              value='Post'
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
