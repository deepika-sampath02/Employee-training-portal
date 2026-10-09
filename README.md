# XYZ Academy: Corporate Training Employee Portal

A learning portal for companies. Employees sign in, see the courses assigned to them, work through
modules in order, submit assignments, track progress and earn certificates. HR and admins manage
people, courses and enrollments from the Django admin.

- **Frontend:** React (Vite) + Tailwind CSS + react-router-dom v6 + react-icons, at http://localhost:5173
- **Backend:** Django 5.2 + Django REST Framework + JWT (simplejwt), at http://localhost:8000
- **Database:** SQLite by default (zero setup). PostgreSQL is supported through environment variables.

---

## 1. Project layout

```
Employee-training-portal/            <- the React app (run npm commands here)
|-- src/
|   |-- App.jsx                      <- routes + providers
|   |-- main.jsx                     <- BrowserRouter + ThemeProvider only
|   |-- services/api.js              <- fetch wrapper: adds token, refreshes on 401
|   |-- context/
|   |   |-- AuthContext.jsx          <- who is signed in; login / logout / updateUser
|   |   |-- CoursesContext.jsx       <- the signed-in employee's courses + progress
|   |   |-- TasksContext.jsx         <- the signed-in employee's tasks
|   |   `-- ThemeContext.jsx
|   |-- components/                  <- Topbar, ProtectedRoute, DataGate, ...
|   |-- data/banners.js              <- banner key -> image
|   `-- pages/                       <- Home, About, Contact, Login, dashboard/*
`-- xyz_backend/                     <- the Django project (the folder with manage.py)
    |-- config/                      <- settings.py, urls.py
    |-- accounts/                    <- Employee model, login, profile, employee API
    |-- learning/                    <- courses, modules, enrollments, tasks, certificates ...
    |-- requirements.txt
    `-- .env.example
```

---

## 2. First-time setup (Windows PowerShell)

You need **Python 3.11+** and **Node.js 18+** installed.

### 2.1 Backend

```powershell
cd "D:\corporate project\Employee-training-portal\xyz_backend"     # the folder that contains manage.py
python -m venv venv
venv\Scripts\Activate.ps1                                          # (venv) should appear at the start of the line
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo --password "ChooseAStrongPassword1!"
python manage.py runserver
```

Leave this window open. The API is at http://localhost:8000/api/ and the admin at http://localhost:8000/admin/.

If PowerShell refuses to run `Activate.ps1`, run this once and try again:
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

### 2.2 Frontend (second PowerShell window)

```powershell
cd "D:\corporate project\Employee-training-portal"
npm install
npm run dev
```

Open http://localhost:5173.

### 2.3 Starting it again later

Every time you come back, you need both windows:

| Window | Commands |
|---|---|
| Backend | `cd ...\xyz_backend` then `venv\Scripts\Activate.ps1` then `python manage.py runserver` |
| Frontend | `cd ...\Employee-training-portal` then `npm run dev` |

---

## 3. Accounts created by `seed_demo`

All accounts get the password you passed to `--password`. The password is applied **only when an
account is first created**; re-running `seed_demo` never changes an existing password.

| Username | Role | Notes |
|---|---|---|
| `super_admin` | Super admin | Can use the Django admin and everything else |
| `hr_admin` | HR / admin | Manages employees and enrollments through the API |
| `aravind` | Trainer | |
| `deepika` | Employee | Enrolled in all 8 courses with demo progress |

Sign in on the React login page with either the **username** or the **email**.

`python manage.py seed_demo --password "..." --no-demo-data` creates only `super_admin` and the course catalog.

**Change any password:**
```powershell
python manage.py changepassword <username>
```
(Stop the server first, or use a second backend window.)

---

## 4. How the system works (the flow)

```
Employee (person) --enrolled in--> Course (template, has Modules)
        |                                |
        |                                +-- each Module has an assignment
        v
 Enrollment  ------------------------------------------------+
   - saving it creates this employee's Tasks (one per module  |
     assignment, with due dates counted from the enrollment)  |
   - tracks progress (completed modules)                      |
   - at 100% a Certificate is issued automatically            |
```

1. **Employees:** HR creates a person in the Django admin (Employees > Add): username, name, email,
   password, role. The employee ID (EMP0001, EMP0002 ...) is automatic.
2. **Courses:** the catalog. A course contains **Modules** (video link, notes, objectives, assignment).
   A course belongs to nobody until someone is enrolled.
3. **Enrollments:** this is what gives an employee a course. **A new employee sees no courses, tasks or
   certificates until you enroll them.** That is by design: everything is per employee.
4. **Progress:** modules must be completed in order. The first unfinished module is "current", the rest
   are "locked". Completing a module is saved in the database, so it survives refresh and sign-out.
5. **Tasks:** created from the module assignments at enrollment. Status is `pending`, `completed`, or
   `overdue` (past due date).
6. **Certificates:** issued automatically when the last module of a course is completed.
7. **Live sessions and notifications:** sessions are shared by everyone; notifications belong to one employee.
8. **Contact Us:** messages from the public form are saved and can be read in the admin.

### What each employee sees

Each employee only ever gets **their own** courses, progress, tasks, certificates, notifications and
profile. This is enforced in the backend, not only in the screens.

---

## 5. Everyday tasks (Django admin, http://localhost:8000/admin/)

Sign in as `super_admin`.

| I want to... | Go to |
|---|---|
| Add an employee | **Employees > Add**. After saving, reopen to add phone, department, designation, joining date, photo |
| Deactivate an employee | Open them, untick **Active**. They can no longer sign in, but their records stay |
| Give an employee a course | **Enrollments > Add** (employee + course). Tasks are created automatically |
| See an employee's progress | **Enrollments**, open the row; completed modules are listed |
| Add a course | **Courses > Add**. Add its modules in the **Modules** section on the same page |
| Set a course banner | Set **Banner key** to one of `python, react, sql, communication, excel, time, leadership, presentation` |
| Add a brand-new banner image | Add the image to `src/assets`, import it in `src/data/banners.js`, add a key, then use that key in the admin |
| Add a live session | **Live sessions > Add** |
| Send an employee a notification | **Notifications > Add** |
| Read contact-form messages | **Contact messages** |

**Careful when adding a course:** a course you create by hand has **no modules** until you add them in
the Modules section. Enrolling someone in a course with no modules shows an empty course. Also check
**Courses** for duplicates (for example two "Python Fundamentals") before enrolling.

---

## 6. API reference

Base URL: `http://localhost:8000/api/`. Send `Authorization: Bearer <access token>` on everything except
the public endpoints. The React app does this automatically.

### Account
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `auth/login/` | `{identifier, password, remember_me}` (`username` or `email` also accepted). Returns `access`, `refresh`, `user` |
| POST | `auth/refresh/` | `{refresh}` returns a new `access` |
| GET / PATCH | `auth/me/` | Own profile. Editable: name, phone, photo |
| POST | `auth/change-password/` | `{old_password, new_password}` |

### Employee data (used by the React app)
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `my-courses/` | Assigned courses, modules and this employee's progress (`completed` / `current` / `locked`) |
| POST | `my-courses/<course>/modules/<module>/complete/` | Complete a module (must be in order) |
| GET | `my-tasks/` | This employee's tasks (`pending` / `completed` / `overdue`) |
| POST | `my-tasks/<id>/submit/` | `{submission}` completes one task |
| POST | `my-tasks/submit-by-module/` | `{courseId, moduleId, submission}` |
| GET | `dashboard/` | Stats, upcoming sessions, unread notification count |
| GET / PATCH | `notifications/`, POST `notifications/mark-all-read/` | Notification bell |
| GET | `certificates/` | Own certificates |
| GET | `sessions/` | Upcoming live sessions |

### Admin / HR only
| Method | Endpoint | Purpose |
|---|---|---|
| GET / POST | `employees/` | List (`?search=&role=&department=&active=`) / create |
| GET / PATCH | `employees/{id}/` | View / edit |
| DELETE | `employees/{id}/` | **Deactivates** (never hard-deletes) |
| POST | `employees/{id}/activate/` | Re-activate |
| POST | `employees/{id}/reset-password/` | `{password}` |
| GET / POST / PATCH | `courses/`, `enrollments/`, `tasks/`, `sessions/` | Manage catalog, assignments, tasks, sessions |

### Public
`GET courses/` (catalog) and `POST contact/` (Contact Us form).

---

## 7. Security

- Passwords are hashed by Django. Login shows the same error for an unknown user, a wrong password and a
  deactivated account, and is limited to 10 attempts per minute per IP (contact form: 5 per minute).
- Access tokens last 30 minutes and refresh automatically. **Remember Me** keeps the user signed in for
  30 days (token stored in `localStorage`); otherwise the token lives in `sessionStorage` and ends with the tab.
- Admins cannot create or change a super admin; only a super admin can.
- Employees cannot read or change anyone else's progress, tasks or profile.

---

## 8. Configuration

Copy `.env.example` to `.env` in `xyz_backend` and edit. Defaults work for local development.

| Variable | Purpose |
|---|---|
| `DJANGO_SECRET_KEY` | **Set a long random value in production** |
| `DJANGO_DEBUG` | `True` for development, `False` in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated host names |
| `CORS_ALLOWED_ORIGINS` | Frontend addresses allowed to call the API (localhost:5173 is allowed by default) |
| `DB_ENGINE=postgres` | Switch from SQLite to PostgreSQL (with the usual `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`) |

Time zone is `Asia/Kolkata`.

### Before putting it online
1. Set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`.
2. Switch to PostgreSQL.
3. Serve both frontend and API over HTTPS.
4. Build the frontend with `npm run build` and point it at the real API address.
5. Serve uploaded photos (`media/`) from a proper web server or storage service.

---

## 9. Troubleshooting

| Problem | Cause and fix |
|---|---|
| `Could not open requirements file` | You are in the wrong folder. `cd` into the folder that contains `manage.py` and `requirements.txt` (it may be a nested `xyz_backend\xyz_backend`) |
| `(venv)` created inside the frontend folder | Run `deactivate`, delete that `venv` folder, then create it inside `xyz_backend` |
| Blank white screen, console says `useAuth must be used inside <AuthProvider>` | `main.jsx` must not contain `CoursesProvider` or `TasksProvider`. Only `BrowserRouter > ThemeProvider > App`. `App.jsx` holds `AuthProvider > CoursesProvider > TasksProvider`. Save, restart `npm run dev`, then Ctrl+Shift+R |
| "Incorrect email/username or password" | Wrong password, or the account is inactive. `seed_demo` does not change existing passwords. Run `python manage.py changepassword <username>` |
| Django admin: "Please enter the correct username and password for a staff account" | Same: reset with `changepassword`, and use the **username** (`super_admin`) |
| Employee sees 0 courses, 0 tasks | Not enrolled. Add them in **Enrollments** |
| Employee sees an empty course | The course has no modules. Add modules in **Courses**, or enroll them in the real course |
| Dashboard shows an error / "could not load" | Backend is not running, or you are signed out. Start `runserver` and sign in again |
| 404 at http://127.0.0.1:8000/ | Normal. Use `/admin/` or `/api/...`; the app itself is at :5173 |
| Port already in use | Close the old terminal window that is still running the server |
| Start completely fresh (test data only) | Stop the server, delete `db.sqlite3`, run `migrate` and `seed_demo` again |

---

## 10. Known limits (still fixed text in the frontend)

- Profile: Reporting Structure, Achievements, Recent Activity.
- Dashboard: Assignments Due, Learning Streak, Upcoming Certificate.
- Certificates page: issue dates and credential IDs.
- Forgot Password does nothing yet.
- There is no in-app employee-management screen; use the Django admin (the API for it exists).
- Not yet checked against the backend data: `Lesson.jsx`, `CoursesDetails.jsx`, `TaskDetails.jsx`.