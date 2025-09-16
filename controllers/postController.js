import { Post } from "../models/postModel.js";


//controller to get posts
export const getPosts= async(req,res)=>{
   const posts = await Post.find();
  res.json(posts);
}

//controller to add posts
export const addPost= async(req,res)=>{
    try {
        const newPost = new Post(req.body);
        await newPost.save();
       res.json({success:true,message:"new post added successfulyy", post:newPost});
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Failed to add posts",
            error:error.message
        });
    }
}

//controller to delete posts
export const deletePost=async(req,res)=>{
    try {
        const deletedPost= await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            return res.status(404).json({
                success:false,message:"Post not found"
            });
        }
        res.json({success:true,message:"Post deleted successfully"});
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Failed to delete posts",
            error:error.message
        });
    }
}

//controller to update posts
export const updatePost=async(req,res)=>{
    try {
        const updatedPost=await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
        { new: true }
        );
         if(!updatedPost){
                return res.status(404).json({
                    success:false,message:"Post not found"
                });
            }
        res.json({message:"Post updated successfully",post: updatedPost});
        
    } catch (error) {
          res.status(500).json({
            success:false,
            message:"Failed to update posts",
            error:error.message
        });
    }
}
