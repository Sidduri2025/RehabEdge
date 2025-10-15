# RehabEdge
## **Project Description** 

RehabEdge is a mobile and web-based application that supports patients in performing home therapy exercises. Using camera-based AI at the edge, the system checks patient posture in real time and provides corrective feedback. The app also ensures patients stay consistent with reminders, while doctors can monitor progress through a dashboard.

## **Features Planned**

Daily therapy reminders for patients

Camera-based posture correction AI

Doctor’s dashboard with progress history

Secure data storage and sharing

## **User Stories**

As a patient, I want reminders so that I do not miss therapy.

 Acceptance: The mobile app sends daily notifications.

As a doctor, I want to see a patient's exercise history so that I can check recovery progress.

Acceptance: A web or mobile dashboard shows weekly score trend.

## ** Tech Stack (proposed)**

Mobile App: Android (Java/Kotlin)

Web App: HTML/CSS/JS (with future React/Node option)

AI Component: Edge AI model for posture detection (future integration)

Database: Cloud or local database for patient/doctor data

## ** Created Project Charter wiki page**

Added Project Charter wiki page with problem, motivation, and required functionality

## Created About the Developers wiki page                         

Added About the Developers wiki page with usernames, GitHub links, and strengths

## Updated Home wiki page
Linked Project Charter and About the Developers pages from the Home wiki page

## Formatted wiki pages     
Improved formatting in Project Charter and About the Developers pages (headings, lists, links)

## Project Charter Modification
Modified project charter to align with client’s updated requirements

## Improved documentation structure based on suggestions
Updated project documentation based on client suggestions and clarified deliverables

## Discussion of Project Requirements with Client
Attended client meeting to discuss project requirements and gathered feedback

## Documentation Formatting Update
Fixed formatting issues in documentation

## Attended Client Meeting and Updated Notes

Participated in client call to gather additional requirements.

Recorded key points and updated project action items.

Shared meeting summary with team for next steps.

Identified potential challenges for upcoming development tasks.

## Limitations

The app prototype has not been implemented yet.

Limited access to real client data for testing.

No integration with external APIs at this stage.

UI/UX designs are still in the planning phase.

## Problems

Uncertainty about exact functional requirements from client.

Difficulty in defining database schema without real data.

Limited team experience with specific technologies.

Time constraints for research and initial planning.

## Constraints

Project scope may change based on client feedback.

Limited testing environment since the app is not developed.

Dependence on team members’ availability for collaborative tasks.

Initial project decisions must rely on assumptions due to missing data.

##  Documented Client Meeting 2 Outcomes

Added notes from Client Meeting 2 to project documentation
 ## Details:

Recorded key discussion points from the second client meeting

Captured clarifications about system features and expected deliverables

Shared meeting summary in the team wiki for reference

## Created Problem Statement Section

Added Problem Statement to Project Charter wiki page

Wrote a clear problem statement based on client feedback

Described the challenges faced by patients and doctors

Linked the section from the Home wiki page

## Discussion on Doctor Dashboard.

Discussed Doctor Dashboard Feature

Discussed potential Doctor Dashboard feature with team

Had an internal discussion about adding a doctor’s dashboard to RehabEdge

Talked about showing patient progress history, weekly trends, and alerts

No content created or added yet — only brainstorming stage

## Drafted Functional Requirements

Created Functional Requirements page in wiki

Listed core requirements for patient and doctor users

Added acceptance criteria for each requirement

Linked the page from the Home wiki page

## Explored Technology Options

Discussed integrating AI-powered posture detection using the device camera.
Considered using edge computing to enable faster processing and decided to support both mobile and web platforms for wider reach.

## Challenges faced by doctors
Analyzed Potential Challenges for Doctors
Discussed difficulties doctors might face like limited real-time feedback and needing reliable progress reports.
Planned to design features that simplify monitoring.

## Discussed Project Concept and Feasibility
Held a team discussion on the idea of creating a remote physical therapy app using Edge AI.
Talked about possible target users (patients and doctors) and overall goals.

## Identified Key User Roles and Needs

Brainstormed two primary user roles: patients and doctors.
Listed their needs such as reminders, posture tracking, and progress monitoring.

## Planned Project Methodology

Documented the step-by-step approach the team will follow, including requirement gathering, design, development, testing, and evaluation phases to keep the project organized and on schedule.



## Patient Journey
Step 1: Patient receives a daily reminder notification to start therapy session.

Step 2: Opens the mobile app and performs guided exercises.

Step 3: Camera-based AI analyzes posture in real time and provides corrective feedback.

Step 4: Session is saved with posture accuracy score and completion time.

Step 5: Patient can view progress history and improvement charts in the app.

## Doctor Journey

Step 1: Doctor logs into the web dashboard.

Step 2: Views list of assigned patients and their weekly exercise summaries.

Step 3: Checks posture accuracy trends, missed sessions, and recovery progress.

Step 4: Adds feedback or updates therapy plan if needed.

Step 5: Sends encouragement or instructions to the patient through the app.

## Possible Risks

Technical Complexity: Implementing real-time posture detection using camera-based AI may be more complex than expected.

Data Privacy Concerns: Handling sensitive health data requires strong security measures and compliance with regulations.

Limited Device Compatibility: The AI feature might not work smoothly on all mobile devices, especially older ones.

## Functional Requirements
## Mandatory Requirements (System SHALL)
The system SHALL allow patients to create and manage accounts securely.

The system SHALL allow doctors to create and manage accounts securely.

The system SHALL authenticate user credentials with encryption.

## Recommended Requirements (System SHOULD)

10.The system SHOULD allow patients to receive corrective feedback in real-time during exercises.

11.The system SHOULD allow Doctors to set personalized exercise plans per patient.

12.The system SHOULD generate visual progress reports for both patients and doctors.

## Prototype      
## Patient Reminder System
This prototype focuses on helping patients stay consistent with their therapy. The mobile app will send daily reminders for exercises, which can be customized based on patient schedules.
The goal is to ensure patients do not miss sessions and can maintain a regular routine.


## Key Features

Daily exercise reminders

AI posture detection and correction

Progress tracking dashboard for doctors

Secure patient data storage

## Target Users

Patients recovering from injuries or surgeries

Doctors and physiotherapists who track patient progress

## Hand Posture Data Collection 

Collected sample datasets of hand postures for potential AI posture detection

Added notes on challenges in capturing accurate hand posture data for patients

Updated functional requirements to include support for hand posture analysis in exercises

Explored feasibility of using hand posture recognition in RehabEdge therapy sessions

## Work on Patient Feature

Added patient use case diagram (Perform Exercise Session, View Progress, Receive Reminders)

Created patient journey flow showing therapy reminders, exercise, and progress tracking

Drafted functional requirements for patient account creation and daily notifications

## Doctor-Focused Updates

Added doctor use case diagram (Assign Exercise Plan, Monitor Progress, Provide Feedback)

Created doctor journey flow showing dashboard usage and patient monitoring

Drafted functional requirements for doctor account creation and therapy plan updates

## Client Meeting Outcomes

Added notes from client meeting discussing MVP scope for RehabEdge

Documented decisions on mandatory, recommended, and optional requirements for MVP

Updated functional requirements for patient and doctor accounts based on client feedback

## Database Schema Draft   

Drafted initial database schema with tables for Patients, Doctors, Exercises, and Progress

Added ER diagram for patient-doctor relationship

## Modified Functional Requirements

Updated functional requirements to include patient reminders, doctor dashboard reporting, and real-time corrective feedback.

Refined acceptance criteria for both patient and doctor roles.

## Modified Use Cases

Updated patient use case diagram: Added “Receive Reminders” and “View Progress History”.

Updated doctor use case diagram: Added “Assign Exercise Plan” and “Provide Feedback”.

## Convolutional Neural Networks (CNNs) for Hand Gesture Recognition

Can classify static hand postures (like fist, open palm, pointing).

Trained on image datasets of patient hand positions.

## Real-time Posture Correction

Patients do exercises in front of their phone camera.

Edge AI model (like MediaPipe or TensorFlow Lite) detects joint/hand positions instantly.

App gives immediate feedback (“straighten your back”, “lift your arm higher”) without waiting for cloud processing.

## Privacy & Security

RehabEdge deals with sensitive health data (video, posture, movements).

With Edge AI, all processing happens locally on the phone.

No need to upload videos to external servers.

## Works Without Internet

Many patients (especially elderly) may not always have stable internet.

Edge AI allows the app to work offline, still tracking posture and counting exercises.

## Personalized Feedback

Edge AI can learn from patient’s past performance data stored locally.

The app can adapt recommendations (e.g., if the patient struggles with one movement, it highlights modifications).


RehabEdge uses a pose estimation algorithm powered by edge AI to identify and analyze a patient’s body posture in real time during physical therapy exercises


* The goal is to ensure that patients perform movements correctly and safely while receiving immediate feedback.

* If posture deviation is detected, the system immediately provides corrective feedback such as “Straighten your back” or “Raise your arm higher.”

* The device camera captures a live video stream of the patient performing the exercise. Each video frame is processed individually for posture analysis.


 ##   Non-Functional Requirements
 ## 1.	Performance
	Edge AI device should analyze posture and give feedback quickly.
	Reminders should be delivered reliably and on schedule
 ## 2. Security
	Data captured by the Edge AI device (video, posture data) must be encrypted before being sent to the app or server.
 ## 3. Fast response
    Mobile app should load quickly and feel responsive. 

 Described approach for sending reminders at fixed/custom times

 Added use case in wiki for "Receive Reminders"

 Researched MediaPipe/TensorFlow Lite for edge AI

 Planned weekly progress trend reports

 Added Test Plan Draft for Stability and Reliability

 Updated Reminder System Description for Reliability

 Documented Offline Sync and Crash Recovery Behavior

Added Stability & Reliability Section to Non-Functional Requirements

Added detailed Non-Functional Requirements section including performance, security, and reliability criteria

Created a separate wiki page for Non-Functional Requirements.

Updated Functional Requirements to include Edge AI-based posture feedback

Added Stability & Reliability Test Plan draft to ensure consistent app performance


Each session stores:Exercise name, Duration, Posture accuracy score (e.g., 85%), Time and date

When a patient starts an exercise, the phone’s camera captures their movements.
The Edge AI model (running on the device, not cloud) analyzes this video feed in real time.

The AI model uses key points (like shoulders, elbows, knees, etc.) to calculate posture accuracy.

It detects body or hand posture, joint angles, and whether movements match the correct form.

## 1. Performance

o The RehabEdge AI module should analyze posture and give corrective feedback within 1 second of detecting an incorrect movement.
* The mobile app should launch within 3 seconds on standard Android devices (Android 10 or later)

## 2. Security

o All posture and video data must be encrypted using AES-256 before transmission to the app or server
o Daily reminders must be delivered with 99% reliability at the scheduled time.

## Stability & Reliability

o If the internet connection is lost, the RehabEdge app must continue operating offline and automatically sync results within 10 minutes of reconnection.
  The system should recover from crashes or interruptions in under 5 seconds without losing session data..

## Availability

o The doctor dashboard should maintain 99.5% uptime monthly to ensure continuous access.

o Reminder notifications must succeed 99% of the time


