import { Image } from "./Image";
import { UserData } from "./UserData";
import { UserRole } from "./UserRole";
export interface User {
  id: string;
  username: string;
  password: string;
  avatar: Image | null;
  images: Image[];
  role: UserRole;
  accSubscribers: number;
  accFollowings: number;
  userData: UserData;
  bio: string;
  subscribers: User[];
  subscribtions: User[];
}