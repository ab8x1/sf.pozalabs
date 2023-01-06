import {OfferContainer} from '../offersStyles'

function LoadingContainers({amount}: {amount: number}){

    return(
        <>
            {
                Array.from(Array(amount).keys()).map(key =>
                    <OfferContainer key={key} $loading={true}/>
                )
            }
        </>
    )
}
export default LoadingContainers;