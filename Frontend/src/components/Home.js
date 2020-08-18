import React from 'react';
import PostCreator from '../UI Components/PostCreator';
import Post from '../UI Components/Post';

export default function Home() {
  return (
    <div>
      <PostCreator />
      <div style={{marginTop: 20}}>
        <Post username="Angelo" body="Ciao! 😊" timestamp={(new Date()).toLocaleString()}/>
      </div>
    </div>
  );
}
