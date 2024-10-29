import { Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track.interface';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss'
})
export class TrackListComponent {

  @Input() title = 'Músicas';
  @Input() tracks!: Track[];

}
