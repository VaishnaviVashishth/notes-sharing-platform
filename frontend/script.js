const API = "http://localhost:5000";

// Register
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.msg);

  window.location = "login.html";
}

// Login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.user) {
    alert("Login successful!");
    window.location = "upload.html";
  } else {
    alert(data.msg);
  }
}

// Upload Notes
async function uploadNote() {
  const form = new FormData();
  form.append("title", document.getElementById("title").value);
  form.append("subject", document.getElementById("subject").value);
  form.append("uploadedBy", document.getElementById("uploadedBy").value);
  form.append("pdf", document.getElementById("pdf").files[0]);

  await fetch(API + "/api/notes/upload", {
    method: "POST",
    body: form
  });

  alert("PDF uploaded!");
}

// Load Notes
async function loadNotes() {
  const subject = document.getElementById("filter").value;
  const search = document.getElementById("searchBox").value;

  const res = await fetch(`${API}/api/notes?subject=${subject}&search=${search}`);
  const notes = await res.json();

  document.getElementById("notes").innerHTML = notes.map(n => `
  <div class="note-card">
    <div class="note-title">${n.title}</div>
    <div class="note-subject">${n.subject}</div>
    <a class="download-btn" href="${API}/uploads/${n.filePath}" download>
      Download PDF
    </a>
    <div style="margin-top:10px;">
      <button onclick="like('${n._id}')">👍</button> ${n.likes}
    </div>
  </div>
`).join("");
}

// Like system
async function like(id) {
  await fetch(API + "/api/notes/like/" + id, { method: "POST" });
  loadNotes();
}

// Admin Login
async function adminLogin() {
  const id = document.getElementById("aid").value;
  const password = document.getElementById("apass").value;

  const res = await fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Admin login successful!");
    
    // ✅ Redirect to local file (NOT server path)
    window.location.href = "admin-dashboard.html";
  } else {
    alert(data.msg);
  }
}
// Load admin data
async function loadAdminData() {
  // Fetch Notes
  const notesRes = await fetch("http://localhost:5000/api/admin/notes");
  const notes = await notesRes.json();

  document.getElementById("adminNotes").innerHTML = notes.map(n => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <b>${n.title}</b> (${n.subject})<br>
      Uploaded by: ${n.uploadedBy}<br>
      <button onclick="deleteNote('${n._id}')">❌ Delete</button>
    </div>
  `).join("");

  // Fetch Users
  const usersRes = await fetch("http://localhost:5000/api/admin/users");
  const users = await usersRes.json();

  document.getElementById("adminUsers").innerHTML = users.map(u => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      ${u.name} - ${u.email}
    </div>
  `).join("");
}

// Delete note
async function deleteNote(id) {
  if (!confirm("Are you sure you want to delete this note?")) return;

  await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
    method: "DELETE"
  });

  alert("Note deleted");
  loadAdminData();
}
