import { test, expect } from '@playwright/test';

test.describe('Shopping cart tests', () => {
    {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
            await page.getByPlaceholder('Username').fill('standard_user');
            await page.getByPlaceholder('Password').fill('secret_sauce');
            await page.getByRole('button', { name: 'Login' }).click();
        });

        test('CART-01 add one product', async ({ page }) => {

            //Precondiciones: Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

            //Pasos
            // Agregar el producto "Sauce Labs Backpack" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

            //Aserciones
            // Verificar que el botón del carrito cambia a "Remove" después de agregar el producto
            await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
            // Verificar que el carrito de compras ahora muestra un número "1" indicando que hay un producto agregado
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');


        });

        test('CART-02 The cart page lists products and their prices', async ({ page }) => {
            // Precondiciones: Agregar dos productos al carrito de compras   
            // Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

            //Pasos
            // Agregar el producto "Sauce Labs Backpack" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            // Agregar el producto "Sauce Labs Bike Light" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
            // Hacer clic en el ícono del carrito de compras para ir a la página del carrito
            await page.getByTestId('shopping-cart-link').click();
            //Validar que estamos en el carrito de compras
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.getByTestId('title')).toContainText('Your Cart');


            // Aserciones
            // Verificar que el contador del carrito de compras muestre "2" indicando que hay dos productos agregados
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
            //Verificar que la página del carrito de compras muestre los productos agregados y sus precios
            const backpackRow = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' });
            await expect(backpackRow.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
            await expect(backpackRow.getByTestId('inventory-item-price')).toHaveText('$29.99');

            const bikeLightRow = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' });
            await expect(bikeLightRow.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Bike Light');
            await expect(bikeLightRow.getByTestId('inventory-item-price')).toHaveText('$9.99');

        });

        test('CART-03 The user removes a product from the cart', async ({ page }) => {
            // Precondiciones: Agregar dos productos al carrito de compras
            // Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
            // Agregar el producto "Sauce Labs Backpack" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            // Agregar el producto "Sauce Labs Bike Light" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
            // Hacer clic en el ícono del carrito de compras para ir a la página del carrito
            await page.getByTestId('shopping-cart-link').click();
            //Validar que estamos en el carrito de compras
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.getByTestId('title')).toContainText('Your Cart');

            //Pasos
            //Verificar que el producto "Sauce Labs Backpack" y "Sauce Labs Bike Light" se muestran en la página del carrito de compras
            await expect(page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
            await expect(page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
            // Hacer clic en el botón "Remove" del producto "Sauce Labs Backpack" para eliminarlo del carrito
            await page.getByTestId('remove-sauce-labs-backpack').click();
            //Aserciones
            // Verificar que el producto "Sauce Labs Backpack" ya no esté presente en la página del carrito
            await expect(page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' })).not.toBeVisible();
            // Validar que el producto "Sauce Labs Bike Light" se mantiene en el carrito
            await expect(page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();

        });

        test('CART-04 The cart counter updates when a product is removed from the cart', async ({ page }) => {
            // Precondiciones: Agregar dos productos al carrito de compras
            // Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

            //Pasos
            // Agregar el producto "Sauce Labs Backpack" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            // Agregar el producto "Sauce Labs Bike Light" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
            // Hacer clic en el ícono del carrito de compras para ir a la página del carrito
            await page.getByTestId('shopping-cart-link').click();
            //Validar que estamos en el carrito de compras
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.getByTestId('title')).toContainText('Your Cart');

            // Verificar que el contador del carrito de compras muestre "2" indicando que hay dos productos agregados
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
            // Hacer clic en el botón "Remove" del producto "Sauce Labs Backpack" para eliminarlo del carrito
            await page.getByTestId('remove-sauce-labs-backpack').click();

            // Aserciones
            // Verificar que el contador del carrito de compras muestre "1" indicando que hay un producto agregado
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

        });

        test('CART-05 The cart retains its contents when returning to inventory', async ({ page }) => { 
            // Precondiciones: Agregar dos productos al carrito de compras
            //Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
            //Verificar que estamos en la página de inventario
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByTestId('title')).toContainText('Products');
            //Agregar el producto "Sauce Labs Backpack" y "Sauce Labs Bike Light" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
            //Hacer clic en el ícono del carrito de compras para ir a la página del carrito
            await page.getByTestId('shopping-cart-link').click();
            //Verificar que estamos en la página del carrito
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.getByTestId('title')).toContainText('Your Cart');
            //Verificar que el contador del carrito de compras muestre "2" indicando que hay dos productos agregados
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
            //Verificar que los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light" tienen el botón "Remove" indicando que están en el carrito
            await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
            await expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();
            
            //Pasos

            // Hacer clic en el botón "Continue Shopping" para regresar a la página de inventario
            await page.getByTestId('continue-shopping').click();
            //Verificar que estamos en la página de inventario
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByTestId('title')).toContainText('Products');
            //Verificar que el contador del carrito de compras muestre "2" indicando que hay dos productos agregados
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
            //Verificar que los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light" tienen el botón "Remove" indicando que están en el carrito
            await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
            await expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();

            //Hacer clic en el ícono del carrito de compras para ir a la página del carrito
            await page.getByTestId('shopping-cart-link').click();
            //Verificar que estamos en la página del carrito
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.getByTestId('title')).toContainText('Your Cart');
            //Verificar que el contador del carrito de compras muestre "2" indicando que hay dos productos agregados
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
            //Verificar que los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light" tienen el botón "Remove" indicando que están en el carrito
            await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
            await expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();

        });

        // CART-06: pendiente. Falta que el PO defina qué debe pasar al recargar la página.
        test.fixme('CART-06 CART-06 reload the cart page with two products', async ({ page }) => {});
    }
});

