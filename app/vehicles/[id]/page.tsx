'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, updateJobStatus } from '@/server/quries';
import { Job } from '@/server/db/schema';
import { Button } from '@/components/ui/button';

interface Vehicle {
    id: string;
    vehicleNumber: string;
    orderNumber: string;
    status: string;
    plannedDuration: number;
    branch: string;
}

export default function VehicleDetails({ params }: { params: { id: string } }) {
    const [vehicle, setVehicle] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const statuses = ['Inspection', 'Repair', 'Quality Check','Car Washing', 'Delivery','Released','Hold'];


    useEffect(() => {
        fetchVehicleDetails();
    }, [params.id]);

    const fetchVehicleDetails = async () => {
        try {
            // const response = await fetch(`/api/vehicles/${params.id}`);
            // if (!response.ok) throw new Error('Failed to fetch vehicle details');
            // const data = await response.json();
            const data = await getJobById(parseInt(params.id));
            setVehicle(data[0]);
        } catch (err) {
            setError('Failed to load vehicle details');
        } finally {
            setLoading(false);
        }
    };

    // const handleStatusUpdate = async (newStatus: string) => {
    //     try {
    //         const response = await fetch(`/api/vehicles/${params.id}`, {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ status: newStatus }),
    //         });

    //         if (!response.ok) throw new Error('Failed to update status');
            
    //         setVehicle(prev => prev ? { ...prev, status: newStatus } : null);
    //         router.refresh();
    //     } catch (err) {
    //         setError('Failed to update status');
    //     }
    // };

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateJobStatus(parseInt(params.id), newStatus);
            setVehicle(prev => prev ? { ...prev, status: newStatus } : null);
            router.refresh();
        } catch (err) {
            setError('Failed to update status');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!vehicle) return <div>Vehicle not found</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Vehicle Details</h1>
            
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="font-medium">Vehicle Number:</label>
                        <p className='font-bold'>{vehicle.vehicleNumber}</p>
                    </div>
                    <div>
                        <label className="font-medium">Order Number:</label>
                        <p className='font-bold'>{vehicle.orderNumber}</p>
                    </div>
                    <div>
                        <label className="font-medium">Branch:</label>
                        <p className='font-bold'>{vehicle.branch}</p>
                    </div>
                    <div>
                        <label className="font-medium">Planned Duration:</label>
                        <p className='font-bold'>{vehicle.plannedDuration} minutes</p>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="font-medium block mb-2">Status:</label>
                    <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <Button variant="outline" onClick={() => router.back()}>Back</Button>
            </div>
        </div>
    );
}
