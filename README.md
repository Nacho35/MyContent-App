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
# Closers-App

## Introducción

La aplicación es una plataforma web innovadora construida sobre Next.js, diseñada para ofrecer una experiencia de usuario intuitiva y segura. Al integrar la autenticación de usuarios a través de Google utilizando NextAuth, los usuarios pueden acceder rápidamente a la plataforma. Una vez dentro, se les presenta un formulario interactivo donde pueden ingresar diversos datos. Estos datos son doblemente útiles: no solo se registran en una hoja de Google Sheets para su organización y análisis, sino que también se almacenan en una base de datos Firebase. Esto asegura una redundancia de datos y facilita su acceso y visualización a través de la interfaz de usuario, donde los registros pueden ser consultados mediante un botón que abre un menú dedicado.

## Características Principales

- **Autenticación con Google:** Implementada mediante NextAuth, permite a los usuarios iniciar sesión de manera sencilla y segura utilizando sus cuentas de Google.

- **Formulario Interactivo:** Diseñado para capturar datos del usuario de manera eficiente, este formulario es clave para el proceso de registro de información tanto en Google Sheets como en Firebase.

- **Integración con Google Sheets:** La aplicación se integra sin problemas con Google Sheets, permitiendo el almacenamiento y actualización automática de los datos ingresados por los usuarios.

- **Base de Datos Firebase:** Almacenamiento adicional de los datos enviados a través del formulario, garantizando una copia de seguridad y facilitando el acceso rápido a los registros desde la interfaz de usuario.

- **Registro Automático de Cambios:** El script de Google Apps Script desempeña un papel crucial en la aplicación al automatizar el registro de los datos enviados a través del formulario directamente en una hoja de cálculo de Google Sheets. Este proceso garantiza que cada entrada realizada por el usuario sea capturada y almacenada de forma inmediata, permitiendo un seguimiento preciso y actualizado de la información. Sin necesidad de intervención manual, el script facilita la organización y el acceso a los datos recopilados, simplificando así la gestión de registros para el usuario final.
