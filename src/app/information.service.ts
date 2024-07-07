import { Injectable } from "@angular/core";

@Injectable()
export class InformationService {
  // baseURL = "http://localhost:8000";

  phoneNo: number;

  customerBaseUrl = "http://localhost:8000";
  loginUrl = "http://localhost:8000/login";
  registerUrl = "http://localhost:8000/customers";
  profileUrl = "http://localhost:8000/customers/";
  viewPlanUrl = "http://localhost:8000/plans";
  callDetailUrl = `http://localhost:8000/customers/`;
  addFriendUrl = `http://localhost:8000/customers/`;
  all = `http://localhost:8000/customers/all`;

}
