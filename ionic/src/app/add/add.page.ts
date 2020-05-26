import {Component, OnInit} from '@angular/core';


import {TodoService} from '../todo.service';
import * as moment from 'moment';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    todo = {
        title: '',
        desc: '',
        date: moment().format('YYYY-MM-DD HH:mm'),
        status: 0
    };


    constructor(public todoService: TodoService,
                public nav: NavController,
                public alertCtrl: AlertController
    ) {

    }

    ngOnInit() {

    }

    addForm() {

        this.todo.date = (moment(this.todo.date).format('YYYY-MM-DD HH:mm'));
        console.log(this.todo);
        this.todoService.todoInsert(this.todo).subscribe((d:any) => {
            console.log(d);
            if (d.success) {
                // @ts-ignore
                this.todo = {};
                this.nav.navigateRoot('/');
            } else {
                this.alert(d.msg);
            }
        });
    }

    async alert(msg) {
        let msgList = '';
        Object.entries(msg).forEach(([key, value]) => {
            msgList += value + '<br>';

        });
        const alert = await this.alertCtrl.create({
            message: msgList
        });
        await alert.present();
    }

}
