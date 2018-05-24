
export class Product{
    _id: string;
    name : string;
    comments: [
        {
            _id : string;
            body: string;
        }
    ]
    starRating:[
        {
            _id : string;
            rating : number;
            userEmail : String;
        }
    ]
    starsCount : number;
}