'use client';

import { useState, useEffect } from 'react';
import CreateVehicleForm from './components/CreateVehicleForm';
import VehicleList from './components/VehicleList';
import { getData } from '@/server/quries';
import Header from './components/Header';

interface Job {
  id: number;
  vehicleNumber: string;
  orderNumber: string;
  status: string;
  startTime: Date;
  plannedDuration: number;
  branch: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredVehicles, setFilteredVehicles] = useState<Job[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, jobs]);

  const fetchVehicles = async () => {
    const jobs = await getData();
    // const response = await fetch('/api/vehicles');
    // const data = await response.json();
    console.log(jobs);
    setJobs(jobs);
  };

  // const handleUpdate = async (vehicleId: number) => {
  //   const vehicle = vehicles.find((v) => v.id === vehicleId);
  //   if (!vehicle) return;

  //   const nextStatus = getNextStatus(vehicle.status);
  //   const updatedVehicle = {
  //     ...vehicle,
  //     status: nextStatus,
  //     startTime: new Date().toISOString(),
  //     endTime: new Date(
  //       new Date().getTime() + getPlannedDuration(nextStatus) * 60000
  //     ).toISOString(),
  //   };

  //   await fetch('/api/vehicles', {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(updatedVehicle),
  //   });

  //   fetchVehicles();
  // };

  // const getNextStatus = (currentStatus: string): string => {
  //   const stages = ['Inspection', 'Repair', 'Quality Check','Car Washing', 'Delivery'];
  //   const index = stages.indexOf(currentStatus);
  //   return stages[index + 1] || 'Delivery';
  // };

  // const getPlannedDuration = (status: string): number => {
  //   const durations: { [key: string]: number } = {
  //     Inspection: 60,
  //     Repair: 180,
  //     'Quality Check': 30,
  //     Delivery: 20,
  //   };
  //   return durations[status] || 60;
  // };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(jobs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.vehicleNumber.toLowerCase().includes(query) ||
        job.orderNumber.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query)
    );

    setFilteredVehicles(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-2 bg-blue-600 text-white shadow-md">
        <Header />
        
      </header>
      <div className="flex flex-col items-center mb-4 mt-2 px-2 py-2 justify-center border-b">
        <CreateVehicleForm onVehicleCreated={fetchVehicles} />
      </div>
      <main className="p-2">
        

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Vehicle Number or Job Card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Workshop Board */}
        {filteredVehicles.length > 0 ? (
            <VehicleList vehicleList={filteredVehicles} />
        ) : (
            <div>No vehicles found</div>
        )}
      </main>
    </div>
  );
}
