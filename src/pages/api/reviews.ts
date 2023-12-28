import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async () => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*");

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response(JSON.stringify(data));
}
