# DevTools para QA

Fecha: 06/10/2026
Tipo: notas de estudio
Fuente: guía "DevTools para QA" del Material QA

Las notas son de Joaquín. Las correcciones y aclaraciones del final son de Claude.

## Qué son y para qué sirven

- Las DevTools son herramientas para desarrolladores que vienen incluidas en todos los navegadores. Permiten ver "por dentro" una página web: su código HTML, los errores, las llamadas a las APIs, las cookies, etc.
- Le sirven a un QA porque permiten pasar de "el botón no anda" a "el botón llama a la API y devuelve 500", y así los reportes son mucho más precisos.
- Todo lo que se cambia en la página es local: no se rompe nada del sistema real.

## Pestaña Network

Muestra las llamadas a las APIs con Name, Status, Type, Time, Headers, Payload, Preview/Response, entre otros.

Opciones clave:

- **Fetch/XHR:** filtro para ver solo las llamadas a las APIs, sin imágenes, CSS, etc.
- **Preserve Log:** no borra las requests cuando la página recarga o redirige.
- **Disable cache:** simula a un usuario que entra por primera vez.
- **Throttling:** simula conexiones lentas o sin internet. Ideal para probar loaders, timeouts y mensajes de error.
- **Copy as cURL:** se copia y se puede pegar en Postman. Arma la request completa para seguir probándola.

## Tip de QA

Cuando reportes un bug de una API, incluí el endpoint, el método, el status, el body enviado (Payload) y la respuesta (Response). Con eso el equipo de desarrollo puede reproducirlo sin preguntarte nada.

## Correcciones y aclaraciones del mentor

- Cambiar la página (HTML, estilos) es local. Pero si se reenvía una request, o se pega en Postman y se ejecuta, **le pega al servidor real** y puede crear o borrar datos. Hacerlo solo en ambientes de prueba.
- **Copy as cURL** copia también las cookies y los tokens de la sesión. Nunca se pega en un repo público ni en una red social sin borrarlos antes.
- Disable cache solo funciona con las DevTools abiertas. Para simular un usuario realmente nuevo también hay que borrar cookies y storage.
