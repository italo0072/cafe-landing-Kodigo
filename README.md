# La Calesa

Landing page para una cafetería y tostadora ubicada en Alegría, Usulután, El Salvador. El proyecto está construido con Next.js App Router y Supabase, y está pensado como una web publicitaria con catálogo, información de la marca y detalle de productos.

## Descripción

La Calesa es una landing page para mostrar la identidad de un negocio local: historia, proceso, productos, referencias de origen, horario, ubicación y contacto. La aplicación combina contenido estático con datos dinámicos provenientes de Supabase.

## Stack

- Next.js 16
- App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Funcionalidades

- Landing page con navegación, historia, proceso, catálogo, menú, testimonios y llamada a la acción.
- Carrusel de productos con desplazamiento automático y pausa al pasar el cursor.
- Página `/visitanos` con mapa embebido, horario y datos del local.
- Rutas dinámicas para productos y orígenes.
- Carga y manejo de estados para páginas sin contenido o con errores.
- Datos de catálogo y orígenes gestionados en Supabase.
- Diseño responsivo para móvil y escritorio.

)
## Estructura del proyecto

```text
app/
  layout.tsx
  page.tsx
  loading.tsx
  error.tsx
  visitanos/page.tsx
  productos/[slug]/page.tsx
  origenes/[slug]/page.tsx

components/
  SiteHeader.tsx
  SiteFooter.tsx
  CatalogoCarousel.tsx

lib/
  content.ts
  media.ts
  types.ts
  supabase/client.ts
  supabase/server.ts

supabase/
  schema.sql
```

## Requisitos

- Node.js 18+
- npm
- Cuenta en Supabase

## Instalación local

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd cafe-landing
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear el proyecto en Supabase y ejecutar el esquema:

- Crear un proyecto nuevo en [Supabase](https://supabase.com).
- Abrir el SQL Editor.
- Ejecutar el contenido de `supabase/schema.sql`

Esto crea las tablas `origenes` y `productos`, activa RLS y carga datos iniciales para la landing

4. Configurar variables de entorno:

Crear un archivo `.env.local` con lo siguiente:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY
```

5. Ejecutar la aplicación:

```bash
npm run dev
```

Abrir: http://localhost:3000

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto en Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key del proyecto |

## Despliegue

El proyecto se desplega  fácilmente en Vercel:

1. Subir el repositorio a GitHub
2. Conectar el repositorio en Vercel
3. Agregar las variables de entorno
4. Desplegar

## Modelo de datos

### Tabla `origenes`

- `id`
- `slug`
- `nombre`
- `pais`
- `descripcion`
- `altitud`
- `imagen_url`
- `created_at`

### Tabla `productos`

- `id`
- `slug`
- `nombre`
- `categoria` (`cafe`, `postre`, `plato`)
- `origen_id`
- `proceso`
- `descripcion`
- `precio`
- `precio_aproximado`
- `imagen_url`
- `destacado`
- `created_at`

## Ubicación

El local está georreferenciado en Alegría, Usulután, El Salvador, con coordenadas aproximadas de la zona del negocio. La página `/visitanos` usa esas referencias para mostrar un mapa embebido y la información de contacto.
