import { Injectable } from "@angular/core";
import { BaseModel } from "./base.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BaseService<T extends BaseModel> {

    url: string = 'http://localhost:7968/api';

    constructor(
        private httpClient: HttpClient,
        private endpoints: string[]) {

    }

    public add(data: T): Observable<T> {
        return this.httpClient
            .post<T>([
                this.url,
                this.endpoints
            ].join('/'), data);
    }

    public update(data: T): Observable<T> {
        return this.httpClient
            .put<T>([
                this.url,
                this.endpoints
            ].join('/'), data);
    }

    public find(Id: any): Observable<T> {
        return this.httpClient
            .get<T>([
                this.url,
                this.endpoints,
                Id
            ].join('/'));
    }

    public delete(data: T): Observable<T> {
        return this.httpClient
            .delete<T>([
                this.url,
                this.endpoints
            ].join('/'));
    }

    public getAll(): Observable<T[]> {
        return this.httpClient
            .get<T[]>([
                this.url,
                this.endpoints
            ].join('/'));
    }
}