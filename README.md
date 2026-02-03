# 🏥 PatientApp UI – React + TypeScript + Vite

A complete user interface for **Patient and Medical Appointment Management**, built with **React**, **TypeScript**, and **Vite**. PatientApp UI offers a seamless experience for patients, doctors, and administrators to manage appointments, medical records, and user profiles, all in a modern and responsive design.

---

## 🚀 Features

- ✅ **Role-Based User Authentication** (Login, Registration for Patients, Doctors, and Administrators).
- ✅ **Medical Appointment Management**: Create, view, update, and cancel appointments.
- ✅ **Patient Management**: Administration of patient profiles and access to their history.
- ✅ **Doctor Management**: Doctor profiles and viewing of their scheduled appointments.
- ✅ **Medical History**: Access and management of patient medical records.
- ✅ **Admin Dashboard**: Panel for user management (patients and doctors).
- ✅ **Responsive Design**: Built with **Tailwind CSS** and **Shadcn/UI** for an optimal user experience on any device.
- ✅ **Modular Architecture**: The project is organized into modules for better scalability and maintenance (Auth, Patients, Doctors, Appointments, etc.).

---

## 🛠️ Requirements

- **Node.js 18+**
- **npm 9+** or a compatible package manager (yarn, pnpm).

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ovtt17/patient-app-ui.git
cd patient-app-ui
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add your environment variables. These variables are necessary to connect with the backend and authentication services.

```env
VITE_API_URL='http://localhost:8080/api/v1'
VITE_GOOGLE_OAUTH_URL='http://localhost:8080/api/v1/oauth2/authorization/google'
VITE_FACEBOOK_OAUTH_URL='http://localhost:8080/api/v1/oauth2/authorization/facebook'
VITE_APP_URL='http://localhost:5173'
```

---

### 4️⃣ Run the Application

```bash
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```

---

## 🧩 Modules

This project is divided into the following functional modules:

- **Auth**: Handles login, registration, and session management for different roles.
- **Patient**: Allows patients to view their profile, medical history, and manage their appointments.
- **Doctor**: Allows doctors to view their profile, appointment schedule, and manage their patients' records.
- **Admin**: Provides a panel for the administration of all system entities (users, doctors, etc.).
- **Appointments**: Logic for creating and managing medical appointments.
- **Medical Record**: Management of patients' clinical history.
- **Reports**: Report generation (future functionality).

---

## 🤝 Contributing

Want to help improve the application? Follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
  git checkout -b feature/your-new-feature
```

3. Make your changes and commit them:

```bash
  git commit -am 'Add new feature'
```

4. Push to your fork:

```bash
  git push origin feature/your-new-feature
```

5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions, ideas, or feedback, feel free to [open an issue](https://github.com/Ovtt17/patient-app-ui/issues).
