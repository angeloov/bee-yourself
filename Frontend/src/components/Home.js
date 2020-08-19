import React, { useEffect, useState } from 'react';
import PostCreator from '../UI Components/PostCreator';
import Post from '../UI Components/Post';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let x = await fetch('http://localhost:5000/getall/bzz');
      let data = await x.json();
      
      let postComponents = [];
      data.forEach(el => {
        postComponents.unshift(
          <Post
            key={el._id}
            username={el.beeName}
            body={el.bzzBody}
            timestamp={el.timestamp}
          />
        );
      });

      setPosts(postComponents);
    })();
  }, []);
  return (
    <div>
      <PostCreator />
      <div style={{ marginTop: 20 }}>{posts}</div>
    </div>
  );
}
