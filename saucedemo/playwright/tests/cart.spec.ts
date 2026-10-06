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

            // Verificar que el carrito de compras esté vacío
            await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

            // Agregar el producto "Sauce Labs Backpack" al carrito de compras
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

            // Verificar que el botón del carrito cambia a "Remove" después de agregar el producto
            await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

            // Verificar que el carrito de compras ahora muestra un número "1" indicando que hay un producto agregado
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');


        });

        test('CART-02 The cart page lists products and their prices', async ({ page }) => {
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
                await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();   


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

        test.fixme('CART-03 The user removes a product from the cart', async ({ page }) => {});

        test.fixme('CART-04 The cart counter updates when a product is removed from the cart', async ({ page }) => {});

        test.fixme('CART-05 The cart retains its contents when returning to inventory', async ({ page }) => {});
    }
});

