import { Page } from "../models/page.interface";
import { PagesEnum } from "../models/pages.enum";

export const Pages: Page[] = [
  {
    title: 'Perfil',
    id: PagesEnum.PROFILE
  },
  {
    title: 'Recentes',
    id: PagesEnum.RECENT
  },
  {
    title: 'Playlists',
    id: PagesEnum.PLAYLISTS
  },
  {
    title: 'Músicas',
    id: PagesEnum.TRACKS
  },
  {
    title: 'Artistas',
    id: PagesEnum.ARTISTS
  }
]