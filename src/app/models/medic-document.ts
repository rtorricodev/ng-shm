export class MedicDocument {

    $key: string;
    title: string;
    description: string;
    date: any;
    category: string;
    uid: any;

    file: File;
    photoName: string;
    fileFolderKey: string;
    url: string;
    progress: number;

    constructor(file: File) {
        this.title = '';
        this.description = '';
        this.date = new Date().toDateString();
        this.uid = '';

        this.file = file;
        this.url = '';
        this.photoName = '';
        this.fileFolderKey = '';
        this.progress = 0;
    
    }
}
