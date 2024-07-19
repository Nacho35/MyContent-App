This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# MyContent-App

## Introducción

La aplicación es una plataforma web desarrollada con Next.js, que facilita la autenticación de usuarios a través de Google utilizando NextAuth. Una vez autenticado, el usuario puede interactuar con un formulario que permite agregar y actualizar estados en una hoja de cálculo de Google Sheets. Además, se ha implementado un script de Google Apps Script para registrar automáticamente los cambios realizados en la primera hoja en otra hoja, optimizando así la gestión de la base de datos asociada a la primera hoja.

## Características Principales

- **Autenticación con Google**: Los usuarios pueden iniciar sesión fácilmente utilizando sus cuentas de Google gracias a la integración de NextAuth.
- **Formulario Interactivo**: Permite a los usuarios agregar y actualizar estados en tiempo real.
- **Integración con Google Sheets**: La aplicación se comunica con Google Sheets para almacenar y actualizar información.
- **Registro Automático de Cambios**: Utiliza Google Apps Script para registrar automáticamente los cambios realizados en la hoja principal en otra hoja destinada para este propósito.

## Conclusión

La aplicación representa una solución robusta y escalable para gestionar datos a través de una interfaz web, aprovechando las capacidades de Next.js para el desarrollo frontend, NextAuth para la autenticación, y Google Sheets junto con Google Apps Script para la gestión de datos. La integración de estas tecnologías facilita una experiencia de usuario fluida y eficiente, mientras se mantienen los datos organizados y accesibles.

