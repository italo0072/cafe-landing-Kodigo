create extension if not exists "pgcrypto";

create table if not exists public.origenes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  pais text not null,
  descripcion text not null,
  altitud text,
  imagen_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  categoria text not null check (categoria in ('cafe', 'postre', 'plato')),
  origen_id uuid references public.origenes(id) on delete set null,
  proceso text,
  descripcion text not null,
  precio numeric(10, 2) not null default 0,
  precio_aproximado boolean not null default false,
  imagen_url text,
  destacado boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists productos_origen_id_idx on public.productos(origen_id);
create index if not exists productos_categoria_idx on public.productos(categoria);

alter table public.origenes enable row level security;
alter table public.productos enable row level security;

create policy "Lectura pública de orígenes"
  on public.origenes for select
  using (true);

create policy "Lectura pública de productos"
  on public.productos for select
  using (true);

insert into public.origenes (slug, nombre, pais, descripcion, altitud, imagen_url)
values
  ('laguna-de-alegria', 'Laguna de Alegría', 'El Salvador',
   'Café cultivado en las faldas del volcán Tecapa, a pocos minutos de la cafetería, con suelos volcánicos y sombra de guarumo.',
   '1250', null)
on conflict (slug) do nothing;

insert into public.productos (slug, nombre, categoria, origen_id, proceso, descripcion, precio, precio_aproximado, imagen_url, destacado)
values
  ('capuccino-viens', 'Capuccino Vienés', 'cafe',
   (select id from public.origenes where slug = 'laguna-de-alegria'), null,
   'Espresso con leche vaporizada, crema batida y un barquillo de vainilla. Preparado con café de la zona. Precio real de la carta.', 2.50, false,
   '/fotos-locales/capuchino-vienes.png', true),
  ('frappe-oreo', 'Frappé de Oreo y M&M''s', 'cafe', null, null,
   'Café frío licuado, coronado con crema batida, galleta Oreo y confites de chocolate. Para llevar.', 3.50, true,
   '/fotos-locales/frappe-oreo.png', true)
on conflict (slug) do nothing;

insert into public.productos (slug, nombre, categoria, origen_id, proceso, descripcion, precio, precio_aproximado, imagen_url, destacado)
values
  ('crepa-nutella-confites', 'Crepa de Nutella y Confites', 'postre', null, null,
   'Crepa rellena de Nutella y fruta, bañada en chocolate y cubierta de confites de colores. Se sirve con un capuchino.', 4.50, true,
   '/fotos-locales/crepa-capuchino.png', true),
  ('copa-helado-confites', 'Copa de Helado con Confites', 'postre', null, null,
   'Helado de vainilla con crema batida, galleta Oreo, chispas de colores y baño de chocolate.', 3.75, true,
   '/fotos-locales/copa-confites.png', false)
on conflict (slug) do nothing;

insert into public.productos (slug, nombre, categoria, origen_id, proceso, descripcion, precio, precio_aproximado, imagen_url, destacado)
values
  ('carne-asada-la-calesa', 'Carne Asada La Calesa', 'plato', null, null,
   'Carne a la parrilla con chorizo, ensalada fresca, arroz y huevo cocido.', 7.50, true,
   '/fotos-locales/carne-asada.png', true),
  ('quesadillas-la-calesa', 'Quesadillas La Calesa', 'plato', null, null,
   'Quesadillas doradas a la plancha, servidas con pico de gallo, guacamole y salsa de la casa.', 5.50, true,
   '/fotos-locales/quesadillas.png', false),
  ('nachos-la-calesa', 'Nachos La Calesa', 'plato', null, null,
   'Totopos horneados con carne, pico de gallo, aguacate y aderezo de la casa.', 6.00, true,
   '/fotos-locales/nachos.png', false),
  ('fajitas-mar-y-tierra', 'Fajitas Mar y Tierra', 'plato', null, null,
   'Camarón y carne salteados con pimientos y cebolla, servidos en plancha caliente con papas.', 8.50, true,
   '/fotos-locales/fajitas-mar-tierra.png', true),
  ('tacos-la-calesa', 'Tacos La Calesa', 'plato', null, null,
   'Tacos de carne deshebrada con cebolla, aguacate y encurtido, servidos en tortilla de maíz.', 6.50, true,
   '/fotos-locales/tacos.png', false)
on conflict (slug) do nothing;
