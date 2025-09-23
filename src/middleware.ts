import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {

const jwt = await getToken({ req });

console.log('jwt' , jwt); 

if( jwt ){

    return NextResponse.next(); 

}
    return NextResponse.redirect(`${process.env.MY_DOMAIN}/login`); 

};

export const config = {

    matcher: ['/cart:path*' , '/washlist' ]

};
