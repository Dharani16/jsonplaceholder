const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const GET_POSTS = 'posts';

function addNewPost(item) {
  const headerParam = {
    method: 'POST',
    body: JSON.stringify({
      title: item.title,
      body: item.body,
      userId: Number(item.userId),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }
  return new Promise((resolve, reject) => {
    const ADD_POST_URL = `${BASE_URL}${GET_POSTS}`;
    fetch(ADD_POST_URL, headerParam)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => {
        console.error('NewPost Error:', error);
        reject(error);
      });
  })
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    const URL = `${BASE_URL}${GET_POSTS}`;
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          resolve(json);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  })
}

function updatePost(item) {
  return new Promise((resolve, reject) => {
    const UPDATE_URL = `${BASE_URL}${GET_POSTS}/${item.userId}`;
    const headerParam = {
      method: 'PUT',
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        body: item.body,
        userId: item.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    fetch(UPDATE_URL, headerParam)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.error('Update Error:', error);
        reject(error);
      });
  })
}

function deletePost(item) {
  return new Promise((resolve, reject) => {
    const DELETE_URL = `${BASE_URL}${GET_POSTS}/${item.id}`;
    fetch(DELETE_URL, {
      method: 'DELETE',
    }).then((response) => resolve(response))
      .catch((error) => {
        console.error('Delete Error:', error);
        reject(error);
      });;
  })
}

export { addNewPost, getAllPosts, deletePost, updatePost };