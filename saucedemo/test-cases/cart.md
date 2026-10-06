# SauceDemo: casos de prueba del carrito

Ticket: QE-3
Aplicación: https://www.saucedemo.com
Usuario de prueba: `standard_user` (usuario público de la demo, la contraseña aparece en la página de login)

## Cómo se lee cada caso

| Campo | Qué significa |
|---|---|
| ID | Código único, `CART-NN`. Va en el título del test automatizado |
| Título | Una frase: qué se verifica |
| Cubre | Qué criterio de aceptación (AC) comprueba |
| Prioridad | Alta, Media o Baja, según el impacto si falla |
| Precondiciones | Qué tiene que ser cierto antes del paso 1 |
| Pasos | Acciones numeradas, concretas y en orden |
| Resultado esperado | Lo que tenés que observar. Tiene que poder verificarse, no "anda bien" |

## CART-01: Agregar un producto desde la página de inventario.

**Cubre:** AC1
**Prioridad:** Alta

**Precondiciones:**

- El usuario inició sesión como `standard_user` y está en la página de inventario.
- El carrito está vacío (no hay contador sobre el ícono del carrito).

**Pasos:**

1. Hacer clic en **Add to cart** en el producto "Sauce Labs Backpack".

**Resultado esperado:**

- El botón de ese producto cambia a **Remove**.
- El ícono del carrito muestra un contador con el número **1**.

---

## CART-02: La página del carrito lista los productos agregados con su nombre y precio.

**Cubre:** AC1, AC2
**Prioridad:** Media

**Precondiciones**
- El usuario inició sesión como "standard_user" y está en la página de inventario.
- El carrito está vacío (no hay contador sobre el ícono del carrito).

**Pasos:**

1. Hacer clic en **Add to cart** en el producto "Sauce Labs Backpack".
2. Hacer clic en **Add to cart** en el producto "Sauce Labs Bike Light".
3. Hacer clic en el carrito.

**Resultado esperado:**

- El carrito tiene en su contador dos productos.
- El carrito muestra el producto "Sauce Labs Backpack" con su precio de "$29.99".
- El carrito muestra el producto "Sauce Labs Bike Light" con su precio de "$9.99"

---

## CART-03: El usuario quita un producto del carrito.

**Cubre:** AC3
**Prioridad:** Alta

**Precondiciones**
- El usuario inició sesión como "standard_user" y está en la página del carrito.
- El carrito tiene los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light".

**Pasos:**

1. Hacer clic en el botón **Remove** del producto "Sauce Labs Backpack".

**Resultado esperado:**

- El producto "Sauce Labs Backpack" se elimina del carrito.
- El producto "Sauce Labs Bike Light" se mantiene en el carrito.

---

## CART-04: El contador del carrito se actualiza al quitar un producto del carrito.

**Cubre:** AC3
**Prioridad:** Media

**Precondiciones:**
- El usuario inició sesión como "standard_user" y está en la página del carrito.
- El carrito tiene los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light".
- El carrito tiene como contador 2 productos.

**Pasos:**

1. Hacer clic en el botón **Remove** del producto "Sauce Labs Backpack".

**Resultado esperado:**

- El contador del carrito tiene 1 producto.

---

## CART-05: El carrito mantiene su contenido al regresar al inventario.

**Cubre:** AC4
**Prioridad:** Media

**Precondiciones:**
- El usuario inició sesión como "standard_user" y está en la página del carrito.
- El carrito tiene los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light".
- El carrito tiene como contador 2 productos.

**Pasos:**

1. Hacer clic en **Continue Shopping**.
2. Hacer clic en el carrito.

**Resultado esperado:**

- En la página del inventario el ícono del carrito tiene su contador en dos productos.
- Los botones de "Sauce Labs Backpack" y "Sauce Labs Bike Light" tienen el texto **Remove**.
- Al ingresar al carrito este contiene los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light".

---

## CART-06: Recargar la página con dos productos en el carrito

**Cubre:** Sin AC definido
**Prioridad:** Media

**Precondiciones**
- El usuario inició sesión como "standard_user" y está en la página del carrito.
- El carrito tiene los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light".
- El carrito tiene como contador 2 productos.

**Pasos:**

1. Hacer clic en recargar página.

**Resultado esperado:**

- A confirmar con el PO.

---


