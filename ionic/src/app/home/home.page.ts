import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {AlertController, NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    // tslint:disable-next-line:ban-types
    todos;
    spinnerStatus = true;

    constructor(
        private todoService: TodoService,
        public nav: NavController,
        public alertCtrl: AlertController) {
    }

    ngOnInit(): void {


    }

    ionViewDidEnter() {
        this.spinnerStatus = true;
        this.todoList();
    }

    doRefresh(event) {
        setTimeout(() => {
            this.todoList();
            event.target.complete();

        }, 1000);
    }

    todoList() {
        this.todoService.todoList().subscribe(data => {
            this.todos = data;
            this.spinnerStatus = false;
        });
    }

    addTodoPage() {
        this.nav.navigateForward('/add');

    }

    statusUpdate(todo) {
        // tslint:disable-next-line:triple-equals
        let status;
        if (todo.status) {
            status = false;
        } else {
            status = true;
        }
        this.todos.forEach((element, index) => {
            if (element.id === todo.id) {
                this.todos[index].status = status;
            }
        });
        this.todoService.todoUpdate(todo).subscribe((data: any) => {
            console.log(data);
            this.todoList();
        }, response => {
            console.log(response);
        }, () => {
            console.log('completed');
        });
    }

    editDetailPage(todo) {
        // @ts-ignore
        const navigationExtras: NavigationExtras = {
            // @ts-ignore
            params: {
                todo
            }
        };
        // @ts-ignore
        this.nav.navigateForward('/edit/' + todo.id, true, navigationExtras);

    }

    async deleteTodo(todo) {
        const alert = await this.alertCtrl.create({
            message: 'Silmek istediğinize emin misiniz?',
            buttons: [
                {
                    text: 'İptal Et',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                }, {
                    text: 'Onayla',
                    handler: () => {
                        this.todoService.todoDelete(todo).subscribe((d: any) => {
                            if (d.success) {
                                this.todoList();
                            }
                        });
                    }
                }
            ]
        })
        await alert.present();
    }
}
