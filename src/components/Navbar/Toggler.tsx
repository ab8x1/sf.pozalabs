import {Bar, Toggler, TogglerButton} from './togglerStyles'
import {TogglerProps} from './navbarTypes'

function TogglerComponent({open, setOpen}: TogglerProps){

    return(
        <TogglerButton onClick={() => setOpen(prevSt => !prevSt)}>
            <Toggler>
                <Bar/>
                <Bar/>
                <Bar/>
            </Toggler>
        </TogglerButton>
    )
}
export default TogglerComponent;