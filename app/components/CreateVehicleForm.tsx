'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


interface CreateVehicleFormProps {
    onVehicleCreated: () => void;
}

export default function CreateVehicleForm({ onVehicleCreated }: CreateVehicleFormProps) {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [plannedDuration, setPlannedDuration] = useState<number>(60);
    const [branch, setBranch] = useState<string>('DIP');



    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!vehicleNumber || !orderNumber || plannedDuration <= 0) {
            setError('Please fill out all fields with valid data.');
            return;
        }

        try {
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicleNumber,
                    orderNumber,
                    branch: branch || 'DIP', // Provide default value for branch
                    plannedDuration: Number(plannedDuration), // Ensure plannedDuration is a number
                    status: 'Inspection',
                    
                }),
            });

            if (response.ok) {
                setVehicleNumber('');
                setOrderNumber('');
                setBranch('DIP');
                setPlannedDuration(60);
                onVehicleCreated();
            } else {
                setError('Failed to create vehicle record.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Vehicle</Button>
                </DialogTrigger>
                <DialogContent className='rounded-xl'>
                    <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mb-4">

                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <div className="mb-4">
                                    <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
                                        Vehicle Number
                                    </label>
                                    <Input
                                        id="vehicleNumber"
                                        type="text"
                                        value={vehicleNumber}
                                        onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                                        className="mt-1 block w-full h-12 rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                                        Order Number
                                    </label>
                                    <Input
                                        id="orderNumber"
                                        type="text"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        className="mt-1 block w-full h-12 rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="plannedDuration" className="block text-sm font-medium text-gray-700">
                                        Planned Duration (minutes)
                                    </label>
                                    <Input
                                        id="plannedDuration"
                                        type="number"
                                        value={plannedDuration}
                                        onChange={(e) => setPlannedDuration(Number(e.target.value))}
                                        className="mt-1 block w-full h-12 rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                                >
                                    Add Vehicle
                                </button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    );
}
