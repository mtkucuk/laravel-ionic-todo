import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from '../todo.service';
import * as moment from 'moment';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    todo = {
        title: '',
        desc: '',
        date: moment().format('YYYY-MM-DD HH:mm'),
        status: 0
    };

    constructor(public route: ActivatedRoute,
                public nav: NavController,
                private todoService: TodoService, public alertCtrl: AlertController) {
    }

    ionViewDidEnter() {
        this.route.params.subscribe(param => {
            this.todoService.todoShow(param.id).subscribe((data: any) => {
                if (data.success) {
                    this.todo = data.data;
                } else {

                    this.nav.navigateRoot('/');
                }
            });
        });

    }

    ngOnInit(): void {
    }

    editForm() {

        this.todo.date = (moment(this.todo.date).format('YYYY-MM-DD HH:mm'));
        console.log(this.todo);
        this.todoService.todoUpdate(this.todo).subscribe((d: any) => {
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
