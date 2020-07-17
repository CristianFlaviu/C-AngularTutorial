import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-memeber-detailed',
  templateUrl: './memeber-detailed.component.html',
  styleUrls: ['./memeber-detailed.component.css']
})
export class MemeberDetailedComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private userSercice: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {

      this.user = data.user;
      this.galleryOptions = [
        {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
        }
      ];
      this.galleryImages = this.getImages();
    });
  }

  loadUser()
  {
    const idString = 'id';
    console.log(this.route.snapshot.params[idString]);
    this .userSercice.getUser(+ this.route.snapshot.params[idString]).subscribe((user: User) => {
      this.user = user;

    }, error => {
      this.alertify.error(error);
    });
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.descpription
      });
    }

    return imageUrls;
  }

}
