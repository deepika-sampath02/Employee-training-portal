# XYZ Academy Backend (Django + DRF + JWT)

Backend for the XYZ Academy corporate training portal: employees and login, courses and
modules, each employee's own progress, tasks, certificates, sessions and the contact form.

## 1. Setup (Windows PowerShell)

```
cd xyz_backend            (the folder that contains manage.py)
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo --password "ChooseAStrongPassword1!"
python manage.py runserver
```

The API runs at **http://localhost:8000/api/** and the admin at **http://localhost:8000/admin/**.
Your React app stays on http://localhost:5173 (CORS is already allowed for it).

`seed_demo` creates the 8-course catalog (from your original `coursesData`) and these accounts, all
with the password you pass in:

| Username | Role | Notes |
|---|---|---|
| `super_admin` | Super admin | Can use the Django admin |
| `hr_admin` | HR / admin | Can manage employees and enrollments through the API |
| `aravind` | Trainer | |
| `deepika` | Employee | Enrolled in all 8 courses, with the same starting progress as the old demo data |

`seed_demo --no-demo-data` creates only `super_admin` and the course catalog.

### Updating from the previous version
The simplest route, if your database only holds demo/test data: stop the server, **delete `db.sqlite3`**,
and run `migrate` and `seed_demo` again (steps above). To keep the database instead, run
`python manage.py migrate`. Old demo courses will stay in it, so you will probably want to remove them
in the admin afterwards.

## 2. Everyday tasks (all in the Django admin)

- **Add an employee:** Employees > Add. Fill in username, name, email, password, role. Open the saved
  employee to add phone, department, designation, joining date and photo. The employee ID (EMP0001...)
  is automatic.
- **Add or edit a course:** Courses > Add. Add its modules in the **Modules** section on the same page
  (video link, notes, objectives, and the module's assignment). Set **Banner key** to one of
  `python, react, sql, communication, excel, time, leadership, presentation`
  (new keys need an image added in the frontend file `src/data/banners.js`).
- **Give an employee a course:** Enrollments > Add (employee + course). Their tasks are created
  automatically from each module's assignment, with deadlines counted from the enrollment date
  (the module's "due after days" setting).
- **See an employee's progress:** open their Enrollment; completed modules are listed there.
- **Read contact-form messages:** Contact messages.

Modules are completed in order. Finishing the last module marks the course complete and issues a
certificate automatically.

## 3. API reference

All endpoints are under `/api/`. Send `Authorization: Bearer <access>` except where noted.

**Account**

| Method | Endpoint | Who | Purpose |
|---|---|---|---|
| POST | `auth/login/` | public | `{identifier, password, remember_me}` (`email` or `username` also accepted). Returns `access`, `refresh`, `user` |
| POST | `auth/refresh/` | public | `{refresh}` returns a new `access` |
| GET/PATCH | `auth/me/` | any user | Own profile (name, phone, photo are editable) |
| POST | `auth/change-password/` | any user | `{old_password, new_password}` |

**Employee data (what the React app uses)** - each employee only ever sees their own

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `my-courses/` | Assigned courses with modules and this employee's progress (`status`: completed / current / locked) |
| POST | `my-courses/<course>/modules/<module>/complete/` | Complete a module (must be done in order) |
| GET | `my-tasks/` | This employee's tasks (`status`: pending / completed / overdue) |
| POST | `my-tasks/<id>/submit/` | `{submission}` completes one task |
| POST | `my-tasks/submit-by-module/` | `{courseId, moduleId, submission}` |
| GET | `dashboard/` | Stats, upcoming sessions, unread notification count |
| GET/PATCH | `notifications/`, POST `notifications/mark-all-read/` | Notification bell |
| GET | `certificates/` | Own certificates |
| GET | `sessions/` | Upcoming live sessions |

**Admin / HR only**

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `employees/` | List (`?search=&role=&department=&active=`) / create |
| GET/PATCH | `employees/{id}/` | View / edit |
| DELETE | `employees/{id}/` | **Deactivates** (never hard-deletes) |
| POST | `employees/{id}/activate/` | Re-activate |
| POST | `employees/{id}/reset-password/` | `{password}` |
| GET/POST/PATCH | `courses/`, `enrollments/`, `tasks/`, `sessions/` | Manage catalog, assignments, tasks, sessions |

**Public:** `GET courses/` (course catalog) and `POST contact/` (Contact Us form).

## 4. Security notes

- Passwords are hashed by Django. Login gives the same error for an unknown user, a wrong password and
  a deactivated account, and is limited to 10 attempts per minute per IP.
- Access tokens last 30 minutes and refresh automatically. "Remember Me" extends the refresh token to 30 days.
- Employees can only read and change their own progress, tasks and profile. Admins cannot create or
  modify a super admin; only a super admin can.
- **Before deploying:** set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS` and
  `CORS_ALLOWED_ORIGINS` (see `.env.example`), switch to PostgreSQL, and serve over HTTPS.
