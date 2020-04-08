import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../common.services/_api.service";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IAnswer } from "../../model/answer.interface";

@Injectable()
export class StatService extends APIService {
    constructor (@InjectModel("Article") private readonly articleModel: Model<IArticle>) {
        super();
    }

    public async articlesPerMonth(): Promise<IAnswer<number[]>> {
        try {
            let data: number[] = [];            
            const currentMonth: number = new Date().getUTCMonth() + 1;
            const currentYear: number = new Date().getUTCFullYear();            
            let month: number = currentMonth === 12 ? 1 : currentMonth + 1;            
            let year: number = currentMonth === 12 ? currentYear : currentYear - 1;            

            for (let i: number = 0; i < 12; i++) {                
                if (month === 13) {
                    month = 1;
                    year++;
                }

                let startDate: Date = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
                let endDate: Date;
                
                if (month === currentMonth) {
                    endDate = new Date();
                } else {
                    let startDateCopy: Date = new Date(startDate.getTime());
                    endDate = new Date(startDateCopy.setUTCMonth(startDateCopy.getUTCMonth()+1));
                }                
                
                let q: number = await this.articleModel.countDocuments({date: {$gt: startDate, $lt: endDate}});
                data.push(q);
                month++;
            }

            return {statusCode: 200, data};
            //return {statusCode: 200, data: [456, 89, 647, 950, 10, 95, 367, 800, 45, 190, 789, 6600]}; // fake
        } catch (err) {
            let errTxt: string = `Error in StatService.articlesPerMonth: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async articlesPerDay(): Promise<IAnswer<number[]>> {
        try {
            let data: number[] = [];            
            const currentDate: Date = new Date();

            for (let i: number = 0; i < 7; i++) {
                const date: Date = new Date(currentDate.getTime() - i * 1000 * 60 * 60 * 24);  
                const startDate: Date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
                const endDate: Date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
                let q: number = await this.articleModel.countDocuments({date: {$gte: startDate, $lte: endDate}});
                data.push(q);                  
            }

            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in StatService.articlesPerDay: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
