import { Injectable } from "@angular/core";
import { BaseModel } from "./base.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BaseService<T extends BaseModel> {

    url: string = "http://192.168.0.103:7968/api";
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

        console.log("postUrl", [
            this.url,
            this.baseEndpoints
        ].join("/"));

        console.log("postData", data);

        console.log("headers", this.httpOptions.headers.has("Content-Type"));

        return this.httpClient
            .post<T>([
                this.url,
                this.baseEndpoints
            ].join("/"), data, this.httpOptions);
    }

    public update(data: T): Observable<T> {
        return this.httpClient
            .put<T>([
                this.url,
                this.baseEndpoints
            ].join("/"), data, this.httpOptions);
    }

    public find(id: any): Observable<T> {
        return this.httpClient
            .get<T>([
                this.url,
                this.baseEndpoints,
                id
            ].join("/"));
    }

    public delete(data: T): Observable<T> {
        return this.httpClient
            .delete<T>([
                this.url,
                this.baseEndpoints
            ].join("/"));
    }

    public getAll(): Observable<T[]> {
        return this.httpClient
            .get<T[]>([
                this.url,
                this.baseEndpoints
            ].join("/"));
    }
}