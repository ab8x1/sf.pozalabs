import { useEffect, useState } from "react";
import { DisplayContainer } from "../../Borrow-Against-Salary/Offers/offersStyles";
import { FormHeader, HeaderText } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import Image from "next/image";
import getOffers from './helpers/getOffers';
import { BuyerProps, OfferTypes } from "./BuyerTypes";
import BuyerOffer from './BuyerOffer';

function Buyer({wallet} : BuyerProps){
    const [offers, setOffers] = useState<OfferTypes>();
    useEffect(() => {
        const fetchOffers = async () =>{
           const fetchedOffers = await getOffers(wallet);
           setOffers(fetchedOffers);
        }
        if(wallet){
            fetchOffers();
        }
    }, [wallet]);

    return(
        <DisplayContainer>
            <FormHeader style={{background: 'linear-gradient(90deg, rgba(246,203,206,1) 0%, rgba(225,194,206,1) 50%, rgba(215,190,203,1) 100%'}}>
                <Image src="/navbar/bag.svg" width={35} height={35} alt="ida"/>
                <div>
                    <HeaderText>Perpetual Bets</HeaderText>
                </div>
            </FormHeader>
            {
                offers?.map((offer, i) =>
                    <BuyerOffer key={i} data={offer}/>
                )
            }
        </DisplayContainer>
    )
}
export default Buyer;