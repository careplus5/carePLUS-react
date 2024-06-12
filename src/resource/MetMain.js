import React from 'react';
import MetPatientList from './MetPatientList';
import '../css/MetMain.css'
import MetTestResult from './MetTestResult';
import MetNotice from './MetNotice';
import MetTestSearch from './MetTestSearch';

function MetMain() {
    return (<div className="background">
                <MetPatientList />
                <MetTestResult />
                <MetNotice />
                <MetTestSearch />   
        </div>
    );
}

export default MetMain;