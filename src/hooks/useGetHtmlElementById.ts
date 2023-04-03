import {useEffect, useState} from "react";

export const useGetHtmlElementById = (elementId: string) => {
    const [element, setElement] = useState<HTMLElement>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const foundElement = document.getElementById(elementId);
        if (foundElement !== element) {
            setElement(foundElement ?? undefined);
        }
    });

    return element;
}
