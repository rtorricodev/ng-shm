export class Reminder{
    title: string;
    date: Date;
    description: string;
    uid: any;

    constructor(){
        this.title = '';
        this.date = new Date();
        this.description = '';
        this.uid = '';
    }
}