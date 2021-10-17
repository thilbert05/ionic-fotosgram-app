import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  private baseUrl = environment.url;
  transform(img: string, userId: string): string {
    return `${this.baseUrl}/posts/imagen/${userId}/${img}`;
  }

}
