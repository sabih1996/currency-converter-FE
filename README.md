# Currency Converter Frontend

This is the frontend part of a Currency Converter application. The application allows users to select source and target currencies from a list, enter an amount, and convert it based on the latest exchange rates. This project is built using React.js and Ant Design (AntD) for UI components.

# Table of Contents

- Features
- Installation
- Technologies Used
- Project Structure
- Usage
- Available Scripts

## Features

- Select source and target currencies from a dropdown.
- Convert between multiple currencies.
- Display the latest exchange rates.
- Interactive and responsive user interface built with Ant Design.
- Error handling for unsupported or incorrect currency codes.

## Installation

To run this project locally, follow these steps:

1) Clone the repository:

```bash
$ git clone <repository-url>
$ cd currency-converter-FE
```
2) Install dependencies using npm or yarn:

```bash
npm install
```
or
```bash
yarn install
```
Start the development server:

```bash
npm start
```
or

```bash
yarn start
```

The application will open at http://localhost:3000.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used
- React.js: JavaScript library for building user  interfaces.
- Ant Design (AntD): UI component library for React.
- Axios: Promise-based HTTP client for making API requests.
- SCSS: For styling.
- React Hooks: To manage state and side effects.

## Project Structure

```graphql
currency-converter-FE/
├── public/                 # Static assets
├── src/
│   ├── components/          # Reusable components
│   ├── App.js               # Main entry component
│   ├── index.js             # Main file
└── package.json             # Project dependencies and scripts
```
## Usage
1) Currency Selection: The user selects a source currency and a target currency using the dropdowns powered by Ant Design's `<Select>` component.
2) Amount Input: Users can input the amount they wish to convert.
3) Conversion: After selecting currencies and entering the amount, the application fetches the exchange rate and shows the converted value.
4) Live Rates: The app uses live currency exchange rates fetched from an external API.