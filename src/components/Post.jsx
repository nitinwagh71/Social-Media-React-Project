import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostListData } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListData);

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
          {post.title}
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtags">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          {`This post has been reacted by ${post.reactions.likes} people.`}
        </div>
      </div>
    </div>
  );
};
export default Post;
