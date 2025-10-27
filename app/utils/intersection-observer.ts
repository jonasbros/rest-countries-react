export default function intersectionObserver(
    elements: NodeListOf<HTMLElement> | HTMLElement,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
  ): { observer: IntersectionObserver; cleanup: () => void } {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            callback(entry);
        });
    }, options);

    if(elements instanceof NodeList) {
        elements.forEach((element: HTMLElement) => {
            observer.observe(element);
        });
    }else {
        observer.observe(elements);
    }

    return { observer, cleanup: () => { observer.disconnect(); } };  
}