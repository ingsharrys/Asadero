export interface RespuestaTopHeadlines {
  status: string;
  totalResults: number;
  posts: Article[];
  post: Articles[];
  comments: Comentarios[];
  result: Usuario[];
  categories: Categoria[];
  pedido: Pedidos[];
}

 export interface Article {
//  source: Source;
  author?: string;
  news_title?: string;
  news_description?: string;
  news_image?: string;
  nid?: number;
  cdi?: string;
  cant?: string;
  video_url?: string;
  amount?: number;
  tienda_price?: number;
  p?: number;
//  publishedAt: string;
}

export interface Pedidos {
//  source: Source;
 Tarjeta?: string;
 Transferencia?: string;
 Efectivo?: string;
 Recoger?: string;
 Domicilio?: string;
}

export interface Comentarios {
//  source: Source;
 author?: string;
 content?: string;


//  publishedAt: string;
}

export interface Categoria {
//  source: Source;
 cid?: string;
 category_name?: string;
category_image: string;

//  publishedAt: string;
}



export interface Articles {
//  source: Source;
 author?: string;
 news_title?: string;
 news_description?: string;
 news_image?: string;
 nid?: number;
 amount?: number;
 video_url?: string;
 price?: number;




//  publishedAt: string;
}

export interface Usuario {
  address?: string;
  addressdos?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  length?: string;
  pop?: string;
  push?: string;
  concat?: string;
}

export interface Source {

  nid?: string;
  name: string;

}
