import React, { useState } from 'react';
import { useReadingList } from '../context/ReadingListContext';

const Form = (): JSX.Element => {
    const { addToReadingList, retrieveReadingList, showAlert } =
        useReadingList();
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const onBookTitleChange = (
        event: React.FormEvent<HTMLInputElement>
    ): void => {
        setBookTitle(event.currentTarget.value);
    };

    const onAuthorChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setAuthor(event.currentTarget.value);
    };

    const onFormSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setIsAdding(true);

        if (addToReadingList) {
            const addRes = await addToReadingList(bookTitle, author);

            if (addRes.success && retrieveReadingList) {
                const retrieveRes = await retrieveReadingList();

                if (!retrieveRes.success && showAlert) {
                    if (
                        retrieveRes.error.response &&
                        retrieveRes.error.response.data &&
                        retrieveRes.error.response.data.errors
                    ) {
                        const { errors } = retrieveRes.error.response.data;

                        errors.forEach((e: any) => showAlert(e.message));
                    }
                }
            } else if (!addRes.success && showAlert) {
                if (
                    addRes.error.response &&
                    addRes.error.response.data &&
                    addRes.error.response.data.errors
                ) {
                    const { errors } = addRes.error.response.data;

                    errors.forEach((e: any) => showAlert(e.message));
                }
            }
        }

        setBookTitle('');
        setAuthor('');
        setIsAdding(false);
    };

    return (
        <div className="w-full mb-8">
            <form onSubmit={onFormSubmit}>
                <input
                    className="appearance-none border border-[#cfcfcf] w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none mb-8"
                    id="bookTitle"
                    type="text"
                    placeholder="Book Title"
                    required
                    value={bookTitle}
                    disabled={isAdding}
                    onChange={onBookTitleChange}
                />

                <input
                    className="appearance-none border border-[#cfcfcf] w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none  mb-8"
                    id="author"
                    type="text"
                    placeholder="Author"
                    required
                    value={author}
                    disabled={isAdding}
                    onChange={onAuthorChange}
                />

                <button
                    type="submit"
                    className="bg-[#fe7e5d] hover:bg-[#fe7e5d]/75  text-white font-medium py-2 px-[46px] rounded-full"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default Form;
