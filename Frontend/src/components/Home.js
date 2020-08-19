import React, { useEffect, useState } from 'react';
import PostCreator from '../UI Components/PostCreator';
import Post from '../UI Components/Post';

async function getAllPosts() {
  let x = await fetch('http://localhost:5000/getall/bzz');
  let data = await x.json();
  return data;
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [hasToRefresh, setHasToRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await getAllPosts();
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
  }, [hasToRefresh]);
  return (
    <div>
      <PostCreator onPostCreated={setHasToRefresh} />
      <div style={{ marginTop: 20 }}>{posts}</div>
    </div>
  );
}
