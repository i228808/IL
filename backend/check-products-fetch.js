async function checkProducts() {
    console.log("Checking products...");

    // Test 1: With API Key
    try {
        console.log("\n--- Test 1: With API Key ---");
        const response = await fetch("http://127.0.0.1:9000/store/products", {
            headers: {
                "x-publishable-api-key": "pk_dc42cf713272770d625dd6555ec9a7e4ee57a9148cf7ec03ce8dcbfdc014f3e4"
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch with Key:", response.status, response.statusText);
            // const text = await response.text();
            // console.error("Body:", text);
        } else {
            const { products } = await response.json();
            console.log("Products found with Key:", products.length);
            products.forEach(p => console.log(`[Key] Found: ${p.title} (Handle: ${p.handle})`));
        }
    } catch (error) {
        console.error("Error Test 1:", error.message);
    }

    // Test 2: No Key (Default Channel)
    try {
        console.log("\n--- Test 2: No Key (Default Channel) ---");
        const response = await fetch("http://127.0.0.1:9000/store/products");

        if (!response.ok) {
            console.error("Failed to fetch No Key:", response.status, response.statusText);
        } else {
            const { products } = await response.json();
            console.log("Products found No Key:", products.length);
            products.forEach(p => console.log(`[No Key] Found: ${p.title} (Handle: ${p.handle})`));
        }
    } catch (error) {
        console.error("Error Test 2:", error.message);
    }
}

checkProducts();
