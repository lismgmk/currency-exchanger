export interface IData {
    Date: string,
    PreviousDate: string,
    PreviousURL: string,
    Timestamp: string,
    Valute: IValute
}

type IValute = {
    [key: string]: IValuteData;
}

export interface IValuteData {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number
}

