import express from "express";
import { Request, Response } from "express";
import User from "../models/user"; // تأكد أن لديك هذا الموديل

const users: string[] = [];

const getUsers = async (req: Request, res: Response) => {
  try {
    const dbUsers = await User.find().lean();
    users.length = 0;
    dbUsers.forEach((user: any) => {
      users.push(user);
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export default getUsers;
