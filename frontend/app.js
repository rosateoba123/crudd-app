const API = "https://crud-backend.onrender.com/users";

let editingId = null;

async function getUsers() {
  const response = await fetch(API);
  const users = await response.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    userList.innerHTML += `
            <li>
                ${user.name} - ${user.email}
                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
            </li>
        `;
  });
}

async function saveUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (editingId === null) {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
  } else {
    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    editingId = null;
    document.getElementById("saveBtn").innerText = "Guardar";
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  getUsers();
}

function editUser(id, name, email) {
  editingId = id;

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;

  document.getElementById("saveBtn").innerText = "Actualizar";
}

async function deleteUser(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  getUsers();
}

getUsers();
