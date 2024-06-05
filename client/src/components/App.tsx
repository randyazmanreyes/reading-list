import React from 'react';
import { ReadingListProvider } from '../context/ReadingListContext';
import AlertContainer from './alerts/AlertContainer';
import Form from './Form';
import List from './List';
import NavBar from './NavBar';

const App = (): JSX.Element => {
    return (
        <ReadingListProvider>
            <div className="pt-[70px] px-8">
                <NavBar />

                <List />

                <Form />

                <AlertContainer />
            </div>
        </ReadingListProvider>
    );
};

export default App;
