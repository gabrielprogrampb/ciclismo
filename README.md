# 🚴 Página Ciclismo

Plataforma web para ciclistas con marketplace, rutas y artículos.

## 📋 Descripción

Página Ciclismo es una plataforma completa para entusiastas del ciclismo. Incluye un marketplace para comprar bicicletas, un explorador de rutas para ciclismo, y una sección de artículos con tips y consejos.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Navegación SPA
- **Tailwind CSS** - Framework de estilos
- **Context API** - Estado global

## 📁 Estructura del Proyecto

```
página-ciclismo/
├── components/
│   ├── Header.tsx           # Navegación principal
│   ├── Footer.tsx           # Pie de página
│   └── ProtectedRoute.tsx   # HOC para rutas protegidas
├── contexts/
│   ├── AuthContext.tsx      # Contexto de autenticación
│   └── DataContext.tsx      # Datos de la aplicación
├── data/                    # Datos mock
├── pages/
│   ├── HomePage.tsx         # Página de inicio
│   ├── MarketplacePage.tsx  # Tienda de bicicletas
│   ├── BikeDetailPage.tsx   # Detalle de bicicleta
│   ├── RoutesPage.tsx       # Lista de rutas
│   ├── RouteDetailPage.tsx  # Detalle de ruta
│   ├── TipsPage.tsx         # Artículos y consejos
│   ├── ArticleDetailPage.tsx# Detalle de artículo
│   ├── LoginPage.tsx        # Inicio de sesión
│   └── AdminPage.tsx        # Panel de administración
├── App.tsx                  # Componente principal
├── index.tsx                # Punto de entrada
└── types.ts                 # Definiciones de tipos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd página-ciclismo
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

- **Marketplace** - Explorar y buscar bicicletas
- **Explorador de rutas** - Descubrir rutas para ciclismo
- **Blog de tips** - Artículos con consejos
- **Panel de admin** - Gestión de contenido
- **Diseño responsive** - Adaptable a móviles

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
