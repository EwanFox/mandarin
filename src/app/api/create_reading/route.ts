import { NextResponse } from "next/server";
import pool from "../db";
export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const word_id = formData.word_id;
        const reading = formData.reading;
        let def_id = formData.def_id;
        if(!(reading&&word_id)){
            return NextResponse.json({
                error: "Missing parameters"
            }, {status: 500})
        }
        const db = await pool.getConnection();
        if (def_id == undefined || def_id == '') def_id = "NULL";
        const query = `
        INSERT INTO readings (reading, word_id, def_id)
        VALUES ('${reading}','${word_id}', ${def_id})`;;
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