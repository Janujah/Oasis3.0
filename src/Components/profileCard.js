// src/components/ProfileCard.js
import React from 'react';

function ProfileCard({ name, specialty, imageUrl }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4" style={{width:'500px', height:'500px'}}>
            <img src={imageUrl} alt={name} className="w-full h-48 object-cover" style={{height:'400px'}} />
            <div className="mt-4">
                <h3 className="text-3xl font-semibold">{name}</h3>
                <p className="text-gray-600 mt-2" style={{color:'black',textAlign:'center', fontSize:'20px'}}>{specialty}</p>
            </div>
        </div>
    );
}

export default ProfileCard;
