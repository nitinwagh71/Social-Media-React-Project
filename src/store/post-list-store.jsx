import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useReducer } from "react";

// Context-API
export const PostListData = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

// Pure reducer function.
const postListReducer = (currentList, action) => {
  let newPostList = currentList;

  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "DELETE_POST") {
    newPostList = currentList.filter(
      (post) => post.id !== action.payload.postId
    );
  }
  return newPostList;
};

// PostListProvider Component
const PostListProvider = ({ children }) => {
  // useReducer hook
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  // addPost for single post(CreatePost). s->s then showing
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  // addInitialPosts fetching data from api
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts: posts,
      },
    });
  };

  // deletePost 
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
  };

  // Fetching data from dummy api and calling addInitialPosts().
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <PostListData.Provider
        value={{
          postList: postList,
          fetching: fetching,
          addPost: addPost,
          deletePost: deletePost,
        }}
      >
        {children}
      </PostListData.Provider>
    </>
  );
};

export default PostListProvider;
