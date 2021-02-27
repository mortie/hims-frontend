import Cookies from "js-cookie";
import { USER_TOKEN, JSESSIONID, SESSION_TIME_OUT } from "./constants";

/**
 * Start login session by setting user and authorization cookie for 30 minutes
 * and redirect user back to the page from where he was or to the home page.
 * @param {object} user the user object recieved from the session API.
 * @param {string} authorization the encrypted string send to the server in authorization header.
 * @param {object} history browser's history object.
 * @param {object} {from={ pathname: "/app/home" }} location's state's from object to where redirect the user. If no value is passed default value(/app/home) is used.
 */
export const login = (
  user,
  authorization,
  history,
  from = { pathname: "/app/home" }
) => {
  Cookies.set(JSESSIONID, authorization, { expires: SESSION_TIME_OUT });
  localStorage.setItem(USER_TOKEN, JSON.stringify(user));
  history.push(from);
};

/**
 * update the cookies time
 */
export const updateSession = () => {
  Cookies.set(JSESSIONID, Cookies.get(JSESSIONID), {
    expires: SESSION_TIME_OUT,
  });
};

/**
 * End login session by deleting user and authorization cookie and redirect user back to the sign in page.
 * @param {object} history
 */
export const logout = (history) => {
  Cookies.remove(JSESSIONID);
  localStorage.removeItem(USER_TOKEN);
  history.push("/signin");
};

/**
 * Returns true if both user and authorization cookies are set else false.
 */
export const isLogin = () => {
  if (Cookies.get(JSESSIONID) && localStorage.getItem(USER_TOKEN)) {
    return true;
  }
  return false;
};

/**
 * @returns {object}
 */
export const getAuthenticatedUser = () => {
  if (isLogin()) {
    return JSON.parse(localStorage.getItem(USER_TOKEN));
  }
};

/**
 * returns true if user role(s) has access to visibleOnSidebar the screen else returns false.
 * @param {Array<String>} roles list of roles
 * @returns {Boolean} found
 */
export const hasAccess = (roles) => {
  let found = false;
  getAuthenticatedUser()?.roles.forEach((role) => {
    if (roles.includes(role.name) || roles.includes("*")) {
      found = true;
    }
  });
  return found;
};
