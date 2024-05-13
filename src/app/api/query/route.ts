// /api/query/
import { NextResponse } from "next/server";
import pool from "../db";
export async function GET(request: Request) {
    try {
        const db = await pool.getConnection();
        const query = `select * 
        from words
        inner join definitions on words.id = definitions.word_id
        inner join readings
        on words.id = readings.word_id`;
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
    
}
