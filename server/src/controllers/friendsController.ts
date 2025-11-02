// import mongoose from 'mongoose'
// import { Request, Response } from "express";
// import user from '../models/user';
// export const addFriend=async (req:Request,res:Response) =>{
//     const {userId,friendId} = req.body
//     const isValidUserId=mongoose.Types.ObjectId.isValid(userId);
//     const isValidFriendId=mongoose.Types.ObjectId.isValid(friendId);
//     if (!isValidUserId || !isValidFriendId){
//         res.status(401).json({error:"valid userId or friendId"})
//         return
//     }
//     const existingUser = user.findOne({ _id: userId });
//     const existingFriend = user.findOne({ _id: friendId });
//     if (!existingUser||!existingFriend) {
//         res.status(404).json({error:"User or Friend does not exit"})
//         return
//     }
//     existingUser.friends.push(friendId as any);
//     existingFriend.friends.push(userId as any)
//     await user.save();
// }