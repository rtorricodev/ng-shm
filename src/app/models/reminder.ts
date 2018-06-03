
export class Reminder{
    doctor: string;
    date: Date;
    time: string;
    medicSection: string;
    description: string;
    uid: any;

    constructor(){
        this.doctor = '';
        this.medicSection = '';
        this.description = '';

        this.time = '';
        this.date = new Date();
     
        this.uid = '';
    }
}