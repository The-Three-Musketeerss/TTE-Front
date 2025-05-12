import { useCookies } from "react-cookie";
import { decodeJwt } from "@utils/functions";


export const useGetUser = () => {
    const [cookie] = useCookies(['session']);
    const decoded = cookie.session && decodeJwt(cookie.session.token);
    const user = cookie.session
        ? {
              username: cookie.session.username,
              email: cookie.session.email,
              role: decoded.role,
              token: cookie.session.token,
          }
        : null;
    const hasLoggedIn = !!user;

    return {
        user,
        hasLoggedIn,
    };

}