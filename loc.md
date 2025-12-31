## Step-by-Step Setup

### 1. Install Required Packages
Install the necessary libraries for i18n:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

2. Create Locale Files
Create a public/locales directory and add JSON files for each language. These files contain your translations.

Create public/locales/en/common.json:
Create public/locales/hi/common.json:

Set Up i18n Configuration
Create a new file src/lib/i18n.js to initialize i18next:

