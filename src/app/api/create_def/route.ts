import { NextResponse } from "next/server";
import pool from "../db";
export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const def = formData.def;
        const word_id = formData.word_id;
        const word_type = formData.word_type;
        if(!(def&&word_id&&word_type)){
            return NextResponse.json({
                error: "Missing parameters"
            }, {status: 500})
        }
        const db = await pool.getConnection();
        const query = `
        INSERT INTO definitions (def, word_id, word_type)
        VALUES ('${def}','${word_id}','${word_type}')`;
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