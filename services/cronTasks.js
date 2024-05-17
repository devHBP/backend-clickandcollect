const cron = require("node-cron");
const Carts = require("../models/BDD/Carts");
const CartItems = require("../models/BDD/ProductsCart");
const { getAddStock, getAddStockAntigaspi } = require("./services");

const { Op } = require("sequelize");


// test toutes les minutes
// cron.schedule('*/1 * * * *', async () => {
//     await clearExpiredCarts();
//   });

  // Tâche pour vérifier les paniers expirés entre 21h et minuit, toutes les 10 minutes
cron.schedule('*/10 21-23 * * *', async () => {
    console.log('Vérification des paniers expirés entre 21h et minuit...');
    await clearExpiredCarts();
});

// Tâche pour vérifier les paniers expirés hors de ces heures, toutes les 30 minutes
cron.schedule('*/30 0-20 * * *', async () => {
    console.log('Vérification des paniers expirés hors des heures de pointe...');
    await clearExpiredCarts();
});

async function clearExpiredCarts() {
  try {
    const expiredCarts = await Carts.findAll({
      where: {
        updatedAt: {
          [Op.lt]: new Date(new Date() - 10 * 60 * 1000), // dépassé de 10minutes
        },
        status: "active",
      },
      include: [CartItems], // Assurez-vous que cela correspond à votre modèle d'association correctement configuré
    });

    if (expiredCarts.length > 0) {
    //   console.log("Paniers expirés trouvés avec leurs éléments:");
      for (const cart of expiredCarts) {
        // console.log(cart.ProductsCarts)
        console.log(`Panier ID expiré: ${cart.cartId}`);
        if (cart.ProductsCarts && cart.ProductsCarts.length > 0) {
          for (const item of cart.ProductsCarts) {
            if (item.type === "antigaspi") {
            //   console.log(
            //     `- Produit ID: ${item.productId}, Quantité: ${item.quantity}, Type: ${item.type}`
            //   );
              await getAddStockAntigaspi(item.productId, item.quantity);
            }
            if (item.type === "simple" || item.type === "offre31") {
            //   console.log(
            //     `- Produit ID: ${item.productId}, Quantité: ${item.quantity}, Type: ${item.type}`
            //   );
              await getAddStock(item.productId, item.quantity);
            }
            if (item.type === 'formule'){              
                const optionIds = [
                    item.option1ProductId,
                    item.option2ProductId,
                    item.option3ProductId,
                  ].filter(Boolean);
                  console.log(optionIds)

                  await Promise.all(
                    optionIds.map(optionId =>
                        getAddStock(optionId, item.quantity) 
                      ),
                  );

            }
          }
        await CartItems.destroy({ where: { cartId: cart.cartId } });
        await Carts.destroy({ where: { cartId: cart.cartId } });
        }
      }
    } else {
      console.log("Aucun panier expiré trouvé.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification des paniers et de leurs éléments:",
      error
    );
  }
}


