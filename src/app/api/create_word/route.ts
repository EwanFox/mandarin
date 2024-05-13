import { NextResponse } from "next/server";
import pool from "../db";
export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const word = formData.word;
        if(!word){
            return NextResponse.json({
                error: "Missing parameters"
            }, {status: 500})
        }
        const db = await pool.getConnection();
        const query = `
        INSERT INTO words (word)
        VALUES ('${word}')`;
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
    
}
