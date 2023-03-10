import { useState, useEffect, useRef } from 'react'
import {useIntersection} from '../../../helpers/intersectionObserver'
import {LoaderProps, OfferData} from './offersTypes'
import getOffers from './helpers/getOffers'
import { LoadingContainer } from './offersStyles'



export default function Loader({setOffers, lastRequestedId, setLastRequestdId, filter}: LoaderProps){
    const [inView, setInView] = useState(false);
    const [stage, setStage] = useState<number | null>(1);
    const [loadingData, setLoadingData] = useState(false);
    const ref: any = useRef();
    useIntersection(ref, setInView);
    const moreOffersPossible = stage && stage > 0 && lastRequestedId >= 0;

    useEffect( () => {
        const fetchData = async () => {
            const [fulfilledResults, noMoreOffers] = await getOffers(lastRequestedId, setLastRequestdId, filter);
            if(fulfilledResults && fulfilledResults.length > 0){
                setOffers((prevState: OfferData[]) => {
                    if(prevState) return [...prevState, ...fulfilledResults];
                });
            }
            // else setStage(null);
            setLoadingData(false);

        }
        if(inView && moreOffersPossible && lastRequestedId > 0){ //if user scrolled to bottom && intitial loading was finished
            if(!loadingData){ //if no loading in progress
                console.log('start loading from loader with lastReqId: ', lastRequestedId);
                setLoadingData(true);
                fetchData();
            }
        }
    }, [inView, lastRequestedId]);

    return(
    <div ref={ref}>
        {loadingData ? <LoadingContainer/> : null}
    </div>
    )
};