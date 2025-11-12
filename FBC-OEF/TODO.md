# Online Enrollment Portal - TODO List

## Phase 1: Project Setup
- [x] Create project structure (folders for assets, pages)
- [ ] Set up Firebase project (user needs to do this manually)
- [ ] Add Firebase config in JS

## Phase 2: Public Pages
- [x] index.html (Home with navbar, logins, register, captcha, video/picture, programs, about, quotes, footer)
- [x] about.html (FBC Background, Vision/Mission, Developer Message)
- [x] programs.html (FBC Available Programs)
- [x] contact.html (FBC Contacts, Developer Contact)

## Phase 3: Authentication
- [x] login.html (Admin/Student login - integrated in index.html)
- [x] register.html (New Student/Transferee with captcha - integrated in index.html)
- [x] auth.js (Firebase auth logic)

## Phase 4: Student Interface
- [x] student/dashboard.html (Welcome, video, programs, about, quotes)
- [x] student/enrollment-old.html (Steps: Basic Info, Family Background, Payments)
- [x] student/enrollment-freshmen.html (Steps: Basic Info, Educational Info, Family Background, Payments)
- [x] student/enrollment-transferee.html (Steps: Basic Info, Educational Info, Family Background, Payments)
- [x] enrollment.js (Form handling, multi-step logic)

## Phase 5: Admin Interface
- [x] admin/dashboard.html (Students, Teachers, Courses, Pending Approvals, Recent Activity)
- [ ] admin/users.html (Manage users)
- [ ] admin/courses.html (Manage courses)
- [ ] admin/enroll-students.html (Enroll students)
- [x] admin/pending-students.html (Approve pending)
- [ ] admin/settings.html (Settings)
- [x] admin.js (Admin functions, analytics)

## Phase 6: Additional Features
- [x] Prospectus display on student dashboard
- [x] Analytics for admin (regular/irregular students via API)
- [ ] ID request handling

## Phase 7: Styling and Assets
- [ ] style.css (Bootstrap or custom CSS)
- [ ] Add images/videos placeholders
- [ ] Responsive design

## Phase 8: Testing and Deployment
- [ ] Test all flows
- [ ] Deploy to Firebase Hosting
