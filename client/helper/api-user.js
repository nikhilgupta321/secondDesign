const getUser = async (credentials) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const userById = async (params, signal) => {
  try {
    let response = await fetch(`/api/users/${params.id}`, {
      method: "GET",
      signal: signal,
    });
    const result = await response.json();
    return result
  } catch (err) {
    console.error(err);
    return { error: err }
  }
}

const updateUser = async (data, credentials, params) => {
  try {
    let response = await fetch(`/api/users/${params.id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
    });
    console.error(response);
    return await response.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

export { getUser, updateUser, userById };
