import { Page } from "../models/page.interface";
import { PagesEnum } from "../models/pages.enum";

export const Pages: Page[] = [
  {
    title: 'Perfil',
    id: PagesEnum.PROFILE,
    isActive: true    
  },
  {
    title: 'Recentes',
    id: PagesEnum.RECENT,
    isActive: false    
  },
  {
    title: 'Playlists',
    id: PagesEnum.PLAYLISTS,
    isActive: false    
  },
  {
    title: 'Músicas',
    id: PagesEnum.MUSICS,
    isActive: false    
  },
  {
    title: 'Artistas',
    id: PagesEnum.ARTISTS,
    isActive: false    
  }
]