import React, { useEffect, useRef, useState } from 'react';
import tate from "../image/atate.jpg";
import { BsThreeDots } from "react-icons/bs";
import send from "../image/send.png";
import save from "../image/save-instagram.png";
import comment from "../image/chat.png";
import { timeSince } from '../utils/utils';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../post/postAction';

const Posts = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [isRed, setIsRed] = useState({});
    const commentRef = useRef({});

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likings")) || [];
        const initialIsRed = storedLikes.reduce((acc, postId) => {
            acc[postId] = true;
            return acc;
        }, {});
        setIsRed(initialIsRed);
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch('/api/post/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.log('Server error:', errorMessage);
                } else {
                    const data = await response.json();
                    setPosts(data.posts);
                }
            } catch (error) {
                console.error('Error during fetching posts:', error);
            }
        };
        
        getPosts();
    }, [posts]);

    const handleClick = (id) => {
        const updatedIsRed = { ...isRed };
        const storedLikes = JSON.parse(localStorage.getItem("likings")) || [];
        
        if (updatedIsRed[id]) {
            delete updatedIsRed[id];
            dispatch(unlikePost(id));
            const newStoredLikes = storedLikes.filter(likeId => likeId !== id);
            localStorage.setItem("likings", JSON.stringify(newStoredLikes));
        } else {
            updatedIsRed[id] = true;
            dispatch(likePost(id));
            storedLikes.push(id);
            localStorage.setItem("likings", JSON.stringify(storedLikes));
        }
        
        setIsRed(updatedIsRed);
    };

    const sendComment = async (id) => {
        const commentValue = commentRef.current[id]?.value.trim();
        if (!commentValue) return;

        const response = await fetch(`/api/post/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: commentValue }),
        });
        
        if (!response.ok) {
            console.log("Comment not sent");
        } else {
            alert("Comment successfully sent");
            commentRef.current[id].value = ''; 
        }
    };

    return (
        <div className='grid justify-center pb-6'>
            <div className='w-[468px] h-auto border-b border-t bg-white'>
                <div className='pb-4 pt-4'>
                    {posts.map(post => (
                        <div key={post._id}>
                            <div className='flex h-[50px] w-[100%] justify-between items-center'>
                                <div className='w-[200px] flex items-center ml-[10px] mt-[10px] gap-3'>
                                    <a className='flex items-center' href="">
                                        <img className='w-[40px] h-[40px] object-cover rounded-[50%] border' src={tate} alt="" />
                                        <p className='font-semibold text-[14px] ml-[10px]'>Loyd</p>
                                    </a>
                                    <p className='text-xs text-gray-500'>
                                        {timeSince(new Date(post.createdAt))}
                                    </p>
                                </div>
                                <i className='w-[30px] text-[16px] mt-[16px]'><BsThreeDots /></i>
                            </div>
                            <div>
                                <div className='h-[400px] mt-[12px] object-cover'>
                                    <img className='w-[100%] h-[100%] object-cover' src={tate} alt="" />
                                </div>
                            </div>
                            <div className='grid gap-y-2 mt-3'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-4'>
                                        <button onClick={() => handleClick(post._id)} className='text-[22px]'>
                                            <FaHeart style={{ color: isRed[post._id] ? 'red' : 'black' }} />
                                        </button>
                                        <button className='w-[22px]'>
                                            <img src={comment} alt="" />
                                        </button>
                                        <button className='w-[22px]'>
                                            <img src={send} alt="" />
                                        </button>
                                    </div>
                                    <button className='w-[22px]'>
                                        <img src={save} alt="" />
                                    </button>
                                </div>
                                <div>
                                    <h6 className='text-sm font-semibold'>{post.likes.length} likes</h6>
                                </div>
                                <div className='flex gap-3'>
                                    <span className='font-bold text-xs'>{post.title}</span>
                                    <span className='text-xs font-medium text-gray-700'>{post.body}</span>
                                </div>
                                <div>
                                    <button className='text-gray-500 text-s' type='button'>View all comments</button>
                                </div>
                                {post.comments && post.comments.map(comment =>(
                                        <div className='flex justify-between mb-3'>
                                        <h6 className='flex gap-1 items-center'>
                                            <a href=""></a>
                                            <img src={tate} className='w-[25px] h-[25px] rounded-[50%]' alt="" />
                                            <span className='font-bold text-[13px]'>{comment.username}</span>
                                            <p className='text-gray-600 text-[13px]'>{comment.comment}</p>
                                        </h6>
                                        </div>
                                ))}
                                <div className='max-h-[85px]'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <input type="text" placeholder='Add a comment...' ref={el => commentRef.current[post._id] = el} />
                                        </div>
                                        <div>
                                            <button className='text-gray-500' onClick={() => sendComment(post._id)}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
