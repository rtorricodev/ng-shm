export class MedicDocument {
    title: string;
    description: string;
    date: any;
    category: string;
 
    constructor() {
        this.title = "";
        this.description = "";
        this.date = new Date().toDateString();
    }
}