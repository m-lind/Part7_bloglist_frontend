let token = null;

const STORAGE_KEY = "loggedBlogAppUser";

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setUser,
  getUser,
  clearUser,
  getToken,
};
