import React from 'react';

type Props = {
    id: string;
    title: string;
    author: string;
    onRemove: (id: string) => Promise<void>;
};

const ListItem = ({ id, title, author, onRemove }: Props): JSX.Element => {
    const onCloseClick = () => {
        onRemove(id);
    };

    return (
        <div className="relative bg-[#fbefe2] px-8 py-4 rounded-md font-medium mb-5">
            <button
                type="button"
                className="absolute top-4 right-4 bg-transparent hover:bg-white text-[#897f74]"
                onClick={onCloseClick}
            >
                <span className="sr-only">Close menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="font-medium text-lg mb-2">{title}</div>

            <div className="text-[#ff825c]">{author}</div>
        </div>
    );
};

export default ListItem;
