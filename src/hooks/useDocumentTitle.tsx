import { useEffect } from 'react';

function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = title || 'BlaBlaChat';
        };
    }, [title]);
}

export default useDocumentTitle;
