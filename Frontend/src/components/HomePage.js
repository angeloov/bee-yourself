import React, { useEffect, useState } from 'react';
import PostCreator from '../UI Components/PostCreator';
import Post from '../UI Components/Post';
import Header from './Header';

async function getAllPosts() {
  let x = await fetch('http://localhost:5000/getall/bzz');
  let data = await x.json();
  return data;
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [hasToRefresh, setHasToRefresh] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getAllPosts();
      let postComponents = data.map(el => {
        return (
          <Post
            key={el._id}
            username={el.beeName}
            body={el.bzzBody}
            timestamp={el.timestamp}
          />
        );
      });
      postComponents.reverse();
      setPosts(postComponents);
    })();
  }, [hasToRefresh]);
  return (
    <div>
      <Header />
      <PostCreator onPostCreated={setHasToRefresh} />
      <div style={{ marginTop: 20 }}>{posts}</div>
    </div>
  );
}
