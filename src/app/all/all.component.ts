import { Component, OnInit } from '@angular/core';
import { allUsers } from '../allUsers';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private service:RestService) { }

  allUsers!:allUsers[];
  ngOnInit(): void {
    this.getUserList();
  }

  public getUserList()
  {
     this.service.getAll().subscribe(resonse=>this.allUsers=resonse);
  }

}
