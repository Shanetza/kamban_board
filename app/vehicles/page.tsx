import React from 'react'
import VehicleList from '../components/VehicleList';
import { getData } from '@/server/quries';
import Header from '../components/Header';

const VehiclesPage = async () => {
    const vehicles = await getData();
    console.log(vehicles);
  return (
    <div>
        
        {vehicles.length > 0 ? (
          
            <VehicleList vehicleList={vehicles} />
        ) : (
            <div>No vehicles found</div>
        )}
    </div>
  )
}

export default VehiclesPage