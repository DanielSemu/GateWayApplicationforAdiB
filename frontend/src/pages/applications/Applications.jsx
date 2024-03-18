import React, { useState, useEffect } from 'react';
import Reporting from '../../components/reporting/Reporting';
import L_Sidebar from '../../components/leftsidebar/L_Sidebar';
import Production from '../../components/production/Production ';
import Communication from '../../components/communication/Communication ';
import Others from '../../components/others/Others ';

const Applications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/auth/applications/');
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchData();
    }, []);

    const production = applications.filter(app => app.app_category === "Production");
    const reporting = applications.filter(app => app.app_category === "Reporting");
    const communication = applications.filter(app => app.app_category === "Communication");
    const others = applications.filter(app => app.app_category === "Others");

    return (
        <>
            <L_Sidebar />
            <main className='main'>
                {production.length > 0 && <Production applications={production} />}
                {reporting.length > 0 && <Reporting applications={reporting} />}
                {communication.length > 0 && <Communication applications={communication} />}
                {others.length > 0 && <Others applications={others} />}
            </main>
        </>
    );
}

export default Applications;
