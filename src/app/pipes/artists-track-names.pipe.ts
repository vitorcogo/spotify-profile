import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../models/artist.interface';

@Pipe({
  name: 'artistsTrackNames'
})
export class ArtistsTrackNamesPipe implements PipeTransform {

  transform(artists: Artist[]): string {
    const artistsNames = artists.map(artist => artist.name);
    return artistsNames.join(', ');
  }

}
