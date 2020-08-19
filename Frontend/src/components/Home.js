import React from 'react';
import PostCreator from '../UI Components/PostCreator';
import Post from '../UI Components/Post';

let postsArray = [];

(async () => {
  let x = await fetch('http://localhost:5000/getall/bzz');
  let data = await x.json();

  data.forEach(element => {
    //console.log(element.beeName, element.bzzBody, element.timestamp);
    postsArray.push([element.beeName, element.bzzBody, element.timestamp])
  });

  console.log(postsArray);
})();

export default function Home() {
  return (
    <div>
      <PostCreator />
      <div style={{ marginTop: 20 }}>
        <Post
          username='Angelo'
          body='Ciao! 😊'
          timestamp={new Date().toLocaleString()}
        />
      </div>
    </div>
  );
}
