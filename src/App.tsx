import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { PostAPI } from "./services/PostService";
import { fetchUsersAction } from "./store/actionCreators";
import { userSlice } from "./store/reducers/UserSlice";
import { IPost } from "./types/Post";

const App: React.FC = (): JSX.Element => {
  const { data: posts, refetch } = PostAPI.useFetchAllPostsQuery(100, {
    pollingInterval: 10000,
  });
  const [createPost, {}] = PostAPI.useCreatePostMutation({});
  const [deletePost] = PostAPI.useDeletePostMutation();
  const { count, users, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const { increment } = userSlice.actions;
  const dispatch = useAppDispatch();
  const handleCreate = async () => {
    const title = prompt("");
    await createPost({ title, body: title } as IPost);
  };
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment(1))}>INCREMENT</button>
      <div>
        {users.map((user) => (
          <div>{user.name}</div>
        ))}
      </div>
      <div>{isLoading && <h1>Loading...</h1>}</div>
      <div>{error && <h1>{error}</h1>}</div>
      <button onClick={() => dispatch(fetchUsersAction())}>Fetch Users</button>
      <div>
        {posts?.map((post) => (
          <>
            <div>{post.title}</div>
            <button onClick={() => deletePost({ ...post } as IPost)}>
              delete
            </button>
          </>
        ))}
      </div>
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={handleCreate}>Add Post</button>
    </div>
  );
};

export default App;
