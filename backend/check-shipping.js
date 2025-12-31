async function checkShipping() {
    const baseUrl = "http://127.0.0.1:9000/store";

    // Authenticate/Headers if needed, but for public store endpoints usually not needed for GET unless protected
    // However, store endpoints are public.

    try {
        console.log("--- Shipping Options ---");
        const optionsRes = await fetch(`${baseUrl}/shipping-options`);
        const { shipping_options } = await optionsRes.json();

        if (shipping_options) {
            shipping_options.forEach(so => {
                console.log(`ID: ${so.id}, Name: ${so.name}, Profile ID: ${so.profile_id}, Region ID: ${so.region_id}`);
            });
        } else {
            console.log("No shipping options found or error.");
        }

        console.log("\n--- Products & Their Profiles ---");
        // Products endpoint might be paginated, just getting first batch
        const prodRes = await fetch(`${baseUrl}/products`);
        const { products } = await prodRes.json();

        if (products) {
            products.forEach(p => {
                console.log(`Product: ${p.title} (${p.id}) -> Profile ID: ${p.profile_id}`);
            });
        }

        // We can't easily list "shipping profiles" from store API, usually that's admin API.
        // But we can infer existence from what is returned on options/products.

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

checkShipping();
