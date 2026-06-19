/*
import { NextResponse } from "next/server";
//protecting the routes from unauthorized users.
export function proxy(request){
    
    const token = request.cookies.get("token");

    if(!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher:['/dashboard/:path*']
}
*/