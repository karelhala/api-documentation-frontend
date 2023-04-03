import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDebounce, useWindowSize} from "react-use";
import {useGetHtmlElementById} from "../../hooks/useGetHtmlElementById";

const ROWS_PER_PAGE = 3;

export const usePaginatedGallery = (cardContainerId: string, usingGallery: boolean, setPage: Dispatch<SetStateAction<number>>, setPerPage: Dispatch<SetStateAction<number>>): number | undefined => {
    const { width: windowSizeWidth, height: windowSizeHeight } = useWindowSize();
    const [debouncedSize, setDebouncedSize] = useState<[number, number]>([windowSizeWidth , windowSizeHeight]);
    const [height, setHeight] = useState<number>();

    useDebounce(() => {
        setDebouncedSize([windowSizeWidth, windowSizeHeight]);
    }, 50, [windowSizeWidth, windowSizeHeight]);

    const gallery = useGetHtmlElementById(cardContainerId);

    useEffect(() => {
        if (usingGallery && gallery && gallery.children.length > 0) {
            gallery.style.display = 'grid';
            const first = gallery.children.item(0)!;
            const children = [...gallery.children];
            const elementsPerRow = children.filter(c => 'offsetTop' in first && 'offsetTop' in c && first.offsetTop === c.offsetTop).length;

            // Take pages of ROWS_PER_PAGE * elementsPerRow and determine their max height.
            const perPage = ROWS_PER_PAGE * elementsPerRow;
            const lastPage = Math.floor(children.length / (ROWS_PER_PAGE * elementsPerRow)) + 1;
            let height = 0;
            for (let i = 0; i < lastPage; ++i) {
                const first = children[Math.min(i * perPage, children.length - 1)] as HTMLElement;
                const last = children[Math.min(i*perPage + perPage - 1, children.length - 1)]  as HTMLElement;
                height = Math.max(height, last.offsetTop - first.offsetTop + last.offsetHeight);
            }

            gallery.style.display = 'none';

            const galleryStyle = getComputedStyle(gallery);

            height += parseInt(galleryStyle.marginTop);
            height += parseInt(galleryStyle.paddingTop);
            height += parseInt(galleryStyle.paddingBottom);
            height += parseInt(galleryStyle.marginBottom);

            if (isNaN(height)) {
                setHeight(undefined);
            } else {
                setHeight(height);
            }

            setPerPage(perPage);
            setPage(prev => Math.min(prev, lastPage));
        } else {
            setHeight(undefined);
        }
    }, [debouncedSize, gallery, usingGallery, setPage, setPerPage]);

    return height;
};
