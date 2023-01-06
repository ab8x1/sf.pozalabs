export default function scrollIntoViewIfNeeded(elem, container) { 
    let rectElem = elem.getBoundingClientRect(), rectContainer=container.getBoundingClientRect();
    if (rectElem.bottom > rectContainer.bottom){ //down
        elem.parentNode.scrollTop = elem.offsetTop - (elem.parentNode.offsetHeight - elem.offsetHeight);
    }
    if (rectElem.top < rectContainer.top){ //up
        elem.parentNode.scrollTop = elem.offsetTop ;
    }
}