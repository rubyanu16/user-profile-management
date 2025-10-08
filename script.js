
const apiUrl = 'http://localhost:3000/users';
const userForm = document.getElementById('userForm');
const userTable = document.querySelector('#userTable tbody');

// Fetch and display users
async function fetchUsers() {
    const res = await fetch(apiUrl);
    const users = await res.json();
    userTable.innerHTML = '';
    users.forEach(user => {
        const row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>`;
        userTable.innerHTML += row;
    });
}

// Add new user
userForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    await fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email })
    });
    userForm.reset();
    fetchUsers();
});

// Delete user
async function deleteUser(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchUsers();
}

// Edit user
async function editUser(id, name, email) {
    const newName = prompt('Enter new name', name);
    const newEmail = prompt('Enter new email', email);
    if (newName && newEmail) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, email: newEmail })
        });
        fetchUsers();
    }
}

fetchUsers();