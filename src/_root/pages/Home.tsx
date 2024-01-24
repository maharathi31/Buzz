import { Models } from "appwrite";
import Loader from "../../components/ui/shared/Loader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import PostCard from "../../components/ui/shared/PostCard";

const Home = () => {
  
  const {data:posts,isPending:isPostLoading}=useGetRecentPosts()
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Home Feed
          </h2>
          {
            isPostLoading && !posts?(
              <Loader/>
            ):(
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.documents.map((post:Models.Document)=>(
                  <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} key={post.caption}/>
                </li>
                ))}
              </ul>
            )
          }
        </div>
      </div>
      
    </div>
  )
};

export default Home;
