import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

// Will be executed in between of any request "" any page "" and the response of it
export default async function middleware(req: NextRequest) {


// check user with Token ==> authenticaed or unauthenticaed

//   const token = await getToken({ req });

// Why use getToken? ==> getToken is a function could only be used inside middleware and Route Handlers Only 

const jwt = await getToken({ req });

console.log('jwt' , jwt); 


if( jwt ){

    // this function must return ==> NextResponse
    
    // .next ==> will navigate the user to the desired path
    return NextResponse.next(); 

}

    // this function must return ==> NextResponse

    // .redirect ==> will navigate the user to the desired path
    return NextResponse.redirect(`${process.env.MY_DOMAIN}/login`); 


};

export const config = {


    matcher: ['/cart:path*' , '/washlist' ]

};
