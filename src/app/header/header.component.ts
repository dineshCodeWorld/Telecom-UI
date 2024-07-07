import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { allUsers } from '../allUsers';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private profileService: ProfileService) { }
  profileDetail: Profile;
  profile:Boolean = false;
  friendAndFamilyErrorMsg: string;
  errorMsg: string;
  ngOnInit(): void {
    this.getProfileDetails();
  }
  getProfileDetails(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profileDetail = data;
        if(data.profile==='ADMIN'){
          this.profile=true;
        }
        
        if (this.profileDetail.friendAndFamily[0] === -1) {
          this.friendAndFamilyErrorMsg =
            "Could not populate Friends list. Please try again after some time";
        }
      },
      (error) => (this.errorMsg = error)
    );
    
  }

}
