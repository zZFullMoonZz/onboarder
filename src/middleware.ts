import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("Middleware token:", token);
      return !!token?.email;
    },
  },
});

export const config = {
  matcher: ["/home-page/:path*"],
};
