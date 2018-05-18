export class Product{
    _id: string;
    name : string;
    comments: [
        {
            _id : string;
            body: string;
        }
    ]
    starsCount : number;
}