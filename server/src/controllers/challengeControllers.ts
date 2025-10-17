import { Request, Response } from "express";
import Chalange from "../models/Chalange";
export const getChalenges = async (req: Request, res: Response) => {
  try {
    const chalenges = await Chalange.find({});
    return res.status(200).json({ chalanges: chalenges });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Error fetching chalenges", error: err.message });
  }
};
