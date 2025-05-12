export const fetchProductWithId = async (id: string) => {
 try {
    console.log()
 } catch (error) {
    console.log(error,'error in fetching product with id from db')
    }

    //copy db res
    const product = {
        id: "1",
        name: "Elegant Evening Dress",
        price: 799,
        image: "/images/dress1.jpg",
        description: "A glamorous dress perfect for formal evenings, with a flowing silhouette and premium fabric.",
        reviews: [
          { user: "Aanya", rating: 5, comment: "Loved it! Looked amazing for my event." },
          { user: "Neha", rating: 4, comment: "Good quality, worth the rent." },
        ],
      };
    return {
        success: true,
        product: product
    }
}

