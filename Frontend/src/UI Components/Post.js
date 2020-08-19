// RFC
import React from 'react';
import './Post.css';
import BeeImage from '../Assets/bee.svg';

// Props:
// BeeName, PostBody, Datastamp
export default function Post(props) {
  return (
    <div className='post-container'>
      <div className='user-info'>
        <img src={BeeImage} alt='Bee Profile Pic' id='bee-img' />
        <div className='userinfo-detailed'>
          <p className='username-bee'>{props.username}</p>
          <p className='says-bee'>says</p>
        </div>
      </div>
      <div style={{ wordWrap: 'break-word' }}>
        <p className='bzz-content'>{props.body}</p>
        <p className='bzz-timestamp'>{props.timestamp}</p>
      </div>
    </div>
  );
}
