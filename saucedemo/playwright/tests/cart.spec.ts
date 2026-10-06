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

        
    }
});

