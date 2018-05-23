import { Injectable } from "@angular/core";
import { BaseModel } from "./base.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BaseService<T extends BaseModel> {

    url: string = "http://192.168.0.112:7968/api";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };

    constructor(
        public httpClient: HttpClient,
        private baseEndpoints: string[]) {

    }

    public add(data: T): Observable<T> {
        return this.httpClient
            .post<T>([
                this.url,
                this.baseEndpoints.join("/")
            ].join("/"), data, this.httpOptions);
    }

    public update(data: T): Observable<T> {
        return this.httpClient
            .put<T>([
                this.url,
                this.baseEndpoints.join("/")
            ].join("/"), data, this.httpOptions);
    }

    public find(id: any): Observable<T> {
        return this.httpClient
            .get<T>([
                this.url,
                this.baseEndpoints.join("/"),
                id
            ].join("/"));
    }

    public delete(data: T): Observable<T> {
        return this.httpClient
            .delete<T>([
                this.url,
                this.baseEndpoints.join("/")
            ].join("/"));
    }

    public getAll(): Observable<T[]> {
        return this.httpClient
            .get<T[]>([
                this.url,
                this.baseEndpoints.join("/")
            ].join("/"));
    }
}