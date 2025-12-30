const { Medusa } = require("@medusajs/medusa-js")

const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 })

async function checkProducts() {
    try {
        const { products } = await medusa.products.list()
        console.log("Products found:", products.length)
        products.forEach(p => {
            console.log(`- Title: ${p.title}`)
            console.log(`  Handle: ${p.handle}`)
            console.log(`  ID: ${p.id}`)
            console.log(`  Status: ${p.status}`)
        })
    } catch (error) {
        console.error("Error fetching products:", error)
    }
}

checkProducts()
