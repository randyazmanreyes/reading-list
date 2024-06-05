import React from 'react';
import { useReadingList } from '../context/ReadingListContext';
import ListItem from './ListItem';

const List = (): JSX.Element => {
    const { books, removeFromReadingList, retrieveReadingList, showAlert } =
        useReadingList();

    const onRemoveItem = async (id: string) => {
        if (removeFromReadingList) {
            const res = await removeFromReadingList(id);

            if (res.success && retrieveReadingList) {
                const retrieveRes = await retrieveReadingList();

                if (!retrieveRes.success && showAlert) {
                    showAlert('error');
                }
            }
        }
    };

    return (
        <div className="w-full mt-[42px] pb-8">
            {books.map((b) => (
                <ListItem
                    key={b.id}
                    id={b.id}
                    title={b.title}
                    author={b.author}
                    onRemove={onRemoveItem}
                />
            ))}
        </div>
    );
};

export default List;
