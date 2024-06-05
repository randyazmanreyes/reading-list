import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Success<T> {
    success: true;
    value: T;
}

interface Fail {
    success: false;
    error: any;
}

interface IBook {
    id: string;
    title: string;
    author: string;
}

interface IAlert {
    id: string;
    message: string;
}

interface ReadingListContextType {
    books: IBook[];
    alerts: IAlert[];
    addToReadingList?: (
        bookTitle: string,
        author: string
    ) => Promise<Result<IBook>>;
    removeFromReadingList?: (id: string) => Promise<Result<IBook>>;
    retrieveReadingList?: () => Promise<Result<boolean>>;
    showAlert?: (message: string) => void;
    hideAlert?: (id: string) => void;
}

const ReadingListContext = createContext<ReadingListContextType>({
    books: [],
    alerts: [],
});

export type Result<T> = Success<T> | Fail;

export const useReadingList = () => {
    return useContext(ReadingListContext);
};

export const ReadingListProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    const addToReadingList = async (
        bookTitle: string,
        author: string
    ): Promise<Result<IBook>> => {
        try {
            const {
                data: { book: aBook },
            } = await axios.post<any, AxiosResponse<{ book: IBook }>>(
                '/api/reading-list',
                {
                    bookTitle,
                    author,
                }
            );

            return { success: true, value: aBook };
        } catch (error: any) {
            return { success: false, error };
        }
    };

    const retrieveReadingList = async (): Promise<Result<boolean>> => {
        try {
            const {
                data: { books: aBooks },
            } = await axios.get<any, AxiosResponse<{ books: IBook[] }>>(
                '/api/reading-list'
            );

            setBooks(aBooks);

            return { success: true, value: true };
        } catch (error: any) {
            console.error(error);

            return { success: false, error };
        }
    };

    const removeFromReadingList = async (
        id: string
    ): Promise<Result<IBook>> => {
        try {
            const {
                data: { book: aBook },
            } = await axios.delete<any, AxiosResponse<{ book: IBook }>>(
                `/api/reading-list/${id}`
            );

            return { success: true, value: aBook };
        } catch (error: any) {
            console.error(error);

            return { success: false, error };
        }
    };

    const showAlert = (message: string) => {
        const id = Math.round(Math.random() * 10000000000).toString();

        setAlerts([...alerts, { id, message }]);
    };

    const hideAlert = (id: string) => {
        const aAlerts = [...alerts];

        for (let i = 0; i < aAlerts.length; i += 1) {
            const a = aAlerts[i];

            if (a.id === id) {
                aAlerts.splice(i, 1);

                setAlerts(aAlerts);
                break;
            }
        }
    };

    useEffect(() => {
        retrieveReadingList();
    }, []);

    return (
        <ReadingListContext.Provider
            value={{
                books,
                alerts,
                addToReadingList,
                retrieveReadingList,
                removeFromReadingList,
                showAlert,
                hideAlert,
            }}
        >
            {children}
        </ReadingListContext.Provider>
    );
};

export default ReadingListContext;
