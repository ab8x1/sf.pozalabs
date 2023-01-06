import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;

export const LoadingSpinner = styled.div<{size: string}>`
	pointer-events: none;
	width: ${({size}) => size || '35px'};
	height: ${({size}) => size || '35px'};
	border: solid transparent;
    border-width:${({size}) => size ? '1px' : '3px'};
	border-color: #1E88E5;
	border-top-color: transparent;
	border-radius: 50%;
	animation: ${rotate} 0.5s linear infinite;
	@media(min-width: 768px){
        border-width:${({size}) => size ? '3px' : '5px'};
        width: ${({size}) => size || '50px'};
		height: ${({size}) => size || '50px'};
	}
`