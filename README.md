# Sporty Test Task

This is a test task for Sporty Group.

A Vue.js application that displays sports leagues with filtering capabilities. This project fetches data from TheSportsDB API and provides an interactive interface to browse and filter sports leagues.

## Notes for Reviewer

- Since the task is pretty simple and time is limited to 90 minutes, I decided to use as few third-party libraries as possible. For project creation, [create-vue](https://github.com/vuejs/create-vue) was used to create a Vue 3 + TypeScript application.
- The requirement to load badge on click was unclear in terms of the following case:
  - Initial list of leagues loaded
  - I click on first league and see badge
  - I filter a few times, making the league item disappear from the DOM
  - I go back to see it again
  - Should I see the badge from cache or not? (I've added a method to check cache on mount of the component; this could be changed by modifying the lines in the LeagueItem.vue file)
- GitHub Copilot was used for styling, generating types for the API, and README.md

## Overview

This application is a test task for Sporty that demonstrates:

- Vue 3 with Composition API
- TypeScript integration
- API data fetching with caching
- Responsive design
- Real-time search and filtering
- Modern build setup with Vite

## Features

- **League Display**: Browse all available sports leagues
- **Search Functionality**: Real-time search through league names
- **Sport Filtering**: Filter leagues by sport type
- **Responsive Design**: Works across different screen sizes
- **Badge Images**: Display league badges when available
- **Loading States**: Proper loading and error handling
- **Caching**: Efficient API response caching

## Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **API**: TheSportsDB API
- **Styling**: CSS with responsive design

## Project Structure

```
src/
├── api/           # API calls and data fetching
├── components/    # Reusable Vue components
├── pages/         # Page-level components
├── types/         # TypeScript type definitions
└── assets/        # Static assets and styles
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
