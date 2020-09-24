# Curso NextJS ("platzi-podcasts")

<https://nextjs.org/docs/getting-started >

NextJS, según su definición, es un pequeño framework que hace server-rendering de aplicaciones basadas en JavaScript. Como desarrolladores entre nuestros propósitos encontramos el hecho de hacer las cosas de una manera más facil y eso no es más que lo que nos trae Next, abstrayendo toda la parte del Server Rendering que a veces nos puede causar dolores de cabeza.

# Iniciando

```
npm add next react react-dom
```

## Scripts

- next inicia la aplicación en modo desarrollo
- next build construye los archivos para producción
- next start uso los archivos del build para iniciar la aplicación en modo producción

# Styled JSX

El sistema de estilos de NextJS viene a resolver algunos problemas que son muy típicos del mundo de React, e incluso algunos que son más propios de CSS sobre todo relacionados a la escalabilidad.

```
<style jsx>{`.class {color: red;}`} </style>
```

OJO! Estos estilos solo aplican al componente en donde los estamos definiendo. Pero tambien hay manera de definir estilos globales mas alla de los componentes

```
<style jsx global>{`.class {color: red;}`} </style>

<style jsx>{`
  :global(p) {color: green}
`}<style>
```

# Recursos Estaticos

<https://nextjs.org/docs/basic-features/static-file-serving>
Para trabajar con recursos estaticos en NextJS solo los debemos incluir dentro de la carpeta _/public_ en la raiz del proyecto

```
function MyImage() {
  return <img src="/my-image.png" alt="my image" />
}

export default MyImage
```

# Server Side Rendering

(First Load Rendering y Time To Interactive)

Una de las features mas importantes de next que mejora performance, SEO (indexa) y la UX.

Con el Client Side Rendering el server manda un HTML vacío, y tenemos que descargar toda la aplicación (JS) y esperar que haga lo suyo para poder empezar a ver el contenido

![](https://raw.githubusercontent.com/MineiToshio/CursosPlatzi/master/Curso%20de%20Next.js/img/client-side-rendering.png)

Con el Server Side Rendering, el servidor ya envía una HTML con CSS listo para que nuestra app se vea y se vea bien, por ende, el usuario tiene que esperar mucho menos para tener una primera vista de la aplicación.

![](https://raw.githubusercontent.com/MineiToshio/CursosPlatzi/master/Curso%20de%20Next.js/img/server-side-rendering.png)

Next.JS usa una mezcla de los dos: SSR para la carga inicial (por ser más rápido), y CSR cada vez que clickeamos en un link con la app inicializada, ya que ahí puede aplicar varias optimizaciones y mecanismos de precarga que hacen que todo funcione lo más rápido posible.

# Data fetching

<https://nextjs.org/docs/api-reference/data-fetching/getInitialProps>
<https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering>
-getStaticProps (Static Generation): Fetch data at build time.
-getStaticPaths (Static Generation): Specify dynamic routes to pre-render based on data.
-getServerSideProps (Server-side Rendering): Fetch data on each request.
-getInitialProps (deprecated)

La principal diferencia entre ambas funciones es que getServerSideProps() se llama en cada carga de página, mientras que getStaticProps() solo es llamada al momento de hacer build.

# LINK

<https://nextjs.org/docs/api-reference/next/link>

Siempre deben contener un _a_ u otro elemento hijo para linkear. No funciona como link de react router el cual "detras de escena" era un elemento _a_ encubierto

Si clickeamos en alguno de estos links la operacion ejecutada es del tipo _client side rendering_ esa nueva pagina solo va a cargar lo que haga falta y cambiar la ruta del browser ( solo ese js) pintar la pantalla con los nuevos datos. Esto se traduce en mayor performance.

PERO! si abrimos un link en un nuevo tab! se ejecutara server side rendering.

# PREFETCH

<https://nextjs.org/blog/next-9#prefetching-in-viewport-links> (only for production)

# PARAMETROS URL

<https://nextjs.org/docs/api-reference/next/link>
