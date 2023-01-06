import {getLoanById} from './getLoanById'
import {OfferData, Filter} from '../offersTypes'
import { Dispatch, SetStateAction } from "react"

export default async function fetch(lastRequestedId: number,  setLastRequestdId: Dispatch<SetStateAction<number>>, filter?: Filter): Promise<[OfferData[], boolean]| [null]>{
    return new Promise(async (res, rej) => {
        try{
            const newStart = lastRequestedId + 1;
            const ids = Array.from({length: 5}, (_, i) => i + newStart);
            const results = await Promise.allSettled(ids.map(id => getLoanById(id)));
            const fulfilledResults = results.reduce((acc: any, result) => {
                if(result.status === 'fulfilled'){
                    if(filter){
                        if(filter(result.value))
                            return[...acc, result.value];
                        else return acc;
                    }
                    else return[...acc, result.value];
                }
                else return acc;
            }, []);
            const noMoreOffers = results.some(result => result.status === "rejected" && result.reason === "No more offers");
            const newLastId = noMoreOffers ? -1 : ((st: any) => st + 5);
            setLastRequestdId(newLastId);
            res([fulfilledResults, false]);
        }
        catch(e){
            res([null]);
        }
    })
}