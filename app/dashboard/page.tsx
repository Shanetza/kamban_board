'use client';

import { getData } from "@/server/quries";
import WorkshopBoard from "../components/WorkshopBoard";
import { useEffect, useState } from "react";

interface Vehicle {
  id: number;
  branch: string;
  vehicleNumber: string;
  orderNumber: string;
  plannedDuration: number;
  status: string;
  startTime: Date;
}

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      const data = await getData();
      setVehicles(data);
    };
    fetchData();

    // Set up real-time updates using intervals
    const interval = setInterval(async () => {
      const data = await getData();
      setVehicles(data);
    }, 5000); // Fetch every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-2 py-2">
      <h1 className="text-2xl font-bold text-white text-center mb-2 p-4 bg-gray-500 rounded-lg">Vehicle Maintenance Dashboard</h1>
      <WorkshopBoard vehicles={vehicles} />
    </div>
  );
}