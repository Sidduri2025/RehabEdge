-- =========================================================
-- RehabEdge – Iteration 2  •  MySQL schema + seed rows
-- Passwords here are placeholders only
-- =========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS DataStorage;
DROP TABLE IF EXISTS Report;
DROP TABLE IF EXISTS Notification;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS PatientExercisePlan;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS UserCredentials;

SET FOREIGN_KEY_CHECKS = 1;

-- 1) UserCredentials
CREATE TABLE UserCredentials (
  user_id INT PRIMARY KEY,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  salt VARCHAR(64) NOT NULL,
  role VARCHAR(16) NOT NULL,
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO UserCredentials VALUES
(1,'priya.sharma@rehabedge.com','hash$priyaa1','salt$1','Doctor',TRUE),
(2,'arjun.rao@rehabedge.com','hash$arjuna2','salt$2','Doctor',TRUE),
(3,'aarav.patel@rehabedge.com','hash$aaravp3','salt$3','Patient',FALSE),
(4,'diya.mehta@rehabedge.com','hash$diyam4','salt$4','Patient',FALSE),
(5,'admin.ops@rehabedge.com','hash$admin5','salt$5','Admin',TRUE);

-- 2) Doctor
CREATE TABLE Doctor (
  doctor_id INT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(60) NOT NULL,
  experience_years INT NOT NULL,
  availability VARCHAR(120) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES UserCredentials(user_id)
);

INSERT INTO Doctor VALUES
(101,1,'Dr. Priya Sharma','Orthopedic',12,'Mon/Wed/Fri 10:00-14:00'),
(102,2,'Dr. Arjun Rao','Physiotherapy',9,'Tue/Thu 09:00-12:00; Sat 10:00-13:00');

-- 3) Patient
CREATE TABLE Patient (
  patient_id INT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  contact VARCHAR(40),
  assigned_doctor_id INT NOT NULL,
  reminder_preference VARCHAR(24) DEFAULT 'Daily',
  FOREIGN KEY (user_id) REFERENCES UserCredentials(user_id),
  FOREIGN KEY (assigned_doctor_id) REFERENCES Doctor(doctor_id)
);

INSERT INTO Patient VALUES
(201,3,'Aarav Patel','1993-08-17','+1-206-555-0110',101,'Daily'),
(202,4,'Diya Mehta','1997-03-04','+1-425-555-0142',102,'Weekly');

-- 4) Exercise
CREATE TABLE Exercise (
  exercise_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(400) NOT NULL,
  target_body_part VARCHAR(60) NOT NULL,
  difficulty_level VARCHAR(12) NOT NULL,
  ai_model_ref VARCHAR(80)
);

INSERT INTO Exercise VALUES
(301,'Shoulder External Rotation','TheraBand rotation to improve shoulder mobility','Shoulder','Moderate','pose-v2.1-shoulder'),
(302,'Quad Sets','Isometric quad activation for knee stability','Knee','Easy','pose-v2.1-knee');

-- 5) PatientExercisePlan
CREATE TABLE PatientExercisePlan (
  plan_id INT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  exercise_id INT NOT NULL,
  scheduled_days VARCHAR(40) NOT NULL,
  duration_minutes INT NOT NULL,
  notes VARCHAR(300),
  FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
  FOREIGN KEY (exercise_id) REFERENCES Exercise(exercise_id)
);

INSERT INTO PatientExercisePlan VALUES
(401,201,101,301,'Mon,Wed,Fri',30,'Warm up 5 min; stop if sharp pain'),
(402,202,102,302,'Tue,Thu,Sat',25,'Target RPE 6/10; focus on form');

-- 6) Session (includes DeviceData fields)
CREATE TABLE Session (
  session_id INT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  exercise_id INT NOT NULL,
  occurred_at DATETIME NOT NULL,
  duration_minutes INT NOT NULL,
  accuracy_score INT,
  feedback_notes VARCHAR(400),
  video_link VARCHAR(200),
  FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
  FOREIGN KEY (exercise_id) REFERENCES Exercise(exercise_id)
);

INSERT INTO Session VALUES
(501,201,101,301,'2025-10-24 10:15:00',28,86,'Form improving; minor shoulder elevation','s3://rehabedge/videos/201_20251024.mp4'),
(502,202,102,302,'2025-10-25 09:05:00',24,91,'Good quad activation; hold times consistent',NULL);

-- 7) Notification
CREATE TABLE Notification (
  notification_id INT PRIMARY KEY,
  patient_id INT NOT NULL,
  message VARCHAR(300) NOT NULL,
  type VARCHAR(16) NOT NULL,
  status VARCHAR(12) NOT NULL,
  scheduled_time DATETIME NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

INSERT INTO Notification VALUES
(601,201,'Your rehab session is scheduled today at 10:00 AM.','Mobile','Sent','2025-10-24 09:30:00'),
(602,202,'Missed session yesterday. Please complete today.','Email','Pending','2025-10-26 08:00:00');

-- 8) Report
CREATE TABLE Report (
  report_id INT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  generated_date DATE NOT NULL,
  summary_text VARCHAR(600) NOT NULL,
  accuracy_trend VARCHAR(80),
  adherence_score INT,
  report_link VARCHAR(200),
  FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

INSERT INTO Report VALUES
(701,201,101,'2025-10-26','Steady improvement in shoulder ROM; continue same plan','80,83,86',88,'https://app.rehabedge/reports/701'),
(702,202,102,'2025-10-26','Knee stability progressing; consider progressing difficulty in 1 week','87,89,91',92,'https://app.rehabedge/reports/702');

-- 9) DataStorage
CREATE TABLE DataStorage (
  storage_id INT PRIMARY KEY,
  backup_date DATETIME NOT NULL,
  file_path VARCHAR(200) NOT NULL,
  encryption_status VARCHAR(12) NOT NULL,
  backup_type VARCHAR(12) NOT NULL,
  responsible_admin VARCHAR(100) NOT NULL
);

INSERT INTO DataStorage VALUES
(801,'2025-10-26 02:00:00','azure://rehabedge/backups/full_20251026.bak','Encrypted','Full','Admin Ops'),
(802,'2025-10-26 08:00:00','azure://rehabedge/backups/inc_20251026_0800.bak','Encrypted','Incremental','Admin Ops');
