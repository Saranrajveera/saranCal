# Web Calculator

A modern, beautiful web calculator application built with React, TailwindCSS, and Vite.

## Features

- **Modern UI**: Glassmorphism design with gradient backgrounds
- **Full Calculator Functionality**: 
  - Basic operations: addition, subtraction, multiplication, division
  - Percentage calculation
  - Toggle positive/negative
  - Backspace and clear functions
  - Decimal support
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Button press effects and transitions
- **Visual Feedback**: Shows previous operation and current result

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

- Click buttons to input numbers and operations
- Use the on-screen buttons or your keyboard
- Press `C` or the delete icon to clear
- Press backspace icon to delete last digit
- Press `=` to calculate the result

## Project Structure

```
.
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main calculator component
│   └── index.css          # Global styles
└── README.md              # This file
```
