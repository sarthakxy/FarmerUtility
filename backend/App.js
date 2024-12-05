import React from 'react';
import CropList from './components/CropList';
import AddCrop from './components/AddCrop';

function App() {
    return (
        <div className="App">
            <h1>Farmer Utility App</h1>
            <AddCrop />
            <CropList />
        </div>
    );
}

export default App;
