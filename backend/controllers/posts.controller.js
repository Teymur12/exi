import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const createPost = async (request, response) => {
    const { title, body } = request.body;
    const userId = request.userId;
    try {
        if (!title || !body) {
            return response.status(400).json({ error: "Lütfen tüm alanları doldurun" });
        }

        const newPost = await Post.create({
            title,
            body,
            postedBy: userId
        });

        response.status(201).json({ result: newPost, msg: "Gönderi başarıyla oluşturuldu" });
    } catch (error) {
        response.status(500).json({ error: "Gönderi oluşturulurken bir hata oluştu" });
    }
};

export const likeUnlikePost = async (request, response) => {
    const { id } = request.params;
    const userId = request.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ error: 'Geçersiz postId formatı' });
    }

    const post = await Post.findById(id);

    if (!post) {
        return response.status(404).send({ error: 'Post bulunamadı' });
    }

    if (post.likes.includes(userId)) {
        const index = post.likes.indexOf(userId);
        post.likes.splice(index, 1);
        await post.save();
        return response.status(200).json({ message: "Post Unliked" });
    } else {
        post.likes.push(userId);
        await post.save();
        return response.status(200).json({ message: "Post Liked" });
    }
};

export const newComment = async (request, response) => {

    const { id } = request.params;

    const {comment} = request.body; 
    const post = await Post.findById(id);
    const  userId  = request.userId;

    if (!post) {
        return response.status(404).send({error: 'Not Found'});
    }
    const senderUser =await User.findById(userId);
    post.comments.push({
        user: userId,
        comment: comment,
        username: senderUser.userName
    });

    await post.save();

    return response.status(200).json({
        message: "Comment Added"
    });
};

export const deleteComment = async (request, response) => {
    const { id, commentId } = request.params;
    const userId = request.userId;

    const post = await Post.findById(id);

    if (!post) {
        return response.status(404).send({ error: 'Post Not Found' });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
        return response.status(404).send({ error: 'Comment Not Found' });
    }

    if (comment.user.toString() !== userId) {
        return response.status(403).send({ error: 'Unauthorized' });
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);

    await post.save();

    return response.status(200).json({
        message: "Comment Deleted"
    });
};



export const getAllPosts = async (request, response) => {
    try {
        const posts = await Post.find({})
        response.status(200).json({ posts });
    } catch (error) {
        response.status(500).json({ error: "Gönderiler getirilirken bir hata oluştu" });
    }
};