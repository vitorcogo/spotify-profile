import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationTime'
})
export class DurationTimePipe implements PipeTransform {

  transform(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;

  }

}
