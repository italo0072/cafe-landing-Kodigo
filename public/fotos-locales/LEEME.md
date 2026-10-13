# Fotos reales del local

Esta carpeta ya contiene las fotos reales de La Calesa que subiste. Se usan
en dos lugares del proyecto:

1. **Fotos de ambientación** (hero, "Nosotros", "Visítanos"), referenciadas
   desde `lib/media.ts`.
2. **Fotos de cada producto del catálogo** (café, postres y platillos),
   referenciadas directamente en `supabase/schema.sql` como
   `imagen_url = '/fotos-locales/nombre-del-archivo.png'`.

## Para agregar o cambiar una foto

1. Guarda el nuevo archivo aquí (jpg, png o webp).
2. Si es una foto de ambientación, cambia la ruta correspondiente en
   `lib/media.ts`.
3. Si es la foto de un producto del catálogo, actualiza el `imagen_url`
   de esa fila en Supabase (Table Editor o volviendo a correr el insert
   correspondiente de `supabase/schema.sql`).

No hay ningún problema de derechos de autor al usar estas fotos: son del
propio negocio.
