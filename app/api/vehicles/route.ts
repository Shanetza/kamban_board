import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db/drizzle"; // Ensure this points to your Drizzle setup
import { jobsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server'

// export async function GET(req: NextApiRequest, res: NextApiResponse) {

//     try {
//         const { query } = req;

//         if (query.id) {
//             const vehicle = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(query.id as string)));
//             return NextResponse.json(vehicle[0]);
//         }
//         else {
//             const vehicles = await db.select().from(jobsTable);
//             return NextResponse.json(vehicles);
//         }
        
//     } catch (error) {
//         return NextResponse.json({ error: (error as Error).message });
//     }
// }

// export async function GETbyID( { params }: { params: { id: string; }; }) {
//     try {
//         const job = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(params.id))).limit(1);
//         console.log(job);
//         return NextResponse.json(job[0]);
//     } catch (error) {
//         return NextResponse.json({ error: (error as Error).message });
//     }
// }


export async function POST(request: Request) {
    try {
        const data = await request.json()
        
        // Log the incoming data
        console.log('Incoming data:', data)
        const currentTime = new Date().toISOString()
        
        const vehicleData = {
            vehicleNumber: data.vehicleNumber,
            orderNumber: data.orderNumber,
            branch: data.branch,
            plannedDuration: data.plannedDuration,
            status: data.status,
            // startTime: currentTime,
        }
        
        // Log the formatted data
        console.log('Formatted data:', vehicleData)
        
        // Add error handling for the database operation
        try {
            const result = await db.insert(jobsTable).values(vehicleData).returning()
            console.log('Insert result:', result)
            return NextResponse.json({ success: true, data: result })
        } catch (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: 'Database operation failed', details: (dbError as Error).message },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Request error:', error)
        return NextResponse.json(
            { error: 'Failed to process request', details: (error as Error).message },
            { status: 400 }
        )
    }
}



export async function PUT(request: Request) {
    try {
        const data = await request.json()
        
        // Ensure we have an ID
        if (!data.id) {
            return NextResponse.json(
                { error: 'ID is required for updating records' },
                { status: 400 }
            )
        }

        const updateData = {
            // vehicleNumber: data.vehicleNumber,
            // orderNumber: data.orderNumber,
            // branch: data.branch,
            // plannedDuration: data.plannedDuration,
            status: data.status,
        }

        // Update the record
        try {
            const result = await db
                .update(jobsTable)
                .set(updateData)
                .where(eq(jobsTable.id, data.id))
                .returning()

            if (result.length === 0) {
                return NextResponse.json(
                    { error: 'Record not found' },
                    { status: 404 }
                )
            }

            return NextResponse.json({ success: true, data: result[0] })
        } catch (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: 'Database operation failed', details: (dbError as Error).message },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Request error:', error)
        return NextResponse.json(
            { error: 'Failed to process request', details: (error as Error).message },
            { status: 400 }
        )
    }
}



