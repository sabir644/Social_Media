import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts} = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    
    setFetching(true);
  
    console.log("erroe before fetch");
    fetch('https://dummyjson.com/posts')
    .then((res) => res.json())
    .then((obj)=>{
      console.log(obj.posts);
      addInitialPosts(obj.posts);
      setFetching(false);

    }); 
    console.log("error after function");
   }, []);

  return (
    <>
      {fetching &&<LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      <div className="arange">
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default PostList;