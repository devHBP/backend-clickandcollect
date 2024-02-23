const Orders = require("../models/BDD/Orders");
const Products = require("../models/BDD/Produits");
const DetailProduct = require("../models/BDD/ProductDetails");


const { Sequelize, Op} = require('sequelize')


/** Chiffre d'affaires  */

// calcul du chiffre d'affaire total

const getTotalSales = async (req, res) => {
    try {
        // Utilisez directement la méthode 'sum' de Sequelize pour calculer le total
        const totalSales = await Orders.sum('prix_total', {
            where: { paid: true }
        });

        // Si aucun résultat n'est trouvé, 'sum' peut retourner null, donc on utilise || 0 pour s'assurer de retourner 0 dans ce cas
        res.json({ totalSales: totalSales || 0 });
    } catch (error) {
        console.error("Error calculating total sales:", error);
        res.status(500).send("Server error");
    }
};

//calcul chiffres d'affaires du jour
const getSalesToday = async (req, res) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
  
    try {
        const totalSalesToday = await Orders.sum('prix_total', {
            where: {
                date: {
                    [Op.gte]: todayStart,
                    [Op.lte]: todayEnd
                },
                paid: true
            }
        });

        res.json({ totalSales: totalSalesToday || 0 });
    } catch (error) {
        console.error("Error calculating total sales for today:", error);
        res.status(500).send("Server error");
    }
};

const getSalesMonth = async (req, res) => {
    // Obtention du premier et dernier jour du mois courant
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999); // Inclure la fin de la journée pour le dernier jour du mois

    try {
        // Calcul du total des ventes pour le mois courant pour les commandes payées
        const totalSalesThisMonth = await Orders.sum('prix_total', {
            where: {
                date: {
                    [Op.gte]: firstDayOfMonth,
                    [Op.lte]: lastDayOfMonth
                },
                paid: true
            }
        });

        // Réponse avec le total calculé ou zéro si aucun résultat
        res.json({ totalSales: totalSalesThisMonth || 0 });
    } catch (error) {
        console.error("Error calculating total sales for the month:", error);
        res.status(500).send("Server error");
    }
};

const getSalesWeek = async (req, res) => {
    const today = new Date();
    // Ajustez pour obtenir le premier jour de la semaine (dimanche = 0)
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    firstDayOfWeek.setHours(0, 0, 0, 0);
  
    // Ajustez pour obtenir le dernier jour de la semaine (samedi = 6)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23, 59, 59, 999);
  
    try {
      const totalSalesThisWeek = await Orders.sum('prix_total', {
        where: {
          date: {
            [Op.gte]: firstDayOfWeek,
            [Op.lte]: lastDayOfWeek
          },
          paid: true
        }
      });
  
      res.json({ totalSales: totalSalesThisWeek || 0 });
    } catch (error) {
      console.error("Error calculating total sales for the week:", error);
      res.status(500).send("Server error");
    }
  };

  const getSalesByDate = async (req, res) => {
    const { date } = req.params; // Récupérez la date de la requête
    // Convertissez la date en format UTC pour éviter les problèmes de fuseau horaire
    const utcDate = new Date(new Date(date).toISOString());

    // Réglez sur minuit pour obtenir le début de la journée
    const startDate = new Date(utcDate);
    startDate.setUTCHours(0, 0, 0, 0);

    // Réglez pour obtenir la fin de la journée
    const endDate = new Date(utcDate);
    endDate.setUTCHours(23, 59, 59, 999);

    try {
        const totalSales = await Orders.sum('prix_total', {
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
                paid: true 
            }
        });

        res.json({ totalSales: totalSales});
    } catch (error) {
        console.error("Error calculating sales for the selected date:", error);
        res.status(500).send("Server error");
    }
};


/** Fin  Chiffre d'affaires  */


/** Nombre de commandes  */

// commandes du jour
const getOrderToday  = async (req, res) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
  
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
  
    try {
      const count = await Orders.count({
        where: {
          date: {
            [Op.between]: [todayStart, todayEnd]
          },
          paid: true
        }
      });
      res.json({ count });
    } catch (error) {
      console.error("Error counting today's paid orders:", error);
      res.status(500).send("Server error");
    }
  };

  //commande de la semaine
  const getOrderWeek = async (req, res) => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
    lastDayOfWeek.setHours(23, 59, 59, 999);

    try {
        const count = await Orders.count({
            where: {
                date: {
                    [Op.between]: [firstDayOfWeek, lastDayOfWeek]
                },
                paid: true
            }
        });
        res.json({ count });
    } catch (error) {
        console.error("Error counting this week's paid orders:", error);
        res.status(500).send("Server error");
    }
};

// commandes du mois
const getOrderMonth = async (req, res) => {
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

    try {
        const count = await Orders.count({
            where: {
                date: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                },
                paid: true
            }
        });
        res.json({ count });
    } catch (error) {
        console.error("Error counting this month's paid orders:", error);
        res.status(500).send("Server error");
    }
};

// total des commandes
const getTotalOrders = async (req, res) => {
    try {
        const count = await Orders.count({
            where: {
                paid: true
            }
        });
        res.json({ count });
    } catch (error) {
        console.error("Error counting total paid orders:", error);
        res.status(500).send("Server error");
    }
};

// commande par jour selectionné
const getOrdersByDate = async (req, res) => {
    const { date } = req.params; // Récupérez la date de la requête
    // Convertissez la date en format UTC pour éviter les problèmes de fuseau horaire
    const utcDate = new Date(new Date(date).toISOString());
  
    // Réglez sur minuit pour obtenir le début de la journée
    const startDate = new Date(utcDate);
    startDate.setUTCHours(0, 0, 0, 0);
  
    // Réglez pour obtenir la fin de la journée
    const endDate = new Date(utcDate);
    endDate.setUTCHours(23, 59, 59, 999);
  
    try {
      const ordersCount = await Orders.count({
        where: {
          date: {
            [Op.between]: [startDate, endDate]
          },
          paid: true 
        }
      });
        res.json({ ordersCount });
    } catch (error) {
      console.error("Error calculating orders count for the selected date:", error);
      res.status(500).send("Server error");
    }
  };
  
/** Fin Nombre de commandes  */

/** Calcul panier moyen  */
const calculateAverageBasket = async (req, res) => {
    try {
        // Calculez le total des ventes
        const totalSales = await Orders.sum('prix_total', {
            where: { paid: true }
        });

        // Comptez le nombre de commandes payées
        const countPaidOrders = await Orders.count({
            where: { paid: true }
        });

        // Calculez le panier moyen
        const averageBasket = countPaidOrders > 0 ? (totalSales / countPaidOrders) : 0;

        // Renvoyez le résultat
        res.json({ averageBasket });
    } catch (error) {
        console.error("Error calculating average basket:", error);
        res.status(500).send("Server error");
    }
};

// top 3 des ventes
const getTopSoldProducts = async (req, res) => {
    try {
        // Récupérer toutes les commandes payées
        const paidOrders = await Orders.findAll({
            where: { paid: true },
            attributes: ['productIds'] // Assurez-vous que cela renvoie une chaîne avec des identifiants de produits
        });

        // Compter les occurrences de chaque productId
        const productCount = {};
        paidOrders.forEach(order => {
            const productIds = order.productIds.split(','); // Adaptez en fonction de votre délimiteur
            productIds.forEach(id => {
                productCount[id] = (productCount[id] || 0) + 1;
            });
        });

        // Transformer l'objet de comptage en tableau et trier par nombre d'occurrences
        let sortedProducts = Object.entries(productCount)
            .map(([productId, count]) => ({ productId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3); // Prendre les trois premiers résultats

        // Récupérer les libellés des produits pour chaque productId
        const productsWithDetails = await Promise.all(sortedProducts.map(async ({ productId, count }) => {
            const product = await Products.findByPk(productId, {
                attributes: ['libelle'] // Assurez-vous que 'libelle' est le bon champ pour le nom du produit
            });
            return {
                productId,
                count,
                libelle: product ? product.libelle : 'Libellé non trouvé'
            };
        }));

        res.json(productsWithDetails);
    } catch (error) {
        console.error("Error finding top sold products:", error);
        res.status(500).send("Server error");
    }
};




module.exports = {
    getTotalSales,
    getSalesToday,
    getSalesMonth,
    getSalesWeek, 
    getSalesByDate,
    getOrderToday,
    getOrderWeek,
    getOrderMonth,
    getTotalOrders,
    getOrdersByDate,
    calculateAverageBasket,
    getTopSoldProducts
  };