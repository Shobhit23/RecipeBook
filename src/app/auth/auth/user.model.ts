export class User{

    constructor(public email : string,
                public id : string,
                private _token : string,
                private _tokenExpirationDate : Date){

    }

    getToken(){
        if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }

    setToken(token : string){
        this._token = token;
    }

    getTokenExpirationDate(){
        return this._tokenExpirationDate;
    }

    setTokenExpirationDate(date : Date){
        this._tokenExpirationDate = date;
    }

}