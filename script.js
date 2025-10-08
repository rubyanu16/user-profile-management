
const API_URL = '/api/users';

async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td>
          <button class="edit" onclick="editUser('${u._id}')">Edit</button>
          <button class="delete" onclick="deleteUser('${u._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addOrUpdateUser() {
  const id = document.getElementById('userId').value;
  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }
  clearForm();
  fetchUsers();
}

function editUser(id) {
  fetch(API_URL)
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u._id === id);
      document.getElementById('userId').value = user._id;
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('phone').value = user.phone;
    });
}

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

function clearForm() {
  document.getElementById('userId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

fetchUsers();