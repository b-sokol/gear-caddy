import tokenService from './tokenService';

const BASE_URL = '/api/pedals';

export default {
  index,
  create,
  update,
  deleteOne,
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

function create(pedal) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
    body: JSON.stringify(pedal),
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

function update(pedal) {
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
    body: JSON.stringify(pedal),
  };
  return fetch(`${BASE_URL}/${pedal._id}`, options).then((res) => res.json());
}

function deleteOne(id) {
  const options = {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + tokenService.getToken() },
  };
  return fetch(`${BASE_URL}/${id}`, options).then((res) => res.json());
}
