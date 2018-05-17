import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../core/loader.service';
import { CONFIG } from '../../core/config';
import { Deal } from './deal.model';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import { BaseService } from '../base.service';

let dealUrl = CONFIG.baseUrls.deal;

@Injectable()
export class DealService extends BaseService<Deal> {

  constructor(
    httpClient: HttpClient,

    private loaderService: LoaderService
  ) {
    super(httpClient, ['Deal'])
  }

}
