import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/userinfo" element={<UserInfo />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
