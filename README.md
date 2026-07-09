# GrowEasy CSV Importer

A full-stack AI-powered CSV Import Tool built with the MERN stack.

This application allows users to upload CSV files, preview records, automatically map CSV headers to CRM fields using AI, transform records into a CRM-friendly format, and view imported/skipped records with detailed import results.

---

## Features

### CSV Upload

* Drag & Drop CSV Upload
* File Browser Upload
* CSV Validation
* Preview Before Import

### AI-Powered Column Mapping

Uses OpenRouter AI to automatically map CSV headers to CRM fields.

Example:

| CSV Header    | CRM Field                   |
| ------------- | --------------------------- |
| Prospect Name | name                        |
| Mobile Number | mobile_without_country_code |
| Organization  | company                     |
| Remarks       | crm_note                    |

---

### Record Transformation

Transforms CSV rows into CRM-compatible records.

Supports:

* Name Mapping
* Email Mapping
* Phone Mapping
* Company Mapping
* City, State, Country Mapping
* Lead Owner Mapping
* CRM Status Normalization
* CRM Notes Generation
* Multiple Email Handling
* Multiple Phone Number Handling
* Country Code Extraction

---

### Data Validation

Records are skipped when required information is missing.

Example:

```text
No Email
AND
No Mobile Number
```

Record will be skipped.

---

### Import Summary

Displays:

* Total Imported
* Total Skipped
* Detected Mapping
* Imported Records
* Skipped Records

---

### Modern UI

Built using:

* React
* Tailwind CSS

Features:

* SaaS-style interface
* Responsive layout
* CSV Preview Table
* Mapping Table
* Result Tables
* Success Banner
* Progress Indicator
* Dark Mode
* Theme Persistence
* Sticky Table Headers
* Responsive Scrolling Tables

---

## Architecture

```text
CSV Upload
     │
     ▼
Parse CSV
     │
     ▼
Extract Headers
     │
     ▼
AI Column Mapping
(OpenRouter)
     │
     ▼
Fallback Mapping
(if AI mapping is weak)
     │
     ▼
Transform Rows
(Node.js)
     │
     ▼
Imported / Skipped
     │
     ▼
Frontend Results
```

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS v4
* Axios
* React Dropzone
* PapaParse

### Backend

* Node.js
* Express.js
* Multer
* PapaParse
* OpenAI SDK
* OpenRouter AI

---

## Project Structure

```text
groweasy-csv-importer
│
├── groweasy-client
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── UploadZone.jsx
│   │   │   ├── PreviewTable.jsx
│   │   │   ├── ResultTable.jsx
│   │   │   ├── ImportCard.jsx
│   │   │   └── ImportHeader.jsx
│   │   │
│   │   ├── context
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── groweasy-server
│   ├── controllers
│   │   └── import.controller.js
│   │
│   ├── services
│   │   └── mapping.service.js
│   │
│   ├── utils
│   │   ├── cleanJson.js
│   │   ├── fallbackMapping.js
│   │   └── transformRows.js
│   │
│   ├── routes
│   │   └── import.routes.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## AI Mapping Approach

The application uses AI only for header mapping.

### Step 1

Extract CSV headers.

Example:

```text
Prospect Name
Mobile Number
Organization
Remarks
```

### Step 2

Send headers to OpenRouter AI.

### Step 3

AI returns CRM field mapping.

Example:

```json
{
  "Prospect Name": "name",
  "Mobile Number": "mobile_without_country_code",
  "Organization": "company",
  "Remarks": "crm_note"
}
```

### Step 4

Node.js transforms rows locally.

This approach reduces:

* AI cost
* AI latency
* Token usage

while keeping field mapping flexible and accurate.

---

## Fallback Mapping

If AI returns an invalid or weak mapping, the application automatically falls back to rule-based header matching.

Examples:

```text
Email → email
E-mail → email
Phone → mobile_without_country_code
Mobile Number → mobile_without_country_code
Full Name → name
```

This ensures imports continue even when AI responses are incomplete or invalid.

---

## Data Processing Features

### Phone Number Handling

Supports:

```text
+91 9876543210
+919876543210
+1 5551234567
9876543210
```

Extracts:

```json
{
  "country_code": "+91",
  "mobile_without_country_code": "9876543210"
}
```

---

### Multiple Emails

Input:

```text
john@example.com;sales@example.com
```

Output:

```text
email = john@example.com

crm_note =
Additional emails: sales@example.com
```

---

### Multiple Phone Numbers

Input:

```text
+91 9876543210;+91 9999999999
```

Output:

```text
mobile_without_country_code = 9876543210

crm_note =
Additional numbers: +91 9999999999
```

---

### Status Normalization

Supported mappings:

| Input          | CRM Status          |
| -------------- | ------------------- |
| Interested     | GOOD_LEAD_FOLLOW_UP |
| Busy           | DID_NOT_CONNECT     |
| Not Interested | BAD_LEAD            |
| Closed Won     | SALE_DONE           |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/anuragrajpoott/groweasy_ai_csv_importer.git
```

```bash
cd groweasy_ai_csv_importer
```

---

## Backend Setup

```bash
cd groweasy-server
```

Install dependencies:

```bash
npm install
```

Create:

```env
.env
```

Add:

```env

OPENROUTER_API_KEY=your_api_key

```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd groweasy-client
```

Install dependencies:

```bash
npm install
```

Create:

```env
.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

---

## API Endpoint

### Import CSV

```http
POST /api/import
```

Content-Type:

```text
multipart/form-data
```

Request:

```text
file=<csv file>
```

Response:

```json
{
  "success": true,
  "mapping": {},
  "imported": [],
  "skipped": [],
  "totalImported": 10,
  "totalSkipped": 2
}
```

---

## Assumptions

* CSV contains a header row.
* AI can identify common CRM-related fields.
* At least one identifier exists:

  * Email
  * Mobile Number
* Invalid records are skipped rather than imported.
* AI is used only for header mapping; record transformation is handled locally.

---

## Error Handling

Handles:

* Missing CSV
* Empty CSV
* Invalid AI response
* Weak AI mappings
* Invalid mapping formats
* Unsupported CRM fields
* CSV parsing failures
* Transformation failures

---

## Screenshots

### Light Mode

![image](https://github.com/anuragrajpoott/groweasy_ai_csv_importer/blob/main/readme-assets/light-mode-home.jpeg)

### Dark Mode

![image](https://github.com/anuragrajpoott/groweasy_ai_csv_importer/blob/main/readme-assets/dark-mode-home.jpeg)

### CSV Preview

![image](https://github.com/anuragrajpoott/groweasy_ai_csv_importer/blob/main/readme-assets/upload-preview.jpeg)

### Import Results

![image](https://github.com/anuragrajpoott/groweasy_ai_csv_importer/blob/main/readme-assets/import-results.jpeg)

---

## Live Demo

Frontend:

https://groweasy-ai-csv-importer-red.vercel.app/

Backend:

https://groweasy-ai-csv-importer-ni7u.onrender.com

GitHub Repository:

https://github.com/anuragrajpoott/groweasy_ai_csv_importer

---

## Future Improvements

* Manual Field Mapping UI
* Mapping Confidence Scores
* Import History
* Duplicate Detection
* Bulk Validation Rules
* Background Processing
* User Authentication
* Multi-CRM Support

---

## Author

Built as part of the GrowEasy Software Developer Assignment.

Tech Stack:

* React
* Node.js
* Express.js
* OpenRouter AI
* Tailwind CSS
