import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deal } from './deal.model';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import { BaseService } from '../base.service';

@Injectable()
export class DealService extends BaseService<Deal> {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, ["Deal"]);
  }

}
