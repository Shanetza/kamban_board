

import { Job } from '@/server/db/schema'
import React from 'react'

const WorkshopBoard = ({ vehicles }: { vehicles: Job[] }) => {
  const stages = ['Inspection', 'Repair', 'Quality Check','Car Washing', 'Delivery'];

    // Define a mapping of stages to background colors
  const stageColors: Record<string, string> = {
    Inspection: 'bg-orange-300',
    Repair: 'bg-red-300',
    'Quality Check': 'bg-blue-400',
    'Car Washing': 'bg-teal-300',
    Delivery: 'bg-green-300',
  };

  return (
    <div className='grid grid-cols-5 gap-2 min-h-screen'>
      {stages.map((stage) => (
        <div key={stage} className={`bg-gray-100 p-2 rounded shadow-md min-h-screen ${stageColors[stage]}`}>
          <h2 className='text-xl rounded border-2 border-blue-800 p-3 font-bold text-blue-800 items-center mb-4 text-center '>{stage}</h2>
          <div className="space-y-2">
            {vehicles
              .filter((vehicle) => vehicle.status === stage)
              .map((vehicle) => (
                <div key={vehicle.id} className="p-2 bg-white rounded shadow-lg flex flex-col space-y-1 ">
                  <h3 className="font-bold text-gray-800">{vehicle.vehicleNumber}</h3>
                </div>
              ))}
          </div>
        </div>
      ))}      
    </div>
  )
}

export default WorkshopBoard
