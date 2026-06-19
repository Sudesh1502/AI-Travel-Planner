import { NextResponse } from "next/server";

export function proxy(request) {
    // TEMPORARILY DISABLED: Always allow the request to pass through
    return NextResponse.next();
}

export const config = {
    // Match nothing, or just leave empty to be safe
    matcher: []
};