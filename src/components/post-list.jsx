import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { addPost, fetchPosts, fetchTags } from '../api/api';
import "./post.css"


const PostList = () => {
  const { data: postData, isLoading, isError, error } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPosts,
  });

 const {data:tagsData}= useQuery({
    queryKey: ["tags"],
    queryFn:fetchTags
  })
  console.log(tagsData);


  const queryClient = useQueryClient();

 const {mutate , isError :isPostError , isPending , error:postError , reset } = useMutation({
    mutationFn: addPost,
    onMutate :()=>{
       return {id :1}
    } ,
    onSuccess:(data , varialbles, context  )=>{
           queryClient.invalidateQueries({
              queryKey:["post"] ,

           })
    },
    onError:(error,varialbles, context )=>{},
    onSettled:(data , varialbles, context)=>{},
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
     const formData= new FormData(e.target);
     const title= formData.get("title");
     const tags= Array.from(formData.keys()).filter((key)=> formData.get(key)==="on");
     
     if(!title || !tags) return;

     mutate({id:postData.length + 1 , title , tags});

       e.target.reset();
  }




  return (
    <div className="container">

    <form onSubmit={handleSubmit}>
        <input type="text"
        placeholder='Enter your Post'
        className='postbox'
        name='title' />

        <div className="tags">
            {tagsData?.map((tag)=>{
                return (
                    <div key={tag}>
                        <input name={tag} id={tag} type="checkbox" />
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                )
            })}
        </div>
   <button>Post</button>
    </form>

      {isLoading && isPending&& <p>Loading...</p>}
      {isError &&  <p>{error?.message}</p>}
      {isPostError && <p onClick={()=>reset()}>Unable to Post</p> }

      {postData ? (
        postData.map((post) => (
          <div key={post.id} className="post">
            <div>{post.title}</div>
            {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
       example
    </div>
  );
};

export default PostList;
