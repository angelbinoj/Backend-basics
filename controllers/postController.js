import { Post } from "../models/postModel.js";


//controller to get posts
export const getPosts= async(req,res)=>{
   const posts = await Post.find();
  res.json(posts);
}

//controller to add posts
export const addPost= async(req,res)=>{
   const newPost = new Post(req.body);
   await newPost.save();
  res.json({message:"new post added", post:newPost});
}

//controller to delete posts
export const deletePost=async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id);
    res.json({message:"Post deleted successfully"})
}

//controller to update posts
export const updatePost=async(req,res)=>{
    const updatedPost=await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
    { new: true }
    );
    res.json({message:"Post updated successfully",post: updatedPost});
}
