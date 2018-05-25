
export class Product{
    _id: string;
    name : string;
    comments: [
        {
            _id : string;
            body: string;
            userEmail : String;
        }
    ]
    starRatings:[
        {
            _id : string;
            rating : number;
            userEmail : String;
        }
    ]
    starsCount : number;
}