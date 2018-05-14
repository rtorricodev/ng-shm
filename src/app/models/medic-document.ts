export class MedicDocument {
    title: string;
    description: string;
    date: any;
    category: string;
    uid: any;
 
    constructor() {
        this.title = "";
        this.description = "";
        this.date = new Date().toDateString();
        this.uid = "";
    }
}