# Campaign Management App – Frontend

**Live Demo:** [https://campaign-management-app-production.up.railway.app](https://campaign-management-app-production.up.railway.app)

This is the frontend of the Campaign Management App, built with **React 18**, **Vite**, and **React Router**. It allows sellers to manage their products and campaigns via a clean, simple UI.

**Backend repository:** [ArthurAndCode/campaign-management](https://github.com/ArthurAndCode/campaign-management)

## Features

- Product creation, update, delete, and listing
- Campaign creation, update, delete, and filtering
- Live emerald funds display for the logged-in (mocked) user
- Dynamic town selection (dropdown) and keyword typeahead
- Integration with backend API hosted at:
  `https://campaign-management-production.up.railway.app/api/v1`

> User data is mocked by the backend at `/owners`, and loaded globally via React Router loader.

## Tech Stack

- React + Vite
- React Router (with nested routes and data loaders)
- Axios for HTTP communication
- Docker support for production deployment
