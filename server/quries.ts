'use server';

import { db } from '@/server/db/drizzle';
import { Job, jobsTable } from './db/schema';
import { eq } from 'drizzle-orm';
// export const getJobById = async (id: number) => {
//   try {
//     const response = await fetch(`/api/vehicles/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch job details');
//     }

//     const data = await response.json();
//     return {
//       id: data.id,
//       vehicleNumber: data.vehicleNumber,
//       orderNumber: data.orderNumber,
//       branch: data.branch,
//       plannedDuration: data.plannedDuration,
//       status: data.status
//     };
//   } catch (error) {
//     console.error('Error fetching job:', error);
//     throw error;
//   }
// };

// export const getAllJobs = async (): Promise<Job[]> => {
//   try {
//     const response = await fetch('/api/vehicles', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    

//     if (!response.ok) {
//       throw new Error('Failed to fetch jobs');
//     }

//     const data = await response.json();
//     return data.map((job: any) => ({
//       id: job.id,
//       vehicleNumber: job.vehicleNumber, 
//       orderNumber: job.orderNumber,
//       branch: job.branch,
//       startTime: job.startTime,
//       plannedDuration: job.plannedDuration,
//       status: job.status
//     }));
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     throw error;
//   }
// };

export const getData = async () => {
    const data = await db.select().from(jobsTable);
    
    return data;
  };

export const getJobById = async (id: number) => {
  const data = await db.select().from(jobsTable).where(eq(jobsTable.id, id));
  return data;
};

export const updateJobStatus = async (id: number, status: string) => {
  await db.update(jobsTable)
    .set({ status })
    .where(eq(jobsTable.id, id));
    
  // Return the updated record
  const updatedJob = await db.select()
    .from(jobsTable)
    .where(eq(jobsTable.id, id));
    
  return updatedJob[0];
};


export type JobResponse = {
  id: number;
  vehicleNumber: string;
  orderNumber: string;
  branch: string;
  startTime: string;
  plannedDuration: number;
  status: string;
};

