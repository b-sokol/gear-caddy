import tokenService from './tokenService';

const BASE_URL = '/api/rigs';

export default {
  index,
  create,
  update,
  deleteRig,
};

function index() {
  const options = {
    method: 'GET',
    headers: {
    Authorization: 'Bearer ' + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

function create(rig) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(rig)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

function update(rig) {
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
    body: JSON.stringify(rig),
  };
  return fetch(`${BASE_URL}/${rig._id}`, options).then((res) => res.json());
}

function deleteRig(id) {
  const options = {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + tokenService.getToken() },
  };
  return fetch(`${BASE_URL}/${id}`, options).then((res) => res.json());
}
