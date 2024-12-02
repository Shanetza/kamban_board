import { Job } from '@/server/db/schema';
import Link from 'next/link';
import React from 'react'

export default function VehicleList ({vehicleList}: {vehicleList: Job[]}) {
  return (
    <>
        {vehicleList?.map((vehicle) => (            
            <Link href={`/vehicles/${vehicle.id}`} key={vehicle.id}>  
            <div className='flex items-center justify-between border shadow-sm p-4 w-full mt-4'>
                <div  className=''>
                    <p className='text-lg font-bold text-blue-600'>{vehicle.vehicleNumber}</p>
                <p className='text-sm text-gray-500'>{vehicle.orderNumber}</p>
                <p className='text-sm text-red-500'>{vehicle.status}</p>
            </div>
            <div className='flex flex-col items-right justify-center'>
                    <p>{new Date(vehicle.startTime).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })}</p>
                    <p>Duration: {(vehicle.plannedDuration)} minutes</p>
                    <p>Ends: {new Date(new Date(vehicle.startTime).getTime() + vehicle.plannedDuration * 60000).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })}</p>
                    
                </div>
            </div>
            </Link>
        ))}
    </>
  )
}

