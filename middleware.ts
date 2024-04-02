import { NextRequest } from "next/server";
import { updateSession } from "./app/lib";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}
//This function is run on every request verified with the console.log
//This allows for continuous session updates on every request
//This can also be used for authentication and so much more