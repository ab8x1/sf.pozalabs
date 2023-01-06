import { useEffect } from 'react';
import {Container, Message, Close} from './snackBarStyles'
import {SnackBarProps} from './snackBarTypes'

let timeOut: NodeJS.Timeout;

function SnakcBar({closeSnackBar, status, message}: SnackBarProps){

    useEffect(() => {
        timeOut = setTimeout(() => {
            closeSnackBar();
        }, 8000);
    }, []);

    const close = (): void => {
        clearTimeout(timeOut);
        closeSnackBar();
    }

    return(
        <Container>
            <div style={{position: 'relative', width: '100%'}}>
                <Message status={status}>
                    {message}
                </Message>
                <Close onClick={close}><img src="/close.svg"/></Close>
            </div>
        </Container>
    )
}
export default SnakcBar;