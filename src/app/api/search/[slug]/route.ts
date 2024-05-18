import { NextRequest, NextResponse } from "next/server";
import pool from "../../db";

export async function GET(request: NextRequest, {params}: {params: {slug: string}}) {

    const slug = params.slug;

    try {
        const db = await pool.getConnection();
        const query = `select id, word, 'word' as matched_column
        from words
        where word like ?
        union
        select word_id, reading, 'readings' as matched_column
        from readings
        where reading like ?
        union
        select word_id, def, 'def' as matched_column
        from definitions
        where match(def) against (? IN NATURAL LANGUAGE MODE)`;
        const [rows] = await db.execute(query, ["%" + slug + "%", slug, slug]);
        db.release();

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }

}