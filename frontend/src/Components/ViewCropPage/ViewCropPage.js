import React from "react";
import CropPrices from './CropPriceFetcher';
import './ViewCropPage.css';

const ViewCropPage = () => {
    const backgroundImage = `${process.env.PUBLIC_URL}/Assets/cloudy.jpg`; // 👈 Image from public folder

    return (
        <div className="view-crop-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="background-overlay">
                <CropPrices />
            </div>
        </div>
    );
};

export default ViewCropPage;
