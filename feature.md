# Feature Specification

## 1. Authentication Module

### Login

The system must provide a secure login page.

**Fields**

- Email
- Password

**Behavior**

- Validate email and password.
- Call authentication API.
- On success, redirect the user to the **Admin Dashboard**.
- Store authentication token securely.

---

### Forgot Password

Users must be able to request a password reset.

**Flow**

1. User enters their email.
2. System sends a password reset link to the email.
3. The link contains a secure reset token.

---

### Reset Password

When the user opens the reset link:

**Fields**

- New Password
- Confirm Password

**Behavior**

- Validate token.
- Update password via API.
- Redirect user to login page after successful reset.

---

# 2. Admin Dashboard

After login, users will land on a **Dashboard Page**.

The dashboard contains **summary statistics** and a **request management table**.

---

## Dashboard Statistics

Display the following counters:

- Total Requests
- Proposal Sent
- Proposal Accepted
- Under Review
- Ongoing
- Completed
- Live Support

These values should be fetched from the backend API.

---

# 3. Project Requests Table

The dashboard must include a table listing all project requests.

## Table Columns

| Column       | Description                     |
| ------------ | ------------------------------- |
| Name         | Client name                     |
| Email        | Client email                    |
| Status       | Current request status          |
| Budget       | Requested budget                |
| Project Type | Type of project                 |
| Request Date | Date when request was submitted |
| Last Update  | Last updated timestamp          |
| Action       | Action menu                     |

---

## Table Features

- Server-side pagination
- Server-side sorting
- Search functionality
- Filters (optional)
- Responsive layout

---

# 4. Action Menu

Each row in the table must contain an **Action Menu** with the following options:

- View Request
- Send Proposal

---

# 5. View Request (Modal)

Clicking **View Request** opens a modal displaying full request details.

The modal should show:

- Name
- Email
- Phone
- Project Type
- Budget
- Timeline
- Description
- Request Date
- Current Status

The modal is **read-only**.

---

# 6. Send Proposal (Modal)

Clicking **Send Proposal** opens a modal containing a **proposal editor**.

## Modal Content

The modal should contain:

- Proposal HTML editor
- Pre-filled project data

### Auto-filled Variables

The proposal content should automatically include data from the request such as:

- Client Name
- Project Name
- Project Type
- Budget
- Timeline
- Company Information
- Proposal Reference Number
- Date

These variables will populate the proposal template dynamically.

---

# 7. Proposal Generation Flow

When the admin submits the proposal:

1. Generate proposal HTML.
2. Convert HTML to a file (PDF or HTML).
3. Call **Upload File API** to upload the proposal document.
4. After upload success, call the **Send Proposal API** (already implemented).
5. Update the request status to **Proposal Sent**.

---

# 8. Table Update After Proposal

After sending the proposal:

- Update the row data.
- Refresh the table.
- Update dashboard counters.
- Update **Last Update** column.

---

# 9. Status Lifecycle

A request may move through the following statuses:

1. New Request
2. Proposal Sent
3. Under Review
4. Proposal Accepted
5. Ongoing
6. Completed
7. Live Support

---

# 10. Security Requirements

- Only **admin users** can access the dashboard.
- Protect routes with authentication middleware.
- Validate all API requests.
- Use secure token storage.

---

# 11. UI/UX Requirements

- All modals must be responsive.
- Forms must include validation.
- Loading states should be displayed during API calls.
- Toast notifications for success and error messages.

---

# 12. APIs Used

The system will use the following APIs:

- Login API
- Forgot Password API
- Reset Password API
- Get Requests API
- Upload File API
- Send Proposal API

---

# 13. Expected Outcome

The admin should be able to:

- Login securely
- View project requests
- Inspect request details
- Generate proposals quickly
- Send proposals directly to clients
- Track request progress through the dashboard
