import { useContext, useRef } from "react";
import { PostListData } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListData);
  const userIdElement = useRef();
  const userTitleElement = useRef();
  const userBodyElement = useRef();
  const userRactionsElement = useRef();
  const userTagsElement = useRef();

  const handleAddPost = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const userTitle = userTitleElement.current.value;
    const userBody = userBodyElement.current.value;
    const userReactions = userRactionsElement.current.value;
    const userTags = userTagsElement.current.value.split(" ");

    userIdElement.current.value = " ";
    userTitleElement.current.value = " ";
    userBodyElement.current.value = " ";
    userRactionsElement.current.value = " ";
    userTagsElement.current.value = " ";

    // Take user data and send to server and return a response.
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: userTitle,
        body: userBody,
        reactions: {
          likes: userReactions,
        },
        userId: userId,
        tags: userTags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
      });
  };

  return (
    <form className="create-post" onSubmit={handleAddPost}>
      <div className="mb-3">
        <label htmlFor="user-id" className="form-label">
          Enter userId here
        </label>
        <input
          type="text"
          ref={userIdElement}
          placeholder="Enter Your Id here"
          className="form-control"
          id="user-id"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={userTitleElement}
          placeholder="Enter Title here.."
          className="form-control"
          id="title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          rows="6"
          type="text"
          ref={userBodyElement}
          placeholder="Tell me something .."
          className="form-control"
          id="body"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of Reactions
        </label>
        <input
          type="text"
          ref={userRactionsElement}
          placeholder="Enter reactions"
          className="form-control"
          id="reactions"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          ref={userTagsElement}
          placeholder="Enter hashtags here.."
          className="form-control"
          id="tags"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
