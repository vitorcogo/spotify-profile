import { Image } from './image.interface';

export interface UserInformation {
  display_name: string;
  uri: string;
  images: Image[];
  followers: Followers;
}

export interface Followers {
  href: string;
  total: number;
}
