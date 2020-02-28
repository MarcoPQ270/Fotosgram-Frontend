import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
@Input() post: Post = {};

img1 = '../../../assets/dead.jpg';
img2 = '../../../assets/perro-1.jpg';
img3 = '../../../assets/perro-2.jpg';
  constructor() { }

  ngOnInit() {}

}
