import { Page } from "../models/page.interface";
import { PagesEnum } from "../models/pages.enum";

export const Pages: Page[] = [
  {
    title: 'Perfil',
    id: PagesEnum.PROFILE,
    isVisible: true
  },
  {
    title: 'Recentes',
    id: PagesEnum.RECENT,
    isVisible: true
  },
  {
    title: 'Playlists',
    id: PagesEnum.PLAYLISTS,
    isVisible: false
  },
  {
    title: 'Músicas',
    id: PagesEnum.TRACKS,
    isVisible: false
  },
  {
    title: 'Artistas',
    id: PagesEnum.ARTISTS,
    isVisible: false
  }
]