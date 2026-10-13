export type Origen = {
  id: string;
  slug: string;
  nombre: string;
  pais: string;
  descripcion: string;
  altitud: string | null;
  imagen_url: string | null;
};

export type Categoria = "cafe" | "postre" | "plato";

export type Producto = {
  id: string;
  slug: string;
  nombre: string;
  categoria: Categoria;
  origen_id: string | null;
  proceso: string | null;
  descripcion: string;
  precio: number;
  precio_aproximado: boolean;
  imagen_url: string | null;
  destacado: boolean;
  origenes?: Origen | null;
};
