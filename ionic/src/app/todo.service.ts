import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    url = 'http://127.0.0.1:8000/api/v1'; // API servisimizin url adresini tanımlıyoruz.

    constructor(private http: HttpClient) {

    }

    todoList() {
        return this.http.get(this.url + '/todo');
    }

    todoUpdate(todo) {
        return this.http.put(this.url + '/todo/' + todo.id, {
            title: todo.title,
            desc: todo.desc,
            date: todo.date,
            status: todo.status
        });
    }

    todoDelete(todo) {
        return this.http.delete(this.url + '/todo/' + todo.id);
    }

    todoInsert(todo) {
        return this.http.post(this.url + '/todo/', todo);
    }

    todoShow(id) {
        console.log(id);
        return this.http.get(this.url + '/todo/' + id);
    }
}
