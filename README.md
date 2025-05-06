# Campaign Management App – Frontend

**Note:** This repository contains a project developed as part of a coding challenge/assignment.  
The task was to implement the core functionality within a strict 2-day deadline.

**Live Demo:** [https://campaign-management-app-production.up.railway.app](https://campaign-management-app-production.up.railway.app)

This is the frontend of the Campaign Management App, built with **React 18**, **Vite**, and **React Router**. It allows sellers to manage their products and campaigns via a clean, simple UI.

**Backend repository:** [ArthurAndCode/campaign-management-backend](https://github.com/ArthurAndCode/campaign-management-backend)

## Features

- Product creation, update, delete, and listing
- Campaign creation, update, delete, and filtering
- Live emerald funds display for the logged-in (mocked) user
- Dynamic town selection (dropdown) and keyword typeahead
- Integration with backend API

> User data is mocked by the backend at `/owners`, and loaded globally via React Router loader.

## Tech Stack

- React + Vite
- React Router (with nested routes and data loaders)
- Axios for HTTP communication
- Docker support for production deployment
