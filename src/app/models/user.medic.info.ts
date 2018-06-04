export class UserMedicInfo {
    age: number;
    weight: number;
    height: number;
    blod: string;
    uid: any;

    constructor(){
        this.age = 0;
        this.weight = 0;
        this.height = 0;
        this.blod = 'O+';
        this.uid = '';
    }

    setUserMedicInfo(age:number,weight: number, height: number,blod: string, uid: any ){
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.blod = blod;
        this.uid = uid;
    }
}