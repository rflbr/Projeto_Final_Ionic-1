import { Injectable } from "@angular/core"
import { Observable } from "rxjs/rx"
import { Todo, TodoLocalStorageService } from "../todo/todo"

@Injectable()
export class TodoService {
    constructor(private driver: TodoLocalStorageService) {
    }

    fetch(): Observable<Todo[]> {
        return this.driver.fetch()
    }

    add(title: string, content: string): Observable<boolean> {
        return this.driver.add(title, content);
    }

    saveAll(todos: Todo[]): Observable<boolean> {
        return this.driver.saveAll(todos);
    }
}