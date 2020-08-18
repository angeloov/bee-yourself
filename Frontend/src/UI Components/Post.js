// RFC
import React from 'react';
import './Post.css';
import BeeImage from '../Assets/bee.svg';

// Props:
// BeeName, PostBody, Datastamp
export default function Post(props) {
  return (
    <div className='container'>
      <div className='user-info'>
        <img src={BeeImage} alt='Bee Profile Pic' id='bee-img' />
        <div class="userinfo-detailed">
  <p class='username-bee'>{props.username}</p>
          <p class='says-bee'>says</p>
        </div>
      </div>
      <div style={{wordWrap: "break-word"}}>
        <p class="bzz-content">
          {props.body}
        </p>
        <p class="bzz-timestamp">{props.timestamp}</p>
      </div>
    </div>
  );
}
