import {useEffect, useState} from "react";
import produce, {castDraft} from "immer";

interface GetElementByIdState {
    retry: number;
    element: HTMLElement | undefined;
}

export const useGetHtmlElementById = (elementId: string, retryTimes: number = 3) => {
    const [state, setState] = useState<GetElementByIdState>({
        element: undefined,
        retry: 0
    });

    useEffect(() => {
        const foundElement = document.getElementById(elementId);
        if (foundElement) {
            setState(produce(draft => {
                draft.retry = 0;
                draft.element = castDraft(foundElement);
            }));
        } else {
            setState(prev => ({
                element: undefined,
                retry: Math.min(retryTimes, prev.retry + 1)
            }))
        }
    }, [state, elementId, retryTimes]);

    return state.element;
}
