const sgMail = require('@sendgrid/mail'); // N'oubliez pas d'inclure la bibliothèque SendGrid.
const jwt = require('jsonwebtoken'); // Pour générer un token JWT si nécessaire.
require('dotenv').config();
const SECRET = process.env.SECRET;
const NODEJS_URL = process.env.NODEJS_URL;
const NODEJS_PORT = process.env.NODEJS_PORT;

const sendWelcomeEmail = async (req, res) => {
    try {
        const { email, firstname } = req.body;
        console.log('email',email)
        console.log('fistname',firstname)
        // Configurez SendGrid.
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);


        // <h1>Bienvenue, ${firstname}!</h1>
        // <p>Nous sommes ravis que vous nous ayez rejoints sur Le Pain du Jour.</p>
        // <p>Commencez à explorer dès maintenant et découvrez toutes les fonctionnalités disponibles pour vous.</p>
        // <br>
        // <p>Amusez-vous bien,</p>
        // <p>L'équipe du Pain du Jour</p>


        // Message de bienvenue
        const msg = {
            to: email, 
            from: 'contact@lepaindujour.io', 
            subject: `Bienvenue sur l'application Le Pain du Jour ClickandCollect!`, 
            html: `
               

                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <link rel="stylesheet" href="style.css"> -->
  <title>Test</title>
  <style>
    .confirmation-de-commande,
.confirmation-de-commande * {
  box-sizing: border-box;
}
.confirmation-de-commande {
  background: var(--blanc-cass, #ececec);
  width: 390px;
  height: 1529px;
  position: relative;
  overflow: hidden;
}
.rectangle-6 {
  background: var(--blanc-pure, #ffffff);
  width: 390px;
  height: 96px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.bonjour-pr-nom-du-client {
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: 400 italic 24px/30px "Postino", sans-serif;
  position: absolute;
  left: 83px;
  top: 26px;
}
.merci-pour-ta-commande {
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: 400 italic 16px/16px "Postino", sans-serif;
  position: absolute;
  left: 66px;
  top: 152px;
}
.frame-5 {
  background: var(--blanc-pure, #ffffff);
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  gap: 0px;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  left: 20px;
  top: 251px;
}
.nos-quipes-vont-la-pr-parer-pour {
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
}
.frame-1 {
  padding: 10px 11px 10px 11px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.date-heure {
  color: var(--orange-lpdj, #e9520e);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
}
.frame-4 {
  background: var(--blanc-pure, #ffffff);
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  left: 20px;
  top: 302px;
}
.nous-te-tiendrons-inform-de-sa-disponibilit-de-retrait-au {
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
  width: 201px;
  height: 29px;
}
.frame-2 {
  padding: 10px 5px 10px 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 113px;
  position: relative;
}
.le-pain-du-jour-mas-gu-rido {
  color: var(--orange-lpdj, #e9520e);
  text-align: center;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
}
._14-rue-henri-becquerel-66330-cabestany {
  color: var(--bleu-lpdj, #273545);
  text-align: center;
  font: var(--textes-reduits, 400 9px "Montserrat", sans-serif);
  position: relative;
}
.group-1 {
  position: absolute;
  inset: 0;
}
.frame-3 {
  padding: 10px 5px 10px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 89px;
  top: 791px;
}
.n-t-l-phone-service-client {
  color: var(--orange-lpdj, #e9520e);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
}
.des-questions {
  color: var(--orange-lpdj, #e9520e);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: absolute;
  left: 20px;
  top: 730px;
}
.si-tu-as-des-questions-ou-des-demandes-sp-cifiques-concernant-ta-commande-n-h-site-pas-nous-contacter-en-r-pondant-cet-e-mail-ou-en-appelant-notre-service-client-le-au
{
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: var(--textes-normaux, 400 12px "Montserrat", sans-serif);
  position: absolute;
  left: 20px;
  top: 756px;
  width: 350px;
}
.frame-12 {
  background: var(--blanc-pure, #ffffff);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 839px;
}
.comment-retirer-ta-commande-1-munis-toi-de-l-application-click-and-collect-pain-du-jour-2-rends-toi-au-point-de-retrait-3-et-pr-sente-le-bon-de-commande
{
  color: var(--bleu-lpdj, #273545);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: relative;
  width: 330px;
}
.frame-11 {
  background: var(--blanc-pure, #ffffff);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 350px;
  position: absolute;
  left: 20px;
  top: 967px;
}
.merci-pour-ta-confiance-et-tr-s-vite {
  color: var(--bleu-lpdj, #273545);
  text-align: center;
  font: 400 italic 16px/0% "Postino", sans-serif;
  position: relative;
  width: 329px;
}
.num-ro-de-commande {
  color: var(--orange-lpdj, #e9520e);
  text-align: left;
  font: var(--textes-semibold, 600 12px "Montserrat", sans-serif);
  position: absolute;
  left: calc(50% - 79px);
  top: 180px;
}
.rectangle-1 {
  background: #d9d9d9;
  width: 88px;
  height: 88px;
  position: absolute;
  left: 226px;
  top: 399px;
}
.qr-code {
  color: #000000;
  text-align: left;
  font: var(--textes-normaux, 400 12px "Montserrat", sans-serif);
  position: absolute;
  left: 245px;
  top: 431px;
  width: 55px;
  height: 18px;
}
.logo-1 {
  width: 54px;
  height: 54px;
  position: absolute;
  left: 20px;
  top: 26px;
}
.group-3 {
  position: absolute;
  inset: 0;
}
.rectangle-7 {
  background: var(--bleu-lpdj, #273545);
  width: 390px;
  height: 279px;
  position: absolute;
  left: 0px;
  top: 1046px;
}
.paiement-s-curis {
  color: var(--blanc-pure, #ffffff);
  text-align: center;
  font: 400 12px "Inter", sans-serif;
  position: absolute;
  left: 28px;
  top: 1124px;
}
.service-client-ouvert-de-08-h-20-h {
  color: var(--blanc-pure, #ffffff);
  text-align: center;
  font: 400 12px "Inter", sans-serif;
  position: absolute;
  left: 138px;
  top: 1124px;
}
.entreprise-locale-perpignaise {
  color: var(--blanc-pure, #ffffff);
  text-align: center;
  font: 400 12px "Inter", sans-serif;
  position: absolute;
  left: 271px;
  top: 1124px;
}
.start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd
{
  color: var(--bleu-lpdj-gris, #636c77);
  text-align: center;
  font: var(--textes-reduits, 400 9px "Montserrat", sans-serif);
  position: absolute;
  left: 20px;
  top: 1335px;
  width: 350px;
}
.start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span
{
  color: var(--bleu-lpdj-gris, #636c77);
  font: var(--textes-reduits, 400 9px "Montserrat", sans-serif);
}
.start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span2
{
  color: var(--bleu-lpdj-gris, #636c77);
  font: var(--textes-reduits, 400 9px "Montserrat", sans-serif);
}
.start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span3
{
  color: var(--bleu-lpdj-gris, #636c77);
  font: var(--textes-reduits, 400 9px "Montserrat", sans-serif);
}
.frame-10 {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: calc(50% - 46px);
  top: calc(50% - -682.5px);
}
.frame-8 {
  background: var(--bleu-lpdj, #273545);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}
.cgv {
  color: var(--blanc-cass, #ececec);
  text-align: center;
  font: 600 10px "Montserrat", sans-serif;
  position: relative;
}
.frame-9 {
  background: var(--bleu-lpdj, #273545);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.cgu {
  color: var(--blanc-cass, #ececec);
  text-align: center;
  font: 600 10px "Montserrat", sans-serif;
  position: relative;
}
.calque-1 {
  width: 71px;
  height: 67.01px;
  position: static;
}
.group {
  width: 71px;
  height: 67.01px;
  position: static;
}
.group2 {
  position: absolute;
  left: 179.33px;
  top: 1265.1px;
  overflow: visible;
}
.group3 {
  position: absolute;
  left: 172.92px;
  top: 1251.04px;
  overflow: visible;
}
.group4 {
  position: absolute;
  left: 186.35px;
  top: 1293.86px;
  overflow: visible;
}
.group5 {
  position: absolute;
  left: 159px;
  top: 1246px;
  overflow: visible;
}
.image-1 {
  width: 263px;
  height: 32px;
  position: absolute;
  left: calc(50% - 132px);
  top: 1186px;
}
.vector131 {
  position: absolute;
  left: 57px;
  top: 1068px;
  overflow: visible;
}
.ri-customer-service-2-fill {
  position: absolute;
  left: 171px;
  top: 1064px;
  overflow: visible;
}
.icon-park-solid-local {
  width: 48px;
  height: 48px;
  position: absolute;
  left: 294px;
  top: 1064px;
  overflow: hidden;
}
.mask-group {
  position: absolute;
  inset: 0;
}
.group6 {
  width: 40px;
  height: 39px;
  position: static;
}
.group7 {
  position: absolute;
  left: 4px;
  top: 4px;
  overflow: visible;
}
.vector136 {
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: visible;
}
.frame-7 {
  background: var(--blanc-pure, #ffffff);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: 20px;
  top: 563px;
}
.tes-informations-personnelles {
  color: var(--orange-lpdj, #e9520e);
  text-align: left;
  font: 600 16px "Montserrat", sans-serif;
  position: relative;
}
.frame-6 {
  display: flex;
  flex-direction: row;
  gap: 28px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}
.promos {
  background: var(--orange-lpdj, #e9520e);
  border-radius: 6px;
  padding: 11px 14px 11px 14px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 104px;
  top: 504px;
  box-shadow: var(
    --drop-shadow-box-shadow,
    3px 3px 6px 0px rgba(0, 0, 0, 0.25)
  );
}
.bon-de-commande {
  color: var(--blanc-pure, #ffffff);
  text-align: left;
  font: 600 14px "Montserrat", sans-serif;
  position: relative;
}
.akar-icons-arrow-back {
  width: 41px;
  height: 43px;
  position: absolute;
  left: 223px;
  top: 492px;
  transform-origin: 0 0;
  transform: rotate(180deg) scale(1, 1);
  overflow: hidden;
}
.group8 {
  position: absolute;
  left: 5.12px;
  top: 8.96px;
  overflow: visible;
}

  </style>
</head>

<body>
<div class="confirmation-de-commande">
  <div class="rectangle-6"></div>
  <div class="bonjour-pr-nom-du-client">Bonjour<br />${firstname}</div>
  <div class="merci-pour-ta-commande">Merci pour ta commande !</div>
  <div class="frame-5">
    <div class="nos-quipes-vont-la-pr-parer-pour">
      Nos équipes vont la préparer pour :
    </div>
    <div class="frame-1">
      <div class="date-heure">[ Date / Heure]</div>
    </div>
  </div>
  <div class="frame-4">
    <div class="nous-te-tiendrons-inform-de-sa-disponibilit-de-retrait-au">
      Nous te tiendrons informé de sa disponibilité de retrait au :
    </div>
    <div class="frame-2">
      <div class="le-pain-du-jour-mas-gu-rido">
        Le Pain du Jour<br />Mas Guérido
      </div>
      <div class="_14-rue-henri-becquerel-66330-cabestany">
        14 Rue Henri Becquerel,<br />66330 Cabestany
      </div>
    </div>
  </div>
  <div class="group-1">
    <div class="frame-3">
      <div class="n-t-l-phone-service-client">
        [N° Téléphone Service Client].
      </div>
    </div>
    <div class="des-questions">Des questions ?</div>
    <div
      class="si-tu-as-des-questions-ou-des-demandes-sp-cifiques-concernant-ta-commande-n-h-site-pas-nous-contacter-en-r-pondant-cet-e-mail-ou-en-appelant-notre-service-client-le-au"
    >
      Si tu as des questions ou des demandes spécifiques concernant ta commande,
      n'hésite pas à nous contacter en répondant à cet e-mail ou en
      appelant notre service clientèle au
    </div>
  </div>
  <div class="frame-12">
    <div
      class="comment-retirer-ta-commande-1-munis-toi-de-l-application-click-and-collect-pain-du-jour-2-rends-toi-au-point-de-retrait-3-et-pr-sente-le-bon-de-commande"
    >
      Comment retirer ta commande ? <br /><br />📲 1. Munis-toi de
      l'application Click and Collect Pain du Jour<br />🚗 2. Rends-toi au
      point de retrait <br />🧾 3. Et présente le bon de commande
    </div>
  </div>
  <div class="frame-11">
    <div class="merci-pour-ta-confiance-et-tr-s-vite">
      Merci pour ta confiance<br />et à très vite !
    </div>
  </div>
  <div class="num-ro-de-commande">[ numéro de commande ]</div>
  <div class="rectangle-1"></div>
  <div class="qr-code">qr code</div>
  <img class="logo-1" src="logo-1.png" />
  <div class="group-3">
    <div class="rectangle-7"></div>
    <div class="paiement-s-curis">Paiement sécurisé</div>
    <div class="service-client-ouvert-de-08-h-20-h">
      Service client<br />ouvert de 08h-20 h
    </div>
    <div class="entreprise-locale-perpignaise">
      Entreprise locale<br />Perpignaise
    </div>
    <div
      class="start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd"
    >
      <span
        ><span
          class="start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span"
          >START FOOD - LE PAIN DU JOUR - MAS GUERIDO<br />Numéro de
téléphone : </span
        ><span
          class="start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span2"
          >04 68 84 46 01</span
        ><span
          class="start-food-le-pain-du-jour-mas-guerido-num-ro-de-t-l-phone-04-68-84-46-01-adresse-e-mail-de-contact-lepaindujourmasguerido-gmail-com-lepaindujour-com-capital-00000-siret-ape-tva-rgpd-span3"
          ><br />Adresse e-mail de Contact :
lepaindujourmasguerido@gmail.com<br />lepaindujour.com<br />Capital
          : 00000 €<br />SIRET<br />APE<br />TVA<br />RGPD</span
        ></span
      >
    </div>
    <div class="frame-10">
      <div class="frame-8">
        <div class="cgv">CGV</div>
      </div>
      <div class="frame-9">
        <div class="cgu">CGU</div>
      </div>
    </div>
    <div class="calque-1">
      <div class="group">
        <svg
          class="group2"
          width="40"
          height="32"
          viewBox="0 0 40 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.134 4.05875L14.6916 3.32859L14.4879 2.51173L15.3834
2.31502L15.5783 4.01208C15.1622 4.1121 14.5651 4.28214 13.8539
4.53886C13.0953 4.81393 12.3912 5.13233 11.5992 5.45074L11.4043
4.53553L12.1717 4.34049L11.4956 1.86992L10.816 2.18666L10.6176
1.27812C11.1514 1.10475 11.4798 1.01806 11.8907 0.869693C12.3104
0.717992 12.6879 0.54962 13.1656 0.35791L13.364 1.26645L12.5773
1.47316L13.1392 4.05542L13.134 4.05875Z"
            fill="#ECECEC"
          />
          <path
            d="M16.8146 2.29008C16.8725 2.39011 17.1535 2.67351
17.6434 2.4968C18.1439 2.31509 18.5214 1.94834 18.7392 1.6466L19.2344
2.31176C19.0851 2.5068 18.4617 3.04526 17.8752 3.25864C16.8093 3.64539
15.991 3.2353 15.7048 2.52014C15.3553 1.64827 15.8031 0.66138 16.9551
0.242952C17.9507 -0.11713 18.7884 0.232949 19.0676 0.92644C19.1097
1.03313 19.1518 1.18317 19.1606 1.28319L16.8146
2.29175V2.29008ZM18.0754 1.14316C17.9332 0.913103 17.596 0.809746
17.2027 0.953112C16.8199 1.09148 16.5635 1.49824 16.6162
1.84332L18.0737 1.14316H18.0754Z"
            fill="#ECECEC"
          />
          <path
            d="M7.69378 17.2018L8.052 19.0889C6.79294 19.5023 5.94303
19.7407 5.03693 20.0691C4.16419 20.3858 3.41086 20.7276 2.61012
21.0577L2.18867 19.1106L3.85513 18.6871L2.42749 13.5376L0.987557
14.5278L0.330808 12.5257C1.8164 11.6839 4.14838 10.5919 5.96059
9.93513C8.68066 8.95157 10.3699 9.37667 10.9319 10.777C11.6782 12.6357
10.3296 14.9496 7.27233 16.0549C6.65597 16.2782 5.89913 16.4133
5.55495 16.3866L5.91845 18.0236L7.69202 17.2018H7.69378ZM5.19497
14.7596C5.569 14.7629 6.03434 14.7596 6.83684 14.4695C8.27853 13.9477
8.87909 12.9575 8.54896 12.1356C8.33121 11.5922 7.63056 11.3071
6.22399 11.8156C5.39867 12.114 5.07556 12.2723 4.69802 12.4924L5.19497
14.7596Z"
            fill="#ECECEC"
          />
          <path
            d="M20.4091 11.924L21.5488 13.571C20.7515 14.0378 18.9674
15.3331 18.2949 15.9782L17.5907 12.9292L17.5784 12.9325C17.74 13.9661
17.1183 15.9332 15.2692 16.6017C14.2929 16.9551 13.0848 16.7017
12.3982 14.9863C11.4587 12.6441 12.6335 10.4636 15.134 9.56009C16.4475
9.08499 17.8453 8.95162 18.4863 8.95496C18.5969 10.2269 18.9253
11.6722 19.4819 12.9625L20.4091 11.9223V11.924ZM15.415 14.2428C16.4159
13.8811 16.811 11.8156 16.6951 10.9321C16.4862 10.9104 16.1648 10.9021
15.5256 11.1338C14.3983 11.5422 13.9733 12.7041 14.3596 13.671C14.602
14.2745 14.9497 14.4112 15.415 14.2428Z"
            fill="#ECECEC"
          />
          <path
            d="M21.8017 9.05659L21.4593 9.32832L20.6726
7.72295L23.3962 6.461L24.0828 10.857L25.0012 9.86011L26.1303
11.5121C25.1013 12.134 23.9054 13.0358 22.764 13.9744L21.8017
9.05659ZM23.0836 3.82373L23.3716 5.26739L20.785 6.45266L20.3881
4.53556L23.0836 3.82373Z"
            fill="#ECECEC"
          />
          <path
            d="M27.7827 11.9522L26.6729 7.29449L25.6632
8.22637L24.5182 6.56766L28.1567 4.75391L28.5817 8.06966L28.6045
8.06133C28.4622 6.41262 29.3297 4.42717 30.7117 3.92539C31.6529
3.58531 32.5204 3.687 33.049 5.0023C33.3018 5.63078 33.4511 6.73603
33.5231 7.44452L34.4432 6.42096L35.5829 8.068C34.6838 8.61479 32.926
9.94176 32.0515 10.6169C31.976 9.66336 31.8338 7.75126 31.5089
6.94274C31.3193 6.47263 31.0787 6.26925 30.6836 6.41262C29.7652
6.74603 29.2525 8.85151 29.5071 11.1104L27.7827 11.9555V11.9522Z"
            fill="#ECECEC"
          />
          <path
            d="M2.54345 25.8904L1.81119 26.4822L1.2282 25.742C1.64086
25.5569 2.82266 25.0051 3.25464 24.7634C3.38634 25.8453 3.7709 27.5007
4.0624 28.2109L4.47682 27.7458L4.98607 28.4809C4.63487 28.6877 3.83412
29.2678 3.53384 29.5562L3.22303 28.1875L3.21249 28.1925C3.28976 28.651
3.00879 29.5362 2.18347 29.8362C1.74798 29.993 1.19659 29.8479
0.901578 29.1144C0.487158 28.0809 0.985866 27.104 2.12201
26.6922C2.43282 26.5788 2.63301 26.5738 2.71203 26.5638L2.54345
25.8904ZM2.24668 28.781C2.69271 28.6193 2.87007 27.6974 2.81739
27.3023C2.72432 27.294 2.58033 27.289 2.29585 27.3924C1.79188 27.5757
1.60223 28.0942 1.77607 28.5243C1.88495 28.7943 2.03947 28.8544
2.24668 28.781Z"
            fill="#ECECEC"
          />
          <path
            d="M8.51741 26.3021L9.02665 27.0373C8.70004 27.2157
7.89578 27.7608 7.49892 28.1209L7.27239 26.5505H7.26713C7.31805 27.169
6.93875 28.1026 6.31537 28.3276C5.92026 28.471 5.50233 28.4176 5.27229
27.8475C5.14059 27.5191 5.05279 26.9573 5.01592 26.4972L4.56462
26.9123L4.05362 26.1721L5.7271 25.3386C5.71832 25.792 5.81315 26.6205
5.9589 26.9823C6.04318 27.1923 6.16084 27.279 6.32766 27.219C6.70169
27.084 6.93875 26.4305 6.83163 25.5136L6.78598 25.0735L7.65345
24.6434L8.11177 26.7489L8.51565 26.3055L8.51741 26.3021Z"
            fill="#ECECEC"
          />
          <path
            d="M14.797 26.6605C15.3694 29.1378 14.7759 30.6948 12.5299
31.5066C11.0426 32.0451 9.82919 31.8384 9.34628 31.625L9.59388
29.6395C10.0382 29.7879 10.8108 30.038 11.7222 29.7096C12.7863 29.3245
13.1779 28.3192 12.623 26.5055L11.9171 24.2183L9.63602 25.2885L9.23038
23.4098C10.9864 22.8013 12.0014 22.5112 12.8583 22.2012C13.6608
21.9111 14.3492 21.611 15.0358 21.311L15.4344 23.1414L14.0559
23.4848L14.797 26.6622V26.6605Z"
            fill="#ECECEC"
          />
          <path
            d="M16.7198 27.114C15.8698 24.9968 17.2466 23.0397 19.2554
22.3129C21.1871 21.6144 22.7007 22.2279 23.2486 23.5915C24.1354
25.8003 22.7165 27.8108 20.7305 28.5276C18.9604 29.1678 17.3712 28.736
16.7198 27.114ZM21.2784 24.6001C21.0167 23.9466 20.4039 23.5348 19.568
23.8382C18.8094 24.1133 18.237 25.0435 18.6672 26.1137C18.9657 26.8572
19.6189 27.279 20.4232 26.9889C21.2152 26.7022 21.7226 25.7053 21.2801
24.6017"
            fill="#ECECEC"
          />
          <path
            d="M32.0409 21.7778L33.1051 23.3164C32.422 23.6915 30.7415
24.8284 29.9126 25.5803L29.4385 22.2945L29.428 22.2979C29.5351 23.5882
28.7414 25.5403 27.4384 26.0104C26.6131 26.3088 25.7368 26.1988
25.2592 25.0052C24.9835 24.3183 24.7974 23.1464 24.7219
22.1795L23.7789 23.0497L22.7095 21.501L26.211 19.7573C26.1934 20.7058
26.3936 22.4396 26.6956 23.1947C26.8712 23.6348 27.1188 23.8166
27.4665 23.6915C28.2479 23.4098 28.7431 22.0428 28.5201
20.1224L28.4235 19.2022L30.2375 18.3003L31.1963 22.703L32.0427
21.7778H32.0409Z"
            fill="#ECECEC"
          />
          <path
            d="M34.308 23.4349L33.2596 19.0906L32.3272 19.9575L31.2578
18.4088L34.7259 16.6767L35.0315 19.6374L35.042 19.6341C34.9085 18.4054
35.7707 16.4033 36.942 15.9782C37.82 15.6598 38.4153 15.7165 39.044
16.29L37.6497 18.3554L36.7524 18.0087C36.4837 18.3904 35.5864 19.9658
35.8902 22.6431L34.3062 23.4349H34.308Z"
            fill="#ECECEC"
          />
        </svg>

        <svg
          class="group3"
          width="27"
          height="11"
          viewBox="0 0 27 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.92148 8.06135L1.23581 7.77795L2.63535
10.3452L3.90144 9.21161L4.04016 9.44667L2.45624 10.8653L0.92148
8.06135Z"
            fill="#ECECEC"
          />
          <path
            d="M6.11575 7.20951C6.17546 7.37955 6.27204 7.56793 6.3616
7.69462L6.05605 7.91634C5.99635 7.81298 5.93313 7.71629 5.89625
7.62127L5.88572 7.62794C5.85586 8.00136 5.64865 8.27642 5.28516
8.53981C4.90235 8.81821 4.41242 8.84988 4.17887 8.55815C3.76445
8.04303 4.49144 7.34454 5.09902 6.90611C5.22546 6.81442 5.34135
6.74107 5.44496 6.67606C5.41335 6.61771 5.37647 6.56103 5.31677
6.48935C5.12185 6.24762 4.82157 6.24596 4.48266 6.49268C4.19643
6.69939 3.99098 6.9978 3.87332 7.17617L3.72933 6.92945C3.86279 6.75107
4.09107 6.48101 4.38081 6.27096C4.91464 5.88421 5.36242 5.88754
5.65744 6.25429C5.71363 6.32264 5.79616 6.46601 5.86465
6.63605L6.11751 7.20784L6.11575 7.20951ZM5.2395 8.27809C5.81196
7.86299 5.7786 7.3062 5.54856 6.8861C5.44671 6.96112 5.34311 7.0228
5.24126 7.09782C4.8286 7.39622 4.19643 7.92634 4.50724 8.31476C4.6688
8.51647 4.99015 8.45813 5.23775 8.27809"
            fill="#ECECEC"
          />
          <path
            d="M8.6023 5.89255C8.84287 5.87921 9.10276 5.82253 9.3328
5.70584C9.66118 5.53913 10.0598 5.22406 9.8877 4.92066C9.64888 4.4939
8.57771 5.06236 8.295 4.56224C8.07725 4.17382 8.56542 3.72539 9.00618
3.502C9.25378 3.37697 9.50313 3.29029 9.76478 3.24194L9.77883
3.52534C9.55933 3.54201 9.30997 3.61536 9.10628 3.71872C8.83761
3.85542 8.49518 4.10714 8.64796 4.38054C8.83585 4.71561 9.95794
4.20216 10.2494 4.72061C10.5006 5.16571 10.0247 5.62415 9.49084
5.89421C9.20461 6.03758 8.94121 6.1326 8.63391 6.18928L8.60054
5.89588L8.6023 5.89255Z"
            fill="#ECECEC"
          />
          <path
            d="M13.1345 3.64874C13.1468 3.82711 13.1889 4.03216
13.2398 4.17886L12.8851 4.31889C12.8535 4.20387 12.8202 4.09384
12.8096 3.99548L12.7973 4.00049C12.6674 4.3539 12.3934 4.57062 11.9702
4.73732C11.5242 4.91236 11.0431 4.82401 10.8956 4.4856C10.6339 3.88713
11.526 3.38868 12.2301 3.11195C12.3776 3.05527 12.5093 3.01193 12.6252
2.97525C12.6094 2.91024 12.5901 2.84689 12.5532 2.76354C12.4303
2.48181 12.1406 2.40846 11.7455 2.56349C11.4136 2.69352 11.1344
2.93024 10.9711 3.07527L10.8973 2.80188C11.0747 2.66018 11.3679 2.4568
11.7051 2.32344C12.325 2.08005 12.7569 2.19174 12.9431 2.6185C12.9782
2.69852 13.0203 2.85689 13.0397 3.0386L13.131 3.65374L13.1345
3.64874ZM11.9983 4.46726C12.6639 4.20553 12.7815 3.66041 12.6727
3.19864C12.555 3.24531 12.4374 3.28032 12.3197 3.327C11.8403 3.51537
11.0852 3.87546 11.2819 4.32556C11.3837 4.55895 11.7104 4.58062
11.9983 4.46726Z"
            fill="#ECECEC"
          />
          <path
            d="M15.2962 3.5187L14.8519 3.6454L13.7807 1.63327L14.1547
1.52491L15.0714 3.27031L15.0819 3.26531L15.8721 1.0348L16.2865
0.916443L15.2962 3.5187Z"
            fill="#ECECEC"
          />
          <path
            d="M17.3139 1.93831C17.3139 1.99666 17.3191 2.05667
17.3314 2.11669C17.4157 2.53511 17.8547 2.70515 18.3938 2.6068C18.7714
2.53678 19.033 2.41509 19.2578 2.29839L19.2806 2.56512C19.1103 2.64514
18.8908 2.75516 18.3938 2.84685C17.6809 2.97688 17.0733 2.77183
16.9556 2.1867C16.8081 1.45487 17.2735 0.683026 18.2551
0.502985C18.9751 0.371288 19.3983 0.623012 19.4983 1.11979C19.5247
1.25149 19.5282 1.39319 19.5387 1.53322L17.3156
1.93831H17.3139ZM19.1366 1.36651C19.1313 1.30483 19.1313 1.24815
19.1208 1.19648C19.0488 0.841395 18.7924 0.644683 18.3007
0.734704C17.7142 0.841395 17.3543 1.27983 17.3332 1.69659L19.1366
1.36651Z"
            fill="#ECECEC"
          />
          <path
            d="M22.7785 1.93856C22.7539 2.08859 22.7364 2.18695
22.7346 2.29531L22.3518 2.32365C22.3588 2.18362 22.3676 2.06526
22.3922 1.98524H22.3799C22.185 2.23529 21.8074 2.417 21.4246
2.44368C20.8645 2.48368 20.4325 2.28864 20.3991 1.87188C20.3868
1.71851 20.422 1.55014 20.4536 1.40844L20.7082 0.214835L21.1103
0.186495L20.8539 1.43178C20.8223 1.57848 20.8065 1.67517 20.8171
1.82353C20.8381 2.08359 21.0576 2.2353 21.4475 2.20696C22.1165 2.15861
22.4379 1.66016 22.5432 1.14005L22.7627 0.0681347L23.1648
0.0397949L22.7785 1.9419V1.93856Z"
            fill="#ECECEC"
          />
          <path
            d="M24.4538 0.458015C24.4942 0.332986 24.5276 0.202957
24.5486 0.0629247L24.9332 0.0712602C24.9121 0.211292 24.8911 0.327985
24.8577 0.406336H24.87C25.0702 0.192954 25.3424 0.0279168 25.7462
0.036252C25.8744 0.0395861 25.978 0.0579239 26.0816 0.0745943L25.9833
0.36466C25.8797 0.331319 25.7656 0.324651 25.6549 0.322984C25.0263
0.309648 24.7646 0.796425 24.6399 1.19485L24.2975 2.28176L23.8884
2.27343L24.4556 0.459682L24.4538 0.458015Z"
            fill="#ECECEC"
          />
          <path
            d="M26.4258 2.00006L26.9245 2.04507L26.0852 2.9236L25.7146
2.89193L26.4258 2.00006Z"
            fill="#ECECEC"
          />
          <path
            d="M0.92148 8.06135L1.23581 7.77795L2.63535
10.3452L3.90144 9.21161L4.04016 9.44667L2.45624 10.8653L0.92148
8.06135Z"
            fill="#ECECEC"
          />
          <path
            d="M6.11575 7.20951C6.17546 7.37955 6.27204 7.56793 6.3616
7.69462L6.05605 7.91634C5.99635 7.81298 5.93313 7.71629 5.89625
7.62127L5.88572 7.62794C5.85586 8.00136 5.64865 8.27642 5.28516
8.53981C4.90235 8.81821 4.41242 8.84988 4.17887 8.55815C3.76445
8.04303 4.49144 7.34454 5.09902 6.90611C5.22546 6.81442 5.34135
6.74107 5.44496 6.67606C5.41335 6.61771 5.37647 6.56103 5.31677
6.48935C5.12185 6.24762 4.82157 6.24596 4.48266 6.49268C4.19643
6.69939 3.99098 6.9978 3.87332 7.17617L3.72933 6.92945C3.86279 6.75107
4.09107 6.48101 4.38081 6.27096C4.91464 5.88421 5.36242 5.88754
5.65744 6.25429C5.71363 6.32264 5.79616 6.46601 5.86465
6.63605L6.11751 7.20784L6.11575 7.20951ZM5.2395 8.27809C5.81196
7.86299 5.7786 7.3062 5.54856 6.8861C5.44671 6.96112 5.34311 7.0228
5.24126 7.09782C4.8286 7.39622 4.19643 7.92634 4.50724 8.31476C4.6688
8.51647 4.99015 8.45813 5.23775 8.27809"
            fill="#ECECEC"
          />
          <path
            d="M8.6023 5.89255C8.84287 5.87921 9.10276 5.82253 9.3328
5.70584C9.66118 5.53913 10.0598 5.22406 9.8877 4.92066C9.64888 4.4939
8.57771 5.06236 8.295 4.56224C8.07725 4.17382 8.56542 3.72539 9.00618
3.502C9.25378 3.37697 9.50313 3.29029 9.76478 3.24194L9.77883
3.52534C9.55933 3.54201 9.30997 3.61536 9.10628 3.71872C8.83761
3.85542 8.49518 4.10714 8.64796 4.38054C8.83585 4.71561 9.95794
4.20216 10.2494 4.72061C10.5006 5.16571 10.0247 5.62415 9.49084
5.89421C9.20461 6.03758 8.94121 6.1326 8.63391 6.18928L8.60054
5.89588L8.6023 5.89255Z"
            fill="#ECECEC"
          />
          <path
            d="M13.1345 3.64874C13.1468 3.82711 13.1889 4.03216
13.2398 4.17886L12.8851 4.31889C12.8535 4.20387 12.8202 4.09384
12.8096 3.99548L12.7973 4.00049C12.6674 4.3539 12.3934 4.57062 11.9702
4.73732C11.5242 4.91236 11.0431 4.82401 10.8956 4.4856C10.6339 3.88713
11.526 3.38868 12.2301 3.11195C12.3776 3.05527 12.5093 3.01193 12.6252
2.97525C12.6094 2.91024 12.5901 2.84689 12.5532 2.76354C12.4303
2.48181 12.1406 2.40846 11.7455 2.56349C11.4136 2.69352 11.1344
2.93024 10.9711 3.07527L10.8973 2.80188C11.0747 2.66018 11.3679 2.4568
11.7051 2.32344C12.325 2.08005 12.7569 2.19174 12.9431 2.6185C12.9782
2.69852 13.0203 2.85689 13.0397 3.0386L13.131 3.65374L13.1345
3.64874ZM11.9983 4.46726C12.6639 4.20553 12.7815 3.66041 12.6727
3.19864C12.555 3.24531 12.4374 3.28032 12.3197 3.327C11.8403 3.51537
11.0852 3.87546 11.2819 4.32556C11.3837 4.55895 11.7104 4.58062
11.9983 4.46726Z"
            fill="#ECECEC"
          />
          <path
            d="M15.2962 3.5187L14.8519 3.6454L13.7807 1.63327L14.1547
1.52491L15.0714 3.27031L15.0819 3.26531L15.8721 1.0348L16.2865
0.916443L15.2962 3.5187Z"
            fill="#ECECEC"
          />
          <path
            d="M17.3139 1.93831C17.3139 1.99666 17.3191 2.05667
17.3314 2.11669C17.4157 2.53511 17.8547 2.70515 18.3938 2.6068C18.7714
2.53678 19.033 2.41509 19.2578 2.29839L19.2806 2.56512C19.1103 2.64514
18.8908 2.75516 18.3938 2.84685C17.6809 2.97688 17.0733 2.77183
16.9556 2.1867C16.8081 1.45487 17.2735 0.683026 18.2551
0.502985C18.9751 0.371288 19.3983 0.623012 19.4983 1.11979C19.5247
1.25149 19.5282 1.39319 19.5387 1.53322L17.3156
1.93831H17.3139ZM19.1366 1.36651C19.1313 1.30483 19.1313 1.24815
19.1208 1.19648C19.0488 0.841395 18.7924 0.644683 18.3007
0.734704C17.7142 0.841395 17.3543 1.27983 17.3332 1.69659L19.1366
1.36651Z"
            fill="#ECECEC"
          />
          <path
            d="M22.7785 1.93856C22.7539 2.08859 22.7364 2.18695
22.7346 2.29531L22.3518 2.32365C22.3588 2.18362 22.3676 2.06526
22.3922 1.98524H22.3799C22.185 2.23529 21.8074 2.417 21.4246
2.44368C20.8645 2.48368 20.4325 2.28864 20.3991 1.87188C20.3868
1.71851 20.422 1.55014 20.4536 1.40844L20.7082 0.214835L21.1103
0.186495L20.8539 1.43178C20.8223 1.57848 20.8065 1.67517 20.8171
1.82353C20.8381 2.08359 21.0576 2.2353 21.4475 2.20696C22.1165 2.15861
22.4379 1.66016 22.5432 1.14005L22.7627 0.0681347L23.1648
0.0397949L22.7785 1.9419V1.93856Z"
            fill="#ECECEC"
          />
          <path
            d="M24.4538 0.458015C24.4942 0.332986 24.5276 0.202957
24.5486 0.0629247L24.9332 0.0712602C24.9121 0.211292 24.8911 0.327985
24.8577 0.406336H24.87C25.0702 0.192954 25.3424 0.0279168 25.7462
0.036252C25.8744 0.0395861 25.978 0.0579239 26.0816 0.0745943L25.9833
0.36466C25.8797 0.331319 25.7656 0.324651 25.6549 0.322984C25.0263
0.309648 24.7646 0.796425 24.6399 1.19485L24.2975 2.28176L23.8884
2.27343L24.4556 0.459682L24.4538 0.458015Z"
            fill="#ECECEC"
          />
          <path
            d="M26.4258 2.00006L26.9245 2.04507L26.0852 2.9236L25.7146
2.89193L26.4258 2.00006Z"
            fill="#ECECEC"
          />
        </svg>

        <svg
          class="group4"
          width="35"
          height="17"
          viewBox="0 0 35 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.528879 13.9224C0.718529 14.0624 0.950324 14.1791
1.20495 14.2375C1.56493 14.3158 2.07944 14.3292 2.16022
13.9957C2.27611 13.5273 1.08378 13.2856 1.21899 12.7388C1.32435
12.3137 1.99691 12.2804 2.48157 12.387C2.75375 12.4471 2.99959 12.5371
3.22963 12.6638L3.04525 12.8855C2.86965 12.7621 2.63259 12.6621
2.40957 12.6121C2.11456 12.5471 1.68434 12.5221 1.61058
12.8221C1.52103 13.1889 2.71336 13.5023 2.57288 14.0708C2.45347
14.5592 1.78092 14.6076 1.19617 14.4775C0.883595 14.4092 0.620193
14.3142 0.351522 14.1658L0.528879 13.9257V13.9224Z"
            fill="#ECECEC"
          />
          <path
            d="M4.33239 12.7671L4.7275 12.8271L3.71252 14.9076L3.31742
14.8476L4.33239 12.7688V12.7671ZM5.0225 12.2753L4.57296 12.207L4.74154
11.8652L5.19108 11.9336L5.0225 12.2753Z"
            fill="#ECECEC"
          />
          <path
            d="M5.78102 13.3739C5.82316 13.2672 5.86004 13.1222 5.8776
13.0055L6.25865 13.0222C6.23407 13.1589 6.20421 13.2756 6.17612
13.3522H6.18841C6.4922 13.0888 6.7398 12.9905 7.163 13.0088C7.59849
13.0272 7.91106 13.2139 7.91457 13.5356H7.92687C8.1411 13.2372 8.5081
13.0672 8.99803 13.0872C9.53011 13.1105 9.85848 13.3722 9.83917
13.774C9.83565 13.8607 9.78473 14.0274 9.72854 14.1841L9.32114
15.3627L8.92077 15.346L9.32114 14.1941C9.37031 14.0624 9.41245 13.934
9.42123 13.769C9.43353 13.5273 9.2948 13.3356 8.92604 13.3189C8.29563
13.2922 7.95145 13.784 7.81624 14.1758L7.4422 15.281L7.04183
15.2643L7.4422 14.1124C7.49137 13.9807 7.53352 13.8524 7.5423
13.6873C7.55283 13.4456 7.41762 13.2539 7.0471 13.2372C6.41669 13.2105
6.07251 13.7023 5.9373 14.0941L5.56327 15.1993L5.1629 15.1827L5.7775
13.3722L5.78102 13.3739Z"
            fill="#ECECEC"
          />
          <path
            d="M11.107 13.5723C11.1369 13.4039 11.1667 13.2139 11.172
13.0488L11.5513 13.0122C11.5531 13.1455 11.5355 13.2606 11.5197
13.3456H11.532C11.7129 13.0922 12.0816 12.9071 12.4978 12.8671C13.1967
12.7988 13.5953 13.1605 13.6498 13.6506C13.7235 14.3308 13.2775
15.1143 12.2414 15.216C11.8077 15.2593 11.4319 15.1176 11.2721
14.8276H11.2598L11.0298 16.1962L10.6312 16.2346L11.1053 13.574L11.107
13.5723ZM12.2168 14.9826C13.007 14.9059 13.2898 14.1991 13.2353
13.6923C13.1949 13.3306 12.9473 13.0588 12.417 13.1105C11.6865 13.1822
11.3195 13.8957 11.3704 14.3608C11.4073 14.7059 11.6813 15.036 12.2186
14.9826"
            fill="#ECECEC"
          />
          <path
            d="M14.9387 11.4935L15.332 11.4202L15.023 14.7826L14.6296
14.8526L14.9387 11.4935Z"
            fill="#ECECEC"
          />
          <path
            d="M16.57 13.4256C16.5735 13.4823 16.5858 13.5423 16.6016
13.6007C16.721 14.0091 17.1688 14.1441 17.6938 14.0041C18.0626 13.9074
18.3102 13.7657 18.5227 13.634L18.5683 13.8957C18.4068 13.9874 18.1978
14.1141 17.7132 14.2408C17.0178 14.4242 16.3997 14.2675 16.2346
13.6957C16.0256 12.9822 16.4225 12.1837 17.3795 11.9303C18.0802
11.7469 18.5209 11.9636 18.6632 12.4471C18.7 12.5771 18.7158 12.7155
18.7369 12.8538L16.57 13.424V13.4256ZM18.3278 12.7205C18.3172 12.6604
18.312 12.6038 18.2979 12.5538C18.1961 12.207 17.9256 12.032 17.4462
12.1587C16.8738 12.3087 16.5559 12.7688 16.5682 13.1839L18.3278
12.7205Z"
            fill="#ECECEC"
          />
          <path
            d="M19.6115 11.7369C19.5992 11.6235 19.5659 11.4768
19.5272 11.3668L19.8784 11.2234C19.9188 11.3568 19.9452 11.4735
19.9557 11.5535L19.968 11.5485C20.119 11.1851 20.2964 10.9934 20.6845
10.8333C21.0848 10.6683 21.4518 10.7066 21.6029 10.9934L21.6134
10.9884C21.6678 10.63 21.9189 10.3249 22.3685 10.1398C22.8584 9.93813
23.2728 10.0365 23.4414 10.4066C23.4783 10.4866 23.5099 10.6566 23.531
10.8217L23.7083 12.0503L23.3413 12.202L23.1692 11C23.1517 10.8617
23.1306 10.7267 23.0621 10.5766C22.9603 10.3549 22.7495 10.2382
22.4106 10.3782C21.8311 10.6166 21.7486 11.2018 21.8101
11.6102L21.9857 12.7588L21.6187 12.9105L21.4466 11.7085C21.429 11.5702
21.4079 11.4368 21.3395 11.2868C21.2376 11.0634 21.0269 10.9484 20.688
11.0884C20.1085 11.3268 20.026 11.9119 20.0874 12.3203L20.2613
13.4689L19.8943 13.6206L19.6098 11.7385L19.6115 11.7369Z"
            fill="#ECECEC"
          />
          <path
            d="M24.841 10.2698C24.862 10.3232 24.8901 10.3782 24.9235
10.4299C25.157 10.7916 25.6259 10.8033 26.0912 10.5316C26.4179 10.3415
26.6145 10.1415 26.7796 9.95811L26.899 10.1982C26.7708 10.3282 26.6057
10.5049 26.1773 10.755C25.5627 11.1134 24.9217 11.1234 24.5969
10.6183C24.1895 9.98812 24.3387 9.11459 25.1851 8.62281C25.8068
8.26273 26.2914 8.35441 26.5689 8.78284C26.6426 8.8962 26.6988 9.02623
26.7585 9.15459L24.841 10.2698ZM26.3248 9.13292C26.2967 9.07791
26.2756 9.02456 26.2475 8.97955C26.0508 8.67282 25.7383 8.57613
25.3133 8.82118C24.8076 9.11625 24.6337 9.64304 24.769 10.0365L26.3248
9.13126V9.13292Z"
            fill="#ECECEC"
          />
          <path
            d="M27.2414 7.80265C27.1746 7.66429 27.1325 7.57593 27.071
7.48425L27.3713 7.26086C27.4468 7.37922 27.5083 7.48258 27.5346
7.56093L27.5434 7.55426C27.5592 7.24586 27.7664 6.90078 28.0667
6.6774C28.5057 6.35065 28.9763 6.28731 29.2467 6.61405C29.3451 6.73241
29.4136 6.88911 29.4697 7.02414L29.9544 8.14273L29.6383
8.37778L29.1256 7.21418C29.0659 7.07582 29.0237 6.98747 28.9289
6.87244C28.7603 6.6674 28.4916 6.65906 28.1861 6.88578C27.6611 7.27586
27.6856 7.85767 27.8999 8.34111L28.3406 9.343L28.0245 9.57639L27.2396
7.80265H27.2414Z"
            fill="#ECECEC"
          />
          <path
            d="M29.814 4.62355L30.051 4.26013L30.3531 4.81859L30.9361
4.29014L31.0485 4.51019L30.4742 5.03031L31.0309 6.03387C31.1064
6.16724 31.1749 6.30226 31.2802 6.40729C31.4067 6.53232 31.5682
6.51731 31.7298 6.37061C31.8123 6.2956 31.8738 6.21557 31.923
6.11222L32.0669 6.3056C32.0125 6.40895 31.944 6.50064 31.8299
6.604C31.5191 6.88573 31.217 6.92074 31.0449 6.74737C30.9062 6.61067
30.7306 6.28393 30.6832 6.19724L30.1863 5.29537L29.7385
5.70046L29.6296 5.47707L30.0686 5.07865L29.8157 4.62522L29.814
4.62355Z"
            fill="#ECECEC"
          />
          <path
            d="M32.5304 1.24284L32.843 0.861084L34.2794
2.83653L34.0581 3.10493L32.5304 1.24284ZM34.2478 3.47168L34.5551
3.09993L34.7939 3.40167L34.4866 3.77341L34.2478 3.47168Z"
            fill="#ECECEC"
          />
          <path
            d="M0.528879 13.9224C0.718529 14.0624 0.950324 14.1791
1.20495 14.2375C1.56493 14.3158 2.07944 14.3292 2.16022
13.9957C2.27611 13.5273 1.08378 13.2856 1.21899 12.7388C1.32435
12.3137 1.99691 12.2804 2.48157 12.387C2.75375 12.4471 2.99959 12.5371
3.22963 12.6638L3.04525 12.8855C2.86965 12.7621 2.63259 12.6621
2.40957 12.6121C2.11456 12.5471 1.68434 12.5221 1.61058
12.8221C1.52103 13.1889 2.71336 13.5023 2.57288 14.0708C2.45347
14.5592 1.78092 14.6076 1.19617 14.4775C0.883595 14.4092 0.620193
14.3142 0.351522 14.1658L0.528879 13.9257V13.9224Z"
            fill="#ECECEC"
          />
          <path
            d="M4.33239 12.7671L4.7275 12.8271L3.71252 14.9076L3.31742
14.8476L4.33239 12.7688V12.7671ZM5.0225 12.2753L4.57296 12.207L4.74154
11.8652L5.19108 11.9336L5.0225 12.2753Z"
            fill="#ECECEC"
          />
          <path
            d="M5.78102 13.3739C5.82316 13.2672 5.86004 13.1222 5.8776
13.0055L6.25865 13.0222C6.23407 13.1589 6.20421 13.2756 6.17612
13.3522H6.18841C6.4922 13.0888 6.7398 12.9905 7.163 13.0088C7.59849
13.0272 7.91106 13.2139 7.91457 13.5356H7.92687C8.1411 13.2372 8.5081
13.0672 8.99803 13.0872C9.53011 13.1105 9.85848 13.3722 9.83917
13.774C9.83565 13.8607 9.78473 14.0274 9.72854 14.1841L9.32114
15.3627L8.92077 15.346L9.32114 14.1941C9.37031 14.0624 9.41245 13.934
9.42123 13.769C9.43353 13.5273 9.2948 13.3356 8.92604 13.3189C8.29563
13.2922 7.95145 13.784 7.81624 14.1758L7.4422 15.281L7.04183
15.2643L7.4422 14.1124C7.49137 13.9807 7.53352 13.8524 7.5423
13.6873C7.55283 13.4456 7.41762 13.2539 7.0471 13.2372C6.41669 13.2105
6.07251 13.7023 5.9373 14.0941L5.56327 15.1993L5.1629 15.1827L5.7775
13.3722L5.78102 13.3739Z"
            fill="#ECECEC"
          />
          <path
            d="M11.107 13.5723C11.1369 13.4039 11.1667 13.2139 11.172
13.0488L11.5513 13.0122C11.5531 13.1455 11.5355 13.2606 11.5197
13.3456H11.532C11.7129 13.0922 12.0816 12.9071 12.4978 12.8671C13.1967
12.7988 13.5953 13.1605 13.6498 13.6506C13.7235 14.3308 13.2775
15.1143 12.2414 15.216C11.8077 15.2593 11.4319 15.1176 11.2721
14.8276H11.2598L11.0298 16.1962L10.6312 16.2346L11.1053 13.574L11.107
13.5723ZM12.2168 14.9826C13.007 14.9059 13.2898 14.1991 13.2353
13.6923C13.1949 13.3306 12.9473 13.0588 12.417 13.1105C11.6865 13.1822
11.3195 13.8957 11.3704 14.3608C11.4073 14.7059 11.6813 15.036 12.2186
14.9826"
            fill="#ECECEC"
          />
          <path
            d="M14.9387 11.4935L15.332 11.4202L15.023 14.7826L14.6296
14.8526L14.9387 11.4935Z"
            fill="#ECECEC"
          />
          <path
            d="M16.57 13.4256C16.5735 13.4823 16.5858 13.5423 16.6016
13.6007C16.721 14.0091 17.1688 14.1441 17.6938 14.0041C18.0626 13.9074
18.3102 13.7657 18.5227 13.634L18.5683 13.8957C18.4068 13.9874 18.1978
14.1141 17.7132 14.2408C17.0178 14.4242 16.3997 14.2675 16.2346
13.6957C16.0256 12.9822 16.4225 12.1837 17.3795 11.9303C18.0802
11.7469 18.5209 11.9636 18.6632 12.4471C18.7 12.5771 18.7158 12.7155
18.7369 12.8538L16.57 13.424V13.4256ZM18.3278 12.7205C18.3172 12.6604
18.312 12.6038 18.2979 12.5538C18.1961 12.207 17.9256 12.032 17.4462
12.1587C16.8738 12.3087 16.5559 12.7688 16.5682 13.1839L18.3278
12.7205Z"
            fill="#ECECEC"
          />
          <path
            d="M19.6115 11.7369C19.5992 11.6235 19.5659 11.4768
19.5272 11.3668L19.8784 11.2234C19.9188 11.3568 19.9452 11.4735
19.9557 11.5535L19.968 11.5485C20.119 11.1851 20.2964 10.9934 20.6845
10.8333C21.0848 10.6683 21.4518 10.7066 21.6029 10.9934L21.6134
10.9884C21.6678 10.63 21.9189 10.3249 22.3685 10.1398C22.8584 9.93813
23.2728 10.0365 23.4414 10.4066C23.4783 10.4866 23.5099 10.6566 23.531
10.8217L23.7083 12.0503L23.3413 12.202L23.1692 11C23.1517 10.8617
23.1306 10.7267 23.0621 10.5766C22.9603 10.3549 22.7495 10.2382
22.4106 10.3782C21.8311 10.6166 21.7486 11.2018 21.8101
11.6102L21.9857 12.7588L21.6187 12.9105L21.4466 11.7085C21.429 11.5702
21.4079 11.4368 21.3395 11.2868C21.2376 11.0634 21.0269 10.9484 20.688
11.0884C20.1085 11.3268 20.026 11.9119 20.0874 12.3203L20.2613
13.4689L19.8943 13.6206L19.6098 11.7385L19.6115 11.7369Z"
            fill="#ECECEC"
          />
          <path
            d="M24.841 10.2698C24.862 10.3232 24.8901 10.3782 24.9235
10.4299C25.157 10.7916 25.6259 10.8033 26.0912 10.5316C26.4179 10.3415
26.6145 10.1415 26.7796 9.95811L26.899 10.1982C26.7708 10.3282 26.6057
10.5049 26.1773 10.755C25.5627 11.1134 24.9217 11.1234 24.5969
10.6183C24.1895 9.98812 24.3387 9.11459 25.1851 8.62281C25.8068
8.26273 26.2914 8.35441 26.5689 8.78284C26.6426 8.8962 26.6988 9.02623
26.7585 9.15459L24.841 10.2698ZM26.3248 9.13292C26.2967 9.07791
26.2756 9.02456 26.2475 8.97955C26.0508 8.67282 25.7383 8.57613
25.3133 8.82118C24.8076 9.11625 24.6337 9.64304 24.769 10.0365L26.3248
9.13126V9.13292Z"
            fill="#ECECEC"
          />
          <path
            d="M27.2414 7.80265C27.1746 7.66429 27.1325 7.57593 27.071
7.48425L27.3713 7.26086C27.4468 7.37922 27.5083 7.48258 27.5346
7.56093L27.5434 7.55426C27.5592 7.24586 27.7664 6.90078 28.0667
6.6774C28.5057 6.35065 28.9763 6.28731 29.2467 6.61405C29.3451 6.73241
29.4136 6.88911 29.4697 7.02414L29.9544 8.14273L29.6383
8.37778L29.1256 7.21418C29.0659 7.07582 29.0237 6.98747 28.9289
6.87244C28.7603 6.6674 28.4916 6.65906 28.1861 6.88578C27.6611 7.27586
27.6856 7.85767 27.8999 8.34111L28.3406 9.343L28.0245 9.57639L27.2396
7.80265H27.2414Z"
            fill="#ECECEC"
          />
          <path
            d="M29.814 4.62355L30.051 4.26013L30.3531 4.81859L30.9361
4.29014L31.0485 4.51019L30.4742 5.03031L31.0309 6.03387C31.1064
6.16724 31.1749 6.30226 31.2802 6.40729C31.4067 6.53232 31.5682
6.51731 31.7298 6.37061C31.8123 6.2956 31.8738 6.21557 31.923
6.11222L32.0669 6.3056C32.0125 6.40895 31.944 6.50064 31.8299
6.604C31.5191 6.88573 31.217 6.92074 31.0449 6.74737C30.9062 6.61067
30.7306 6.28393 30.6832 6.19724L30.1863 5.29537L29.7385
5.70046L29.6296 5.47707L30.0686 5.07865L29.8157 4.62522L29.814
4.62355Z"
            fill="#ECECEC"
          />
          <path
            d="M32.5304 1.24284L32.843 0.861084L34.2794
2.83653L34.0581 3.10493L32.5304 1.24284ZM34.2478 3.47168L34.5551
3.09993L34.7939 3.40167L34.4866 3.77341L34.2478 3.47168Z"
            fill="#ECECEC"
          />
        </svg>

        <svg
          class="group5"
          width="71"
          height="68"
          viewBox="0 0 71 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.4781 32.9077C67.2112 33.0194 66.9988 33.096 66.7986
33.1961C66.5633 33.3144 66.4597 33.2711 66.4228 33.016C66.4105 32.9377
66.3999 32.8577 66.3999 32.7776C66.3999 32.5493 66.3947 32.5826 66.637
32.6343C66.7845 32.6659 66.9601 32.5726 67.1234 32.5359C67.4957
32.4542 67.6801 32.2192 67.7732 31.8808C67.7907 31.8158 67.9329
31.7557 68.026 31.7441C68.1121 31.7324 68.2648 31.7657 68.2877
31.8174C68.386 32.0541 68.4598 32.3009 68.5195 32.5509C68.5528 32.6926
68.5212 32.8493 68.5563 32.9894C68.6125 33.2211 68.4633 33.3778
68.3913 33.5695C68.3403 33.7045 68.3632 33.9012 68.4352
34.0279C68.4808 34.1063 68.681 34.1029 68.8303 34.143C68.8004 34.3163
68.7688 34.4964 68.7372 34.6731C69.1639 34.6864 69.25 34.558 69.3782
34.0829C69.4624 33.7729 69.3307 33.5128 69.3202 33.2277C69.3097 32.986
69.2517 32.7376 69.2939 32.5059C69.3711 32.0958 69.2903 31.7574
68.9795 31.464C68.9479 31.434 68.9655 31.359 68.9655 31.3456C68.7109
31.2673 68.4896 31.2006 68.2631 31.1306C68.3737 30.9656 68.4492
30.8072 68.5686 30.6888C68.6389 30.6188 68.7934 30.5638 68.8812
30.5888C69.1112 30.6555 69.2429 30.6188 69.3167 30.3921C69.3378
30.3271 69.4256 30.2821 69.4835 30.2254C69.3044 30.167 69.2605 29.817
69.3869 29.5119C68.7653 29.1835 68.8022 29.1501 69.0129 28.58C69.0989
28.345 68.9567 28.0282 68.7793 28.0166C68.7864 27.9349 68.8145 27.8499
68.7969 27.7748C68.6845 27.3464 68.4808 26.923 68.4668 26.4929C68.4562
26.1945 68.3245 25.9561 68.2754 25.686C68.2385 25.4826 68.0717 25.2826
68.2719 25.0776C68.2771 25.0709 68.2806 25.0559 68.2771
25.0492C68.0769 24.5108 68.3122 23.8756 67.8048 23.3522C67.8258
23.4905 67.8329 23.5889 67.8574 23.6839C67.9523 24.0573 67.9259 24.099
67.4887 24.1907C67.4307 23.914 67.4536 23.5805 67.2938 23.3755C67.1322
23.1671 67.0602 22.9471 66.9654 22.727C66.6458 21.9852 66.3596 21.23
66.0171 20.4965C65.831 20.0964 65.5553 19.7313 65.32 19.3512C65.3042
19.3246 65.2726 19.2862 65.2533 19.2896C64.6808 19.3646 64.7265
18.8595 64.5596 18.5877C64.3156 18.1943 64.3788 17.7759 64.6299
17.3775C64.7581 17.1758 64.8388 16.9474 64.9407 16.7307C65.0232
16.5523 65.1216 16.4022 65.3727 16.4739C65.6045 16.5423 65.8099 16.839
65.7292 17.0474C65.6484 17.2541 65.6273 17.3925 65.9012
17.4575C65.9627 17.4725 65.9961 17.5825 66.0435 17.6492C66.0962
17.7242 66.1365 17.8592 66.1998 17.8692C66.5334 17.9209 66.5106
18.2043 66.6159 18.4027C66.8934 18.9195 67.1129 19.4729 67.4553
19.9464C68.2894 21.0983 68.5932 22.4553 69.1358 23.7189C69.4712
24.4974 69.7153 25.3126 69.9664 26.1211C70.1385 26.6763 70.2632
27.2464 70.3914 27.8115C70.4915 28.2566 70.6039 28.705 70.6407
29.1585C70.6794 29.6419 70.7707 30.1304 70.6284 30.6171C70.6126
30.6722 70.5898 30.7422 70.6109 30.7889C70.8058 31.219 70.9252 31.6574
70.9094 32.1342C70.8953 32.5759 70.934 33.0194 70.9533 33.4611C70.9621
33.6695 71.0235 33.8829 70.9902 34.0846C70.9568 34.2947 70.8409 34.493
70.7268 34.7831C70.8637 34.9731 70.7355 35.1415 70.4967
35.3999C70.3229 35.5883 70.1648 35.735 69.9471 35.735C69.5274 35.735
69.1042 35.685 68.6863 35.6233C68.3842 35.5783 68.1911 35.6616 68.0647
35.92C67.9681 36.1167 67.9049 36.2718 68.2174 36.3551C68.5019 36.4301
68.5721 36.6018 68.4808 36.9036C68.3614 37.292 68.3403 37.7071 68.2789
38.1105C68.1507 38.9407 68.0769 39.7826 67.8785 40.5978C67.7205
41.2512 67.3798 41.863 67.1796 42.5099C67.0005 43.0867 66.9215 43.6885
66.7652 44.2719C66.623 44.8054 66.4544 45.3338 66.2682 45.8556C66.1927
46.0673 65.8011 46.2474 65.6975 46.1507C65.5114 45.979 65.5606 45.7806
65.6501 45.5656C65.9223 44.9021 66.1804 44.2336 66.428 43.5634C66.7406
42.7182 67.0602 41.8747 67.3306 41.0162C67.4395 40.6694 67.4097 40.286
67.4658 39.9209C67.5484 39.3825 67.6871 38.8474 67.738 38.3056C67.7802
37.8521 67.7802 37.3837 67.7064 36.9369C67.6643 36.6802 67.436 36.4485
67.2902 36.2068C67.0058 35.7366 66.9022 35.2749 67.2622 34.7831C67.364
34.6431 67.3991 34.4414 67.4149 34.263C67.45 33.8479 67.4553 33.4295
67.4764 32.9077H67.4781Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.9886 20.3232C22.1536 20.4116 22.0922 20.5333
21.9447 20.6716C21.69 20.91 21.4301 21.1451 21.2019 21.4051C21.0368
21.5935 20.9262 21.8236 20.6592 21.9152C20.6206 21.9286 20.5802
21.9936 20.5785 22.0386C20.5574 22.422 20.2483 22.6221 19.9972
22.8505C19.7795 23.0488 19.5196 23.2039 19.2896 23.3906C19.2316
23.4373 19.2123 23.5256 19.1772 23.594C19.1368 23.674 19.1192 23.784
19.0543 23.8323C18.538 24.2108 18.3606 24.8142 17.9883 25.2877C17.6723
25.6894 17.5388 26.2162 17.2631 26.653C17.1139 26.8914 16.8627 27.0948
16.6116 27.2448C16.0567 27.5799 15.4755 27.8999 15.0646 28.38C14.8117
28.6751 14.7257 29.1035 14.5834 29.477C14.5659 29.522 14.6484 29.6087
14.6976 29.667C14.8591 29.8637 14.817 30.0404 14.6379 30.2138C14.2849
30.5572 13.9653 30.9256 13.8845 31.4291C13.7704 32.1442 13.5948
32.8544 13.5474 33.5729C13.4894 34.4348 13.5456 35.3016 13.5369
36.1668C13.5316 36.767 13.5685 37.3621 13.7107 37.9506C13.8477 38.5157
13.9425 39.0908 14.0812 39.656C14.2059 40.1611 14.3657 40.6595 14.5097
41.1613C14.5817 41.4114 14.6309 41.6714 14.7292 41.9131C14.9821
42.5416 15.2332 43.1734 15.5299 43.7836C15.8109 44.3604 16.1358
44.9222 16.4694 45.4723C16.6836 45.8274 16.94 46.1624 17.1964
46.4925C17.5213 46.9076 17.8408 47.3327 18.2131 47.7078C18.6855
48.1862 19.207 48.6197 19.711 49.0698C20.006 49.3332 20.2975 49.6016
20.6083 49.8483C21.0456 50.195 21.4951 50.5301 21.9499 50.8585C22.3538
51.1486 22.7594 51.4386 23.1844 51.6987C23.8025 52.0788 24.4312
52.4422 25.0686 52.7923C25.3601 52.954 25.6832 53.0607 25.987
53.2024C26.1608 53.2841 26.3224 53.3874 26.5665 53.5241C26.426 53.5608
26.3206 53.6241 26.2644 53.5975C25.8377 53.3957 25.4251 53.169 25.0001
52.9657C24.7543 52.8473 24.4733 52.7856 24.2415 52.6472C23.2968
52.0855 22.3415 51.5337 21.4354 50.9185C20.7945 50.4834 20.222 49.955
19.6232 49.4615C19.3282 49.2198 19.0437 48.9631 18.7575
48.7113C18.5538 48.533 18.3448 48.3563 18.1552 48.1662C17.8373 47.8478
17.523 47.5261 17.2227 47.1927C17.1297 47.091 17.1103 46.9309 17.0225
46.8226C16.7117 46.4392 16.3763 46.0741 16.0725 45.6873C15.9408 45.519
15.8618 45.3139 15.7582 45.1272C15.616 44.8705 15.4825 44.6071 15.3297
44.3554C15.1383 44.0386 14.9223 43.7335 14.7397 43.4135C14.6502
43.2568 14.6045 43.0767 14.5466 42.905C14.3885 42.4349 14.2428 41.9581
14.0724 41.493C13.9495 41.158 13.7441 40.8429 13.658 40.4995C13.5175
39.9277 13.4508 39.3425 13.3402 38.7641C13.2559 38.319 13.1277 37.8822
13.0662 37.4338C13.0048 36.972 12.9907 36.5036 12.9749 36.0368C12.9626
35.6934 12.9749 35.3483 12.9872 35.0066C13.0048 34.4981 13.0013 33.988
13.0557 33.4829C13.1224 32.8811 13.2313 32.2843 13.3384
31.6875C13.3806 31.4541 13.4894 31.229 13.521 30.9956C13.5456 30.8173
13.5333 30.6206 13.4754 30.4505C13.4034 30.2405 13.421 30.1188 13.6422
30.0054C13.7792 29.9371 13.9074 29.7987 13.9723 29.6637C14.1883
29.2002 14.3903 28.7285 14.5676 28.2517C14.6484 28.0333 14.6396
27.7882 14.7081 27.5649C14.7871 27.3065 14.9153 27.0631 15.0084
26.8097C15.0786 26.6213 15.1506 26.4296 15.177 26.2329C15.2226 25.8945
15.263 25.5644 15.5844 25.3427C15.6195 25.3177 15.6353 25.256 15.6406
25.2093C15.7161 24.5992 16.1112 24.1291 16.4185 23.6223C16.4957
23.4956 16.6187 23.3889 16.731 23.2839C17.1384 22.9038 17.3176 22.3553
17.6846 21.9853C18.0884 21.5802 18.3237 21.05 18.8119 20.72C18.9612
20.6183 19.1052 20.4666 19.1737 20.3082C19.272 20.0798 19.4722 20.0265
19.6618 19.9181C19.999 19.7247 20.2993 19.468 20.445 19.1129C20.5732
18.7995 20.7716 18.5845 21.0719 18.3994C21.3283 18.2427 21.5162
17.9827 21.7392 17.7743C21.9095 17.6143 22.0939 17.4709 22.259
17.3075C22.4732 17.0941 22.6453 16.8324 22.8894 16.6574C23.151 16.469
23.4566 16.2873 23.7709 16.2223C24.1836 16.1373 24.4399 16.5757 24.224
16.9925C24.0203 17.3825 23.8657 17.791 23.6269 18.1744C23.374 18.5828
23.0843 18.8912 22.6997 19.1563C22.6435 19.1946 22.6084 19.2646
22.5733 19.3247C22.3872 19.6431 22.2045 19.9615 21.9956
20.3215L21.9886 20.3232Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.7757 1.01048C32.716 1.23386 32.6616 1.47725 32.579
1.7123C32.5579 1.77398 32.4596 1.82566 32.3859 1.85567C31.7625 2.10573
31.1461 2.07572 30.5385 1.79732C30.463 1.76231 30.391 1.72064 30.3138
1.6873C30.2663 1.66729 30.2137 1.66229 30.168 1.64895C29.9081 2.00904
29.8291 2.03571 29.4428 1.84066C29.5165 1.77898 29.5938 1.71397
29.6728 1.64895C29.6447 1.63062 29.6166 1.61061 29.5885
1.59394C29.3796 1.65396 29.1653 1.70063 28.9669 1.78565C28.9054
1.81232 28.8703 1.94569 28.8686 2.03071C28.8633 2.34911 28.7685 2.4158
28.4541 2.34745C28.3541 2.32744 28.2311 2.36578 28.1275
2.40079C27.8553 2.49415 27.5972 2.65585 27.2899 2.49415C27.2442
2.46914 27.1635 2.49081 27.1055 2.51082C25.9466 2.90924 24.7929
3.31767 23.6286 3.70275C23.295 3.81278 22.9315 3.83612 22.5873
3.92114C22.3731 3.97448 22.1764 4.10451 21.9604 4.13952C21.7304
4.17786 21.488 4.14286 21.251 4.13952C21.2439 4.10285 21.2369 4.06784
21.2299 4.03116C21.1614 4.10118 21.049 4.16286 21.0297 4.24454C20.9349
4.64297 20.6697 4.80301 20.2588 4.83468C19.948 4.85968 19.7232 5.04139
19.4669 5.21643C19.0542 5.4965 18.5467 5.68321 18.0515 5.8049C17.9093
5.83991 17.6213 5.8049 17.4299 5.74155C17.3245 5.70821 17.2104 5.42815
17.2525 5.30812C17.4369 4.778 17.7495 4.30456 18.206 3.94781C18.3939
3.80111 18.6538 3.73776 18.8856 3.64441C19.07 3.56939 19.2632 3.51271
19.4423 3.42936C19.4809 3.41102 19.4774 3.311 19.4914 3.25765C19.9621
3.27933 20.4608 3.30433 20.9911 3.32934C21.0297 3.15263 21.049 2.96259
21.1158 2.78921C21.1561 2.68419 21.2562 2.55749 21.3581
2.52415C21.7146 2.4158 22.0798 2.31744 22.4486 2.26743C22.6593 2.23909
23.1896 2.00904 23.3178 1.834C23.3652 1.77065 23.4899 1.75565 23.5812
1.72397C23.5917 1.72064 23.6146 1.74564 23.6304 1.75731C23.9306
1.33555 24.4381 1.68896 24.8157 1.46891C25.1265 1.28721 25.5075
1.21052 25.857 1.08883C25.8763 1.08216 25.9009 1.06215 25.9149
1.06716C26.4962 1.2722 26.951 0.813764 27.476 0.800428C27.8079 0.79376
28.1451 0.625388 28.4945 0.81043C28.5964 0.863775 28.8018 0.757085
28.9511 0.703739C29.1407 0.637057 29.3234 0.547037 29.5095
0.470353C29.657 0.407005 29.808 0.346991 30.0082 0.265306C30.1434
0.388667 30.3594 0.397003 30.6404 0.318651C31.0759 0.200291 31.5307
0.185288 31.9925 0.278642C32.1646 0.31365 32.3788 0.203625 32.5597
0.130275C32.7353 0.0585923 32.8863 -0.0164248 33.0567 0.13861C33.0935
0.171951 33.1848 0.185288 33.234 0.16695C33.6871 -0.0147578 33.9803
0.115272 34.2929 0.483689C34.4562 0.677066 34.6195 0.830435 34.63
1.07549C34.6371 1.2622 34.6599 1.47725 34.5774 1.63228C34.5071 1.76231
34.2982 1.89234 34.1454 1.89901C33.8943 1.90735 33.6397 1.80232
33.3833 1.77232C32.9987 1.72731 33.004 1.38556 32.8459 1.16884C32.8003
1.1055 32.7845 1.02381 32.7792 1.01048H32.7757Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.306 46.8225C66.7634 46.4107 67.2059 46.0357 67.3025
45.6872C67.5852 44.6603 67.9751 43.6601 68.2595 42.6332C68.5317
41.6513 68.7424 40.6528 68.9461 39.6559C69.0603 39.0957 69.113 38.5256
69.1762 37.9571C69.2376 37.422 69.278 36.8836 69.3219 36.3468C69.3448
36.0784 69.7276 35.8683 69.9699 35.9967C70.0419 36.035 70.1192 36.0717
70.1999 36.0851C70.4071 36.1184 70.6319 36.1067 70.8181
36.1817C70.9111 36.2184 70.9972 36.4118 70.9849 36.5235C70.8778 37.467
70.7917 38.4156 70.6144 39.3491C70.3861 40.5561 70.1174 41.758 69.7961
42.9466C69.5327 43.9202 69.1744 44.8704 68.8461 45.8256C68.8022
45.9556 68.7249 46.1207 68.6143 46.174C68.3825 46.284 68.3509 46.4474
68.3772 46.6458C68.4562 47.2359 68.0716 47.6827 67.8346
48.1678C67.5413 48.7696 67.2042 49.3547 66.8459 49.9249C66.6317
50.2666 66.3771 50.6 66.0751 50.8734C65.7414 51.1752 65.4517 50.8034
65.1532 50.7067C64.9407 50.6367 64.8371 50.455 64.9512 50.2366C65.1848
49.7948 65.4324 49.3597 65.6729 48.9213C65.9627 48.3945 66.2524
47.8694 66.5386 47.3426C66.6914 47.0626 66.7985 46.7308 67.306
46.8258V46.8225Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60.7614 12.6964C60.8703 12.6664 61.0143 12.6247 61.225
12.5681C61.246 12.5047 61.2882 12.3713 61.3163 12.2863C61.0687 12.233
60.8703 12.1913 60.6279 12.1396C60.1889 12.3863 60.0133 12.333 59.7078
11.8646C59.6182 11.7262 59.4567 11.6295 59.3232 11.5178C58.9544
11.2044 58.6015 10.8743 58.2117 10.5876C57.6761 10.1925 57.1054
9.83743 56.5628 9.44901C56.3485 9.29564 56.1817 9.07892 55.964
8.92889C55.7427 8.77385 55.604 8.57714 55.4547 8.36876C55.3704 8.25207
55.1878 8.11704 54.9929 8.31208C54.884 8.42211 54.7734 8.40377 54.7066
8.2354C54.5872 7.932 54.4713 7.62526 54.3168 7.33686C54.1026 6.93844
54.2518 6.55002 54.3238 6.16493C54.3467 6.03657 54.5188 5.86986
54.7242 5.97655C55.0385 6.13992 55.3476 6.31496 55.6408
6.51001C56.0289 6.76506 56.4012 7.04179 56.777 7.31352C57.1089 7.55524
57.4408 7.7953 57.7639 8.04869C58.1151 8.32375 58.4575 8.60715 58.7964
8.89722C58.9562 9.03391 59.0861 9.19895 59.2442 9.33898C59.6393 9.6874
60.0537 10.0191 60.4365 10.3776C60.7456 10.666 60.9756 11.046 61.3198
11.2811C61.6938 11.5362 61.7676 11.9046 61.9379 12.2446C61.9678
12.3047 62.0134 12.3847 62.0714 12.403C62.5929 12.5681 62.8598 12.9665
63.1443 13.3732C63.3234 13.63 63.6026 13.825 63.8274 14.0567C63.8976
14.1284 63.9468 14.2234 63.9925 14.3135C64.0732 14.4718 64.0978
14.6685 64.3454 14.7002C64.3911 14.7052 64.4315 14.8069 64.4613
14.8702C64.5438 15.047 64.593 15.242 64.7001 15.402C64.9986 15.8538
64.816 16.2672 64.5737 16.6473C64.4754 16.8024 64.2155 16.9607 64.0381
16.9507C63.8309 16.939 63.5693 16.8324 63.5131 16.5423C63.4692 16.3156
63.276 16.0755 63.3234 15.8805C63.4253 15.4537 63.3146 15.3437 62.8651
15.347C62.6544 15.3487 62.4735 15.162 62.3576 14.9253C62.2435 14.6935
61.9924 14.5218 61.8045 14.3235C61.7272 14.2401 61.6376 14.1634
61.5797 14.0684C61.311 13.6316 61.0529 13.1899 60.7614
12.7014V12.6964Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M55.7199 20.4215C55.7093 20.3449 55.7041 20.3049
55.6988 20.2532C55.7093 20.2682 55.7164 20.2765 55.7216
20.2848C55.8375 20.4782 55.8674 20.7283 56.1659 20.7966C56.2397
20.8133 56.2713 20.98 56.331 21.0734C56.4978 21.3251 56.6611 21.5785
56.8402 21.8235C57.0544 22.1153 57.2862 22.3937 57.5022
22.6837C57.6181 22.8388 57.7323 22.9988 57.8148 23.1705C57.9518
23.4522 58.0571 23.7473 58.1818 24.0357C58.4979 24.7642 58.8192
25.4927 59.1353 26.2212C59.1582 26.2729 59.1617 26.3412 59.1494
26.3979C59.0405 26.883 59.1178 26.968 59.6569 26.9264C59.7218 27.1547
59.7833 27.3881 59.8518 27.6215C59.987 28.08 60.1152 28.5417 60.268
28.9952C60.354 29.2469 60.4383 29.4686 60.3786 29.7603C60.3189 30.0487
60.4594 30.3688 60.4752 30.6755C60.4945 31.0223 60.5015 31.374 60.4611
31.7175C60.426 32.0058 59.829 32.3826 59.5164 32.3709C59.0124 32.3509
58.5769 32.4726 58.1906 32.8244C57.9693 33.0261 57.6497 33.1845 57.288
33.0428C57.2283 33.0194 57.13 33.0294 57.0738 33.0594C56.7103 33.2578
56.3415 33.1895 55.9552 33.0978C55.892 32.731 55.8972 32.3559 56.122
32.0425C56.2748 31.8275 56.5031 31.6408 56.7384 31.5057C56.9895
31.3624 57.281 31.2607 57.569 31.204C58.0009 31.119 58.0361 30.7656
58.1239 30.4855C58.166 30.3538 58.0097 30.1154 57.8763 29.9937C57.5567
29.7003 57.5637 29.3602 57.957 29.1652C58.152 29.0685 58.3767 29.0285
58.5839 28.9518C58.6823 28.9151 58.7683 28.8535 58.8614
28.8051C58.7789 28.6868 58.9562 28.5617 58.8034 28.4034C58.6524 28.245
58.5594 28.0149 58.6015 27.7349C58.6472 27.4281 58.7297 27.0881
58.4557 26.7863C58.1836 26.4863 57.9658 26.1378 57.727 25.8111C57.6936
25.7661 57.6445 25.7144 57.6445 25.6644C57.6392 25.331 57.6445 24.9959
57.6497 24.6625C57.6497 24.5725 57.662 24.4825 57.6691 24.3708C57.0281
24.4441 56.9263 23.9357 56.6874 23.5739C56.5083 23.3055 56.3345
23.0338 56.1431 22.7721C56.0114 22.5904 55.8358 22.4387 55.7181
22.252C55.4354 21.8019 55.172 21.3418 54.9086 20.88C54.8384 20.7583
54.7857 20.6216 54.7506 20.4866C54.7277 20.3965 54.7225 20.2232
54.7541 20.2132C54.884 20.1715 55.0421 20.1415 55.1702 20.1748C55.3494
20.2198 55.5109 20.3265 55.7146 20.4232L55.7199 20.4215Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M46.8099 4.01447C46.7238 3.79275 46.5113 3.80942
46.2708 3.88944C46.1847 3.83943 46.0881 3.78442 46.0706
3.77442C45.5859 3.59604 45.1908 3.45101 44.7904 3.30431C44.7834
3.32265 44.7694 3.36766 44.7641 3.38266C44.6254 3.31098 44.4902
3.18261 44.3462 3.17428C44.0196 3.15427 43.9493 2.75918 43.5841
2.78086C43.2504 2.80086 42.9062 2.73418 42.5708 2.68083C42.3004
2.63749 42.0405 2.5408 41.7701 2.49913C41.2521 2.41744 40.727 2.37576
40.2108 2.28574C39.3784 2.14238 38.5513 1.97901 37.7032 1.959C37.222
1.94733 36.7409 1.944 36.2632 1.90232C36.0051 1.88065 35.682 1.85898
35.5169 1.71061C35.236 1.45555 35.0112 1.11881 34.8532
0.777066C34.7724 0.602026 34.8777 0.341967 34.9322 0.128585C34.948
0.0685711 35.0814 0.00188923 35.1622 0.000222188C35.3624 -0.0031119
35.5608 0.0318961 35.7593 0.0502336C35.8839 0.0619029 36.0174
0.0535677 36.1333 0.0902427C36.6777 0.256947 37.2607 0.0685711 37.7998
0.260281C38.0684 0.355303 38.3371 0.456993 38.6128 0.533677C38.8253
0.592024 39.0764 0.697048 39.2608 0.638701C39.6155 0.527009 39.8315
0.743725 40.0966 0.842081C40.3442 0.933768 40.5567 1.15715 40.8552
0.977111C41.2749 1.27885 41.5752 0.82541 41.9439 0.823743C42.1757
0.823743 42.4163 0.833746 42.6358 0.892092C43.0871 1.01545 43.5261
1.18383 43.9774 1.30885C44.0986 1.34219 44.2443 1.28885 44.3918
1.27385C44.6078 1.51057 44.9309 1.53057 45.2505 1.56558C45.3664
1.57892 45.4893 1.58725 45.5965 1.62559C46.1461 1.82731 46.6834
2.06569 47.2454 2.23573C47.6369 2.35409 47.8529 2.55247 47.7318
2.8442C47.665 2.8342 47.593 2.8142 47.5228 2.81253C47.3015 2.8092
47.1628 2.86588 47.2735 3.11927C47.356 3.30598 47.4262 3.49935 47.4859
3.69273C47.572 3.96613 47.5 4.04281 47.1979 4.02614C47.0891 4.01947
46.9784 4.01947 46.8064 4.01447H46.8099Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M48.5255 64.1781C48.6168 64.0781 48.7344 64.0114
48.7415 63.9347C48.7801 63.4863 49.2419 63.3896 49.4825 63.1129C49.544
63.0412 49.6651 62.9812 49.7617 62.9778C50.5326 62.9462 51.0471
62.4227 51.6617 62.0976C52.8172 61.4858 53.9621 60.8573 55.1211
60.2555C55.2616 60.1822 55.4758 60.2022 55.6479 60.2289C55.9411
60.2755 56.2309 60.3522 56.5171 60.4339C56.6102 60.4606 56.7507
60.5423 56.7559 60.6056C56.7647 60.719 56.7226 60.889 56.6365
60.9457C55.7743 61.4975 54.9051 62.0426 54.0236 62.5677C53.4125
62.9328 52.7856 63.2696 52.1587 63.6063C51.8988 63.7447 51.6231 63.858
51.3492 63.9731C50.796 64.2048 50.2481 64.4582 49.6792 64.6499C49.3174
64.7716 48.9188 64.7966 48.5378 64.8649C48.4956 64.8733 48.4482
64.8699 48.4149 64.8899C47.2998 65.5651 46.0161 65.7635 44.7676
66.0619C44.3866 66.1536 44.0037 66.2452 43.6209 66.3319C43.2557
66.4153 43.138 66.3319 43.0801 65.9768C42.9589 65.225 42.9501 65.205
43.6929 64.9083C44.0301 64.7732 44.4076 64.7332 44.7659
64.6482C44.8695 64.6232 44.9713 64.5982 45.0732 64.5682C45.7001
64.3781 46.3252 64.1798 46.9538 63.9947C47.2067 63.9197 47.4736
63.8847 47.7247 63.8064C48.1743 63.6647 48.2445 63.6847 48.5272
64.1848L48.5255 64.1781Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M61.0161 30.4637C61.0406 30.4137 61.0986 30.352 61.0863
30.317C60.937 29.9453 61.0933 29.4985 60.7966 29.1268C60.8036 29.1201
60.8457 29.0818 60.8352 29.0934C60.8176 28.9367 60.8229 28.835 60.793
28.7417C60.7193 28.5133 60.6227 28.2899 60.5454 28.0615C60.3821
27.5781 60.0906 27.088 60.0994 26.6062C60.1117 25.9994 59.7271 25.5793
59.5709 25.0642C59.5164 24.8858 59.3742 24.7308 59.2758
24.5624C59.1617 24.364 59.0563 24.1656 58.9457 23.9673C58.6261 23.3955
58.375 22.772 57.9623 22.2685C57.6498 21.8851 57.4742 21.4667 57.2512
21.0566C57.2073 20.9766 57.1142 20.9216 57.0404 20.8565C56.986 20.8099
56.914 20.7799 56.8736 20.7249C56.6717 20.4498 56.54 20.043 56.2643
19.9213C55.8955 19.7563 55.9622 19.2895 55.5636 19.2162C55.539 19.2112
55.5215 19.1712 55.5022 19.1478C55.1334 18.7111 54.7664 18.2743
54.3976 17.8375C54.2378 17.6475 54.0956 17.4391 53.9095
17.2741C53.6689 17.0623 53.4108 16.854 53.1245 16.7123C53.0174 16.6589
52.8049 16.799 52.6416 16.8523C52.6925 16.9707 52.7277 17.099 52.7979
17.2057C52.8576 17.2974 52.9437 17.4091 53.042 17.4358C53.423 17.5391
53.4564 17.9592 53.7936 18.1293C54.0341 18.2493 54.1658 18.5594
54.3643 18.7694C54.4995 18.9128 54.6558 19.0445 54.8243 19.1512C55.165
19.3679 55.2054 19.4529 54.942 19.723C54.7576 19.9113 54.5311 20.0797
54.2905 20.1881C54.1799 20.2364 53.9463 20.1581 53.8392
20.0647C53.5161 19.783 53.2281 19.4646 52.9261 19.1612C52.6609 18.8961
52.3958 18.6327 52.1324 18.3676C51.7759 18.0109 51.4265 17.6475
51.0612 17.2974C50.7469 16.9957 50.8417 16.5239 51.2526
16.3555C51.5318 16.7156 51.811 17.074 52.092 17.4374C52.5644 16.7856
52.3326 16.1955 51.8936 15.5753C51.8602 15.6704 51.8426 15.7237
51.8216 15.7787C51.7022 15.6554 51.6741 15.4386 51.5283
15.3403C51.4914 15.3753 51.4546 15.4086 51.4177 15.4436C51.3106
15.2436 51.2052 15.0436 51.0998 14.8435C51.1227 14.8102 51.1455
14.7752 51.1683 14.7418C51.3246 14.7768 51.509 14.7735 51.6319
14.8552C51.9427 15.0619 52.229 15.3053 52.5205 15.5387C53.0086 15.9304
53.5161 16.3055 53.9762 16.7256C54.4644 17.1724 54.9016 17.6658 55.367
18.1343C55.5988 18.3676 55.8428 18.591 56.0799 18.8211C56.108 18.8494
56.1203 18.8928 56.1431 18.9261C56.3784 19.2512 56.5944 19.5913
56.8561 19.8963C57.051 20.1247 57.3021 20.3081 57.5286 20.5115C57.5444
20.5248 57.562 20.5381 57.5725 20.5565C57.8605 21.0116 58.145 21.4684
58.4347 21.9201C58.5805 22.1468 58.7561 22.3569 58.886 22.5919C59.0476
22.887 59.1617 23.2071 59.3215 23.5055C59.5217 23.8772 59.7833 24.2223
59.9589 24.6041C60.2856 25.3142 60.5911 26.0361 60.858 26.7662C60.9809
27.1013 60.9757 27.4781 61.0705 27.8248C61.1214 28.0098 61.2479
28.1832 61.3673 28.3433C61.5183 28.5433 61.5604 28.7433 61.5306
28.9884C61.4972 29.2801 61.7887 29.3502 61.9942 29.4252C62.2014
29.5019 62.4419 29.4918 62.6632 29.5402C62.7773 29.5652 62.9793
29.6602 62.9723 29.6869C62.9371 29.8336 62.8704 29.9836 62.7721
30.1003C62.7247 30.1553 62.6123 30.2687 62.4683 30.107C62.398 30.0253
62.175 30.0553 62.0117 29.9953C61.8238 29.9253 61.8203 30.2454 61.8098
30.3821C61.7589 31.0722 61.9994 31.2272 62.7756 31.419C62.7475 31.5306
62.7211 31.644 62.6895 31.7724C62.2189 31.6873 61.7483 31.6023 61.2549
31.514C61.2514 31.2856 61.218 31.0789 61.2549 30.8855C61.297 30.6688
61.2795 30.5221 61.0178 30.4721L61.0161 30.4637Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.48807 21.9451C2.36339 21.7451 2.25627 21.5734
2.13862 21.3833C2.35812 21.28 2.51616 21.205 2.64084 21.1449C2.64962
20.9632 2.65137 20.8115 2.66718 20.6598C2.69528 20.3848 2.93058
20.3198 3.15359 20.2697C3.4328 20.2047 3.67689 19.9964 4.0158
20.1731C4.24584 20.2931 4.37754 20.4548 4.25813 20.6915C4.15452
20.8966 4.06672 21.1083 3.97014 21.315C3.94029 21.38 3.92449 21.485
3.87707 21.5034C3.51007 21.6284 3.44158 21.9001 3.49075
22.1635C3.24315 22.1935 2.98326 22.1552 2.84102 22.2602C2.68825
22.3719 2.65137 22.6186 2.87263 22.7837C3.04297 22.752 3.21506 22.7203
3.46968 22.6736C3.39592 23.0004 3.35378 23.2704 3.25896
23.5222C3.23964 23.5738 3.02189 23.5855 2.90248 23.5688C2.84278
23.5588 2.80239 23.4405 2.75322 23.3705C2.70932 23.4338 2.66718
23.4955 2.62328 23.5588C2.7181 23.7155 2.80415 23.8789 2.90951
24.0306C3.13955 24.3607 2.95692 24.6808 2.88492 24.9975C2.762 25.5326
2.60923 26.0627 2.48631 26.5979C2.37568 27.078 2.2791 27.5614 2.19481
28.0465C2.13511 28.3933 2.13511 28.7517 2.05433 29.0934C1.97882
29.4102 1.85239 29.7202 1.45202 29.8203C1.24656 29.8719 1.0534 29.9636
0.85146 30.032C0.41948 30.177 0.143786 29.9436 0.205246
29.5035C0.300071 28.835 0.314119 28.1465 0.493233 27.4997C0.589813
27.153 0.619666 26.8012 0.707466 26.4562C0.823363 26.0011 0.846192
25.5259 0.941016 25.0658C0.984917 24.8491 1.10784 24.6474 1.19037
24.439C1.22549 24.349 1.25183 24.2573 1.27993 24.1656C1.36597 23.8889
1.45553 23.6122 1.53455 23.3338C1.63113 22.9987 1.70488 22.657 1.81902
22.3285C1.85239 22.2335 1.98058 22.1518 2.08418 22.0985C2.22818
22.0235 2.39148 21.9818 2.48982 21.9468L2.48807 21.9451Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0946 5.86317C17.1174 5.75314 17.1297 5.69146
17.1437 5.62145C17.4194 5.94986 17.2965 6.28993 17.2368
6.58167C16.8487 6.83172 16.4887 7.06844 16.1235 7.2985C16.0445 7.34684
15.9461 7.36851 15.8619 7.41352C15.7038 7.49521 15.4984 7.4752 15.4264
7.73026C15.3912 7.85529 15.0892 7.90363 14.9189 8.00366C14.8012
8.07367 14.7011 8.17036 14.5975 8.26038C14.5589 8.29372 14.5378
8.34873 14.4974 8.37707C14.1831 8.59046 13.7827 8.74382 13.5703
9.02556C13.3262 9.34896 12.9012 9.43398 12.694 9.78239C12.5886 9.96077
12.3674 10.0775 12.1953 10.2192C11.9705 10.4042 11.7422 10.5859
11.5157 10.771C11.4595 10.8176 11.4016 10.8643 11.3559 10.9193C10.9977
11.3377 10.8238 11.3911 10.2988 11.2144C10.1127 11.151 9.92652 11.0744
9.75794 10.9743C9.3207 10.7143 9.35757 10.3975 9.75268 10.0841C10.1548
9.76572 10.4867 9.36897 10.8519 9.00555C10.8871 8.97054 10.9292 8.9322
10.9766 8.91386C11.5421 8.69381 11.823 8.16203 12.2901 7.82362C12.6993
7.52688 13.0557 7.16847 13.5053 6.90174C13.8284 6.71003 14.0795
6.40996 14.3657 6.15824C14.4044 6.1249 14.45 6.09322 14.4974
6.07655C14.9838 5.88817 15.4685 5.69146 15.9619 5.51809C16.5151
5.32471 16.7311 5.39306 17.0981 5.86317H17.0946ZM14.2323
7.31517C14.0303 7.38852 13.8705 7.44686 13.709 7.50521C13.9285 7.57523
14.1374 7.62024 14.2323 7.31517Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.027 66.0252C32.7864 65.6084 32.8988 65.4051 33.3782
65.4267C33.7241 65.4434 34.0911 65.4667 34.3124 65.8101C34.7461
65.5718 35.1991 65.5701 35.675 65.5684C36.6092 65.5651 37.5417 65.4884
38.4759 65.4484C39.0589 65.4234 39.6454 65.4251 40.2284
65.3851C40.6937 65.3534 41.1608 65.3 41.6209 65.2167C41.8615 65.1733
42.0318 65.23 42.2021 65.3734C42.4006 65.5401 42.6113 65.6935 42.8044
65.8652C42.9642 66.0069 42.8009 66.3636 42.4954 66.4453C41.8193
66.6237 41.1345 66.7737 40.4461 66.9137C40.3039 66.9421 40.1335
66.8887 39.986 66.842C39.6577 66.737 39.3679 66.8554 39.0554
66.9187C38.662 66.9987 38.2476 66.9937 37.8419 67.0071C37.5241 67.0171
37.2045 66.9954 36.8867 66.9954C36.2931 66.9954 35.6996 67.0088
35.1078 66.9954C34.7812 66.9888 34.4546 66.9387 34.128 66.9187C33.8663
66.9021 33.5941 66.9387 33.3448 66.8837C32.6898 66.737 32.6371 66.5753
33.0252 66.0252H33.027Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.28511 38.3406C1.43789 38.519 1.58715 38.7007 1.74695
38.8741C1.80665 38.9391 1.88567 39.0208 1.96469 39.0308C2.06654
39.0441 2.25443 38.9491 2.27199 38.9774C2.36506 39.1191 2.43355
39.2808 2.47394 39.4442C2.53364 39.6926 2.59686 39.946 2.60037
40.1994C2.60739 40.6328 2.95157 40.9395 3.03235 41.3496C3.11488
41.7747 3.37302 42.1715 3.42394 42.5966C3.53106 43.4668 4.02099
44.1903 4.31951 44.9855C4.3476 45.0588 4.34936 45.1422 4.34936
45.2222C4.34936 45.4739 4.32829 45.7273 4.33882 45.9807C4.35638
46.4841 4.36341 46.4841 3.83836 46.5358C3.21849 46.5975 2.95157
46.3708 2.79178 45.6306C2.7268 45.3272 2.66359 45.0438 2.43179
44.7854C2.29131 44.627 2.3036 44.3453 2.24917 44.1203C2.22985 44.0419
2.22809 43.9569 2.19473 43.8835C1.97698 43.4018 1.70656 42.9367
1.54325 42.4399C1.35184 41.8597 1.25351 41.2529 1.11478
40.6578C1.07439 40.4861 1.03225 40.3161 0.990104 40.1427C0.902303
39.7893 0.782894 39.4392 0.742506 39.0791C0.724946 38.9307 0.861915
38.7557 0.954984 38.609C1.01118 38.5223 1.12181 38.4656 1.2816
38.3373L1.28511 38.3406Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.8051 14.3034C23.0457 14.7869 22.8385 15.2253
22.2906 15.3437C21.9587 15.4153 21.6918 15.5454 21.453 15.7921C21.2159
16.0371 20.884 16.2005 20.6241 16.4289C20.2325 16.774 19.9024 17.1907
19.4775 17.4891C19.0947 17.7592 18.84 18.1193 18.5187 18.431C18.236
18.7044 17.9936 19.0145 17.732 19.3079C17.4422 19.6296 17.1437 19.9447
16.8592 20.2698C16.782 20.3581 16.7416 20.4782 16.6749 20.5765C16.4589
20.8933 16.2359 21.2067 16.0199 21.5234C15.8478 21.7751 14.9592
22.0502 14.6484 21.9435C14.4517 21.8768 14.4008 21.5634 14.5694
21.3417C15.2946 20.3798 15.9988 19.4012 16.7697 18.4727C17.1472
18.0176 17.6407 17.6442 18.1007 17.2558C18.5081 16.9107 18.9489
16.6039 19.3598 16.2622C19.7971 15.8988 20.2097 15.5054 20.6487
15.1419C21.0649 14.7969 21.5021 14.4768 21.9271 14.1417C21.957 14.1184
21.9728 14.075 21.9938 14.0417C22.2028 13.7133 22.4732 13.7216 22.6769
14.0617C22.7243 14.1401 22.763 14.2251 22.8051 14.3068V14.3034Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.0341 58.2618C35.2553 58.2218 35.4748 58.1667
35.6961 58.1467C35.9683 58.1234 36.244 58.1334 36.5179 58.1251C36.9288
58.1117 37.3397 58.0951 37.7506 58.0751C37.9491 58.0651 38.1457
58.0384 38.3442 58.02C38.7832 57.9817 39.2222 57.9517 39.6594
57.9017C40.1739 57.8417 40.692 57.7883 41.1994 57.6883C42.1038 57.5083
43.0117 57.3282 43.8984 57.0865C44.9924 56.7881 46.0899 56.4847
47.1032 55.9679C47.5826 55.7229 48.0936 55.5362 48.5712
55.2878C49.1366 54.9927 49.6827 54.6643 50.2341 54.3459C50.5046
54.1892 50.775 54.0291 51.0331 53.8541C51.4967 53.5374 51.9621 53.219
52.4028 52.8755C52.8699 52.5105 53.323 52.1287 53.7567 51.7303C54.1992
51.3235 54.6224 50.8968 55.0333 50.46C55.518 49.9432 56.0027 49.4248
56.4452 48.8763C56.9175 48.2895 57.3565 47.6794 57.7797
47.0592C58.3452 46.2324 58.8843 45.3888 59.4286 44.5503C59.5147
44.4186 59.5691 44.2703 59.6499 44.1352C59.6973 44.0585 59.7693
43.9952 59.8308 43.9252C59.8641 43.9435 59.8957 43.9618 59.9291
43.9785C59.7289 44.3886 59.541 44.8054 59.325 45.2071C58.9615 45.8873
58.6244 46.5874 58.1942 47.2293C57.6603 48.0244 57.0563 48.7813
56.4504 49.5314C56.0132 50.0749 55.5619 50.6167 55.0509
51.0935C54.2923 51.7986 53.4915 52.4671 52.6785 53.1156C52.085 53.589
51.4581 54.0308 50.8154 54.4426C50.1376 54.876 49.4422 55.2961 48.7187
55.6545C47.1488 56.4297 45.5719 57.2065 43.851 57.64C42.9045 57.8783
41.9387 58.0617 40.9712 58.2068C40.1669 58.3268 39.3486 58.3668
38.5356 58.4218C37.7945 58.4718 37.0517 58.5135 36.3089
58.5185C35.8893 58.5218 35.4696 58.4401 35.0499 58.3968C35.0446
58.3535 35.0393 58.3084 35.0358 58.2634L35.0341 58.2618Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.50545 30.9922C0.472086 30.9539 0.443989 30.9222
0.393065 30.8655C0.849629 30.6905 1.25878 30.3771 1.85231
30.7288C1.83651 30.9689 1.83475 31.294 1.7891 31.614C1.75749 31.8441
1.68198 32.0725 1.59945 32.2925C1.55906 32.4042 1.4537 32.4942 1.39224
32.6009C1.17449 32.9843 1.4976 33.2661 1.60998 33.5861C1.63632 33.6612
1.69252 33.7278 1.7329 33.7995C1.95592 34.1946 1.70656 34.5514 1.66442
34.9598C1.86285 35.1682 2.08762 35.4166 1.95065 35.7917C1.92782
35.8517 1.95592 35.93 1.96294 35.9984C2.01387 36.4368 2.0683 36.8736
2.11747 37.312C2.15259 37.6204 2.18244 37.9288 2.21054 38.2372C2.21756
38.3156 2.20527 38.3956 2.20176 38.4723C2.04899 38.4789 1.91377
38.4856 1.71534 38.4923C1.7013 38.2922 1.68549 38.0905 1.66618
37.8438C1.57837 37.9071 1.52745 37.9355 1.48882 37.9755C1.27985
38.1972 0.997134 38.2072 0.810996 38.0355C0.647687 37.8855 0.586227
37.6221 0.519498 37.4004C0.466818 37.227 0.491402 37.0319 0.451013
36.8552C0.338628 36.3818 0.126151 35.915 0.110347 35.4416C0.0962984
35.0148 0.0717142 34.5897 0.0594221 34.1629C0.043618 33.6245 0.156003
33.0827 0.205171 32.5426C0.210439 32.4792 0.145467 32.4142 0.134931
32.3475C0.110347 32.1942 -0.0336467 32.0425 0.127907 31.8791C0.157759
31.8491 0.127907 31.7491 0.101566 31.6907C-0.0652549 31.294 -0.0547189
31.2606 0.347409 31.0656C0.394821 31.0422 0.442233 31.0189 0.501938
30.9906L0.50545 30.9922Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.97397 14.3084C9.91602 14.5035 9.90373 14.7035
9.80364 14.8502C9.58062 15.1736 9.30141 15.462 9.06786 15.7788C8.74827
16.2122 8.43745 16.6506 8.14596 17.0991C7.74383 17.7159 7.35048
18.3394 6.97469 18.9712C6.66388 19.493 6.44438 20.0748 6.0721
20.5499C5.70861 21.0133 5.54354 21.5368 5.34862 22.0502C5.15195
22.5703 5.05888 23.1254 4.91489 23.6639C4.84992 23.9073 4.7586 24.144
4.69363 24.3891C4.50047 25.1076 4.3196 25.8294 4.12293 26.5479C4.03161
26.8746 3.87884 27.188 3.81562 27.5198C3.74011 27.9132 3.72431 28.3183
3.69095 28.7201C3.67514 28.9001 3.37135 29.2685 3.18873
29.2768C2.94991 29.2885 2.87089 29.1285 2.89547 28.9418C2.94464
28.6067 3.01839 28.2733 3.09039 27.9415C3.1817 27.5131 3.27477 27.0847
3.37838 26.6579C3.50481 26.1345 3.63651 25.6127 3.7805 25.0926C3.87884
24.7391 3.98947 24.3874 4.11415 24.0407C4.31082 23.4855 4.5233 22.9371
4.727 22.3853C4.7586 22.3019 4.78143 22.2169 4.80777 22.1319C4.94123
21.7018 5.06064 21.2667 5.21517 20.8433C5.2696 20.6932 5.4136 20.5765
5.5014 20.4348C5.60149 20.2748 5.69105 20.1064 5.77182 19.9381C5.9843
19.5013 6.15639 19.0479 6.40399 18.6311C6.95713 17.7009 7.52081
16.7757 8.12664 15.8771C8.50594 15.3137 8.9625 14.7969 9.39975
14.2701C9.46297 14.1934 9.60696 14.1501 9.71759 14.1417C9.78607
14.1367 9.85983 14.2301 9.97397 14.3084Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M53.7496 5.42641C53.6882 5.8215 53.6636 6.22492 53.5477
6.60501C53.4932 6.78338 53.2702 6.90008 53.0209 6.74671C52.8663
6.65169 52.682 6.59667 52.5081 6.53166C52.1394 6.39163 51.9497 6.05322
51.9883 5.67313C52.0024 5.5381 51.9532 5.37639 51.8777 5.2597C51.8373
5.19802 51.6793 5.20469 51.5739 5.17968C51.5669 5.26804 51.5564
5.35639 51.5546 5.44474C51.5546 5.5481 51.6038 5.69814 51.5511
5.74148C51.4808 5.79982 51.3158 5.81816 51.2245 5.77982C50.6713
5.55143 50.0813 5.3914 49.6002 5.02798C49.4544 4.91962 49.3649 4.74292
49.2156 4.64123C49.1085 4.56621 48.9469 4.53287 48.8082
4.53287C48.3867 4.53287 48.2428 4.43785 48.1339 4.0811C48.104 3.98441
48.0127 3.89939 47.939 3.81771C47.8231 3.68934 47.6791 3.58099 47.5825
3.44095C47.4859 3.30092 47.5281 3.18089 47.7124 3.10254C47.8038 3.0642
47.8828 2.97918 47.939 2.8975C48.0514 2.74079 48.4447 2.71746 48.7309
2.85749C49.1734 3.0742 49.6107 3.29926 50.0655 3.49263C50.4237 3.64433
50.8136 3.72769 51.1648 3.88939C51.6459 4.11111 52.1042 4.3745 52.5678
4.62789C52.8839 4.7996 53.1965 4.97797 53.5003 5.16801C53.581 5.21803
53.6232 5.32305 53.6829 5.4014C53.704 5.40974 53.7268 5.4164 53.7496
5.42474V5.42641Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.8351 12.7698C22.4259 13.0381 22.001 13.2899 21.6111
13.5816C21.2266 13.87 20.7507 14.0367 20.4381 14.4251C20.2906 14.6102
20.0658 14.7435 19.8621 14.8852C19.5144 15.127 19.1562 15.3537 18.805
15.5904C18.7295 15.6421 18.6645 15.7054 18.6013 15.7704C18.5451
15.8271 18.51 15.9255 18.445 15.9471C18.0411 16.0805 17.8866 16.4723
17.5899 16.6873C17.1122 17.0357 16.8646 17.5458 16.4449
17.9226C16.3238 18.0326 16.2412 18.1777 16.1271 18.2927C15.9199
18.5027 15.6758 18.6844 15.4967 18.9145C15.1876 19.3096 14.9119 19.728
14.6327 20.1414C14.2815 20.6616 13.9338 21.185 13.5967 21.7135C13.4773
21.9018 13.4053 22.1169 13.2894 22.3069C13.0804 22.6487 12.8275
22.9687 12.6396 23.3205C12.3481 23.8673 12.097 24.4341 11.8249
24.9892C11.7371 25.1676 11.6335 25.3393 11.5263 25.5327C11.3648
25.4226 11.2559 25.391 11.3823 25.1909C11.4965 25.0092 11.493 24.7558
11.5298 24.5324C11.6422 23.8423 11.9899 23.2421 12.3271 22.642C12.6853
22.0019 13.0523 21.3634 13.4562 20.7482C13.7775 20.2598 14.1551
19.8047 14.5133 19.3396C14.7995 18.9662 15.0858 18.5927 15.3861
18.2327C15.5933 17.9809 15.8233 17.7476 16.0446 17.5075C16.1833
17.3575 16.3167 17.2041 16.4625 17.0641C16.8629 16.6823 17.3019
16.3306 17.6689 15.9221C18.143 15.3937 18.7383 15.0136 19.2967
14.5885C19.6216 14.3401 19.9236 14.0684 20.2362 13.8083C20.2608
13.7883 20.2818 13.7616 20.3082 13.75C21.0632 13.3916 21.8201 13.0315
22.5787 12.6797C22.6402 12.6514 22.7227 12.6664 22.7964
12.6597C22.8087 12.6964 22.821 12.7314 22.8351 12.7698Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.8946 62.1777C21.1194 62.8162 20.9701 63.1796
20.4855 63.1863C20.2273 63.1896 19.9499 63.0862 19.7111
62.9745C19.3458 62.8028 19.0104 62.5761 18.6574 62.3794C18.1201 62.081
17.5792 61.7909 17.0419 61.4942C16.6696 61.2875 16.2833 61.0991
15.9339 60.8591C15.5072 60.5657 15.0804 60.2556 14.7275
59.8905C14.6502 59.8088 14.8557 59.4571 14.9645 59.2454C15.0242
59.1287 15.1665 59.052 15.2508 58.9436C15.4176 58.7286 15.6055 58.6919
15.7635 58.917C16.3413 59.7355 17.3176 60.0022 18.1324 60.4873C18.9402
60.9691 19.7936 61.3792 20.6136 61.8426C20.7541 61.921 20.8314 62.1027
20.8928 62.1794L20.8946 62.1777Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.25991 48.2878C6.28625 48.8996 6.59355 49.3731
6.90436 49.8415C7.13089 50.1816 7.39429 50.5017 7.63135
50.8351C7.77008 51.0318 7.75954 51.2502 7.62784 51.4369C7.45751
51.6769 7.28718 51.9353 7.05363 52.107C6.95353 52.1804 6.59882 52.1204
6.52331 52.0137C6.15279 51.5019 5.84724 50.9468 5.50131
50.4183C5.33097 50.1583 5.16415 49.8615 4.91304 49.6915C4.45648
49.3814 4.17376 48.968 3.98587 48.4995C3.85065 48.1645 3.81378 47.7927
3.72949 47.4393C3.68383 47.2509 3.59779 47.0625 3.81729
46.9158C4.05435 46.7575 4.27561 46.8842 4.47755 46.9759C4.73569
47.0925 4.91831 47.2909 5.03596 47.551C5.15186 47.8094 5.30815 47.9861
5.68393 47.9661C5.88061 47.9561 6.09133 48.1828 6.26342
48.2828L6.25991 48.2878Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M41.8017 3.25261C42.0633 3.3693 42.3285 3.57435 42.6129
3.60102C43.21 3.65603 43.7456 3.91776 44.3233 3.99944C44.7886 4.06446
45.2031 4.2345 45.6315 4.38453C45.7755 4.43621 45.9142 4.50122 46.0617
4.5379C46.1127 4.55124 46.1812 4.49956 46.2532 4.47288C46.3497 4.65793
46.5394 4.72461 46.8098 4.70627C46.9257 4.69794 47.0469 4.83797
47.1715 4.89798C47.4613 5.03301 47.7106 5.2564 48.0777 5.23306C48.1567
5.22806 48.2339 5.37809 48.3288 5.42143C49.1014 5.77485 49.8881
6.10159 50.6485 6.47668C50.868 6.58503 50.9558 6.83176 50.7767
7.13182C50.4219 7.00846 50.0637 6.9001 49.7195 6.76174C49.3648 6.61837
49.0382 6.37665 48.6712 6.3033C48.2638 6.22162 47.9337 5.99823 47.5825
5.8432C47.1891 5.66982 46.8028 5.53146 46.3866 5.42977C46.132 5.36809
45.8984 5.22639 45.6561 5.1197C45.4278 5.01968 45.2083 4.89798 44.973
4.8213C44.613 4.70294 44.246 4.59791 43.8755 4.51289C43.4506 4.41621
43.0168 4.34619 42.5866 4.26784C41.9263 4.14948 41.2643 4.03945
40.6076 3.91442C40.2019 3.83607 39.8033 3.72605 39.3977
3.64603C39.1782 3.60102 38.9516 3.57101 38.7269 3.57101C38.5126
3.57101 38.4635 3.43765 38.467 3.30095C38.467 3.24927 38.625 3.17926
38.7216 3.15759C38.9148 3.11257 39.115 3.0759 39.3134 3.07257C39.7594
3.06423 40.2177 3.01922 40.6444 3.10924C40.8376 3.14925 40.9956 3.2026
41.2029 3.17426C41.3398 3.15592 41.4944 3.27261 41.6454
3.31262C41.6858 3.32429 41.742 3.27595 41.8017 3.25094V3.25261Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M61.4813 55.4661C61.4848 55.5178 61.4813 55.6412
61.5042 55.7595C61.5182 55.8329 61.5621 55.9462 61.613 55.9579C61.6868
55.9762 61.7834 55.9212 61.8676 55.8912C61.8957 55.8812 61.9151
55.8512 61.9361 55.8295C62.052 55.7045 62.1978 55.5445 62.3505
55.7078C62.419 55.7812 62.3822 56.0329 62.2979 56.1296C62.0696 56.3947
61.7921 56.6214 61.534 56.8614C61.3566 57.0265 61.1828 57.1948 61.0002
57.3549C60.5454 57.7566 60.0818 58.1517 59.6305 58.5568C59.3214
58.8319 59.0229 59.1203 58.7209 59.402C58.6366 59.4804 58.5681 59.5754
58.4733 59.6387C58.2678 59.7771 58.0378 60.0238 57.8411
60.0055C57.4741 59.9705 57.1053 59.8088 56.7699 59.6404C56.4697 59.492
56.4942 59.3087 56.7559 59.0953C56.9947 58.8986 57.2265 58.6935
57.4372 58.4701C57.6479 58.2468 57.8991 58.3918 58.1291
58.3634C58.2643 58.3468 58.403 58.3768 58.54 58.3668C58.77 58.3518
58.8789 58.2384 58.8578 58.005C58.8174 57.5666 59.0106 57.2515 59.3706
56.9581C59.7534 56.6464 60.0379 56.2313 60.3926 55.8846C60.6139
55.6678 60.8808 55.4945 61.1301 55.3044C61.2846 55.1877 61.4041
55.2044 61.4831 55.4661H61.4813Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.1594 2.60244C32.1243 2.48075 32.0997 2.3974 32.0751
2.31238C32.1717 2.55743 32.2612 2.76248 32.6177 2.75081C32.8706
2.74248 32.9584 2.9792 32.9812 3.18091C32.9882 3.24259 32.8425 3.35762
32.7477 3.38262C32.4843 3.45097 32.2121 3.50432 31.9417
3.52765C31.7186 3.54599 31.4816 3.47098 31.2673 3.51432C30.7124
3.62601 30.147 3.65768 29.5921 3.79605C29.2304 3.88607 28.8195 4.00443
28.4612 3.99609C27.9028 3.98276 27.4445 4.15947 26.9563
4.33951C26.7825 4.40452 26.5524 4.32617 26.3681 4.37785C25.7377
4.55456 25.1125 4.75293 24.4909 4.95798C23.9729 5.12802 23.4601
5.31306 22.9491 5.5031C22.691 5.59979 22.5101 5.5031 22.3679
5.3214C22.194 5.09801 22.2432 4.95798 22.5189 4.85629C23.5339 4.48454
24.5488 4.11445 25.5638 3.74437C25.6042 3.72937 25.6499 3.69603
25.6832 3.70603C26.2592 3.8744 26.7052 3.39262 27.2285 3.4143C27.8782
3.44097 28.4121 3.1509 28.988 2.9742C29.039 2.95919 29.1197 2.92752
29.1391 2.94752C29.4077 3.21092 29.6395 2.96419 29.8889
2.91918C30.0223 2.89418 30.1698 2.93585 30.3103 2.94752C30.3314
2.94752 30.356 2.97086 30.37 2.96419C30.7792 2.78415 31.2129 2.78582
31.6519 2.77748C31.8152 2.77415 31.9768 2.66913 32.1594 2.60244Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.8012 29.9654C67.5624 29.3686 67.1884 28.7935
67.1199 28.1883C67.0128 27.2414 66.565 26.4163 66.3209 25.5261C66.2384
25.226 66.2261 24.9109 66.0874 24.6175C65.9803 24.3908 65.9346 24.1357
65.8275 23.909C65.6431 23.5189 65.4078 23.1488 65.234 22.7554C64.9302
22.0603 64.6562 21.3518 64.3717 20.6483C64.2646 20.3849 64.147 20.1215
64.0644 19.8498C64.0363 19.7581 64.1031 19.6397 64.1259 19.533C64.2436
19.568 64.4016 19.568 64.4701 19.643C64.586 19.7664 64.6439 19.9381
64.73 20.0881C64.9108 20.4032 65.104 20.7133 65.2726 21.035C65.406
21.2884 65.4974 21.5618 65.6291 21.8152C65.8889 22.317 66.2068 22.7938
66.421 23.3105C66.5861 23.7056 66.7072 24.1174 66.7687 24.5592C66.853
25.1576 67.1603 25.7261 67.3658 26.3096C67.4781 26.6263 67.6485 26.943
67.6713 27.2648C67.7117 27.8766 68.0172 28.41 68.1419 28.9918C68.1805
29.1685 68.1963 29.3519 68.1981 29.532C68.2016 29.7654 68.1208 29.9537
67.7977 29.9671L67.8012 29.9654Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.31282 12.6663C8.46033 12.768 8.59378 12.913 8.75885
12.9597C9.0082 13.0314 8.99767 13.1964 8.93445 13.3381C8.78694 13.6699
8.63593 13.9983 8.34267 14.26C8.13897 14.4434 8.01781 14.7068 7.84045
14.9202C7.73334 15.0485 7.59988 15.1702 7.45237 15.2519C7.3593 15.3019
7.21882 15.2736 7.09941 15.2786C7.11346 15.1535 7.11346 15.0235
7.15034 14.9051C7.17141 14.8368 7.24868 14.7818 7.34526
14.6701C7.20829 14.6101 7.09766 14.5601 6.98703 14.5101C6.95893
14.6134 6.89747 14.7184 6.90976 14.8168C6.93435 15.0085 6.9045 15.2252
6.70958 15.2286C6.55154 15.2302 6.33555 15.0752 6.24072
14.9335C6.06336 14.6701 6.03702 14.38 6.26355 14.09C6.55329 13.7199
6.80792 13.3281 7.07659 12.9447C7.23638 12.7163 7.44886 12.7197
7.68592 12.8213C7.63851 12.3146 7.89664 11.9445 8.25136
11.6144C8.37252 11.5027 8.46911 11.3593 8.60783 11.2743C8.91689
11.0859 9.46301 11.166 9.80192 11.3977C10.276 11.7211 10.3217 11.8595
9.86689 12.4012C9.68778 12.6146 9.53852 12.8313 9.22946
12.8447C9.09776 12.8513 8.95552 12.8313 8.8326 12.7863C8.67807 12.7297
8.53759 12.6363 8.39008 12.5579C8.3655 12.5946 8.33916 12.6313 8.31458
12.668L8.31282 12.6663Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.4548 63.6196C21.525 63.2662 21.5882 62.9011 21.6813
62.5444C21.6936 62.4977 21.8815 62.4344 21.9429 62.4644C22.4048
62.6844 22.8578 62.9261 23.3109 63.1629C23.3477 63.1812 23.3881
63.2095 23.4039 63.2446C23.5514 63.5546 23.7393 63.5179 24.0466
63.4129C24.2451 63.3462 24.5366 63.5046 24.7789 63.5846C25.39 63.788
25.9941 64.0031 26.6034 64.2114C26.8247 64.2881 26.7966 64.3932
26.6947 64.5615C26.6192 64.6832 26.5753 64.8499 26.5964
64.9866C26.6052 65.04 26.8299 65.0566 26.9511 65.105C27.0406 65.1417
27.1723 65.1933 27.1864 65.2583C27.2075 65.36 27.1794 65.5034 27.1109
65.5801C27.0582 65.6401 26.8896 65.6718 26.8106 65.6368C26.491 65.5001
26.1855 65.3317 25.8729 65.1783C25.8378 65.1617 25.7886 65.16 25.7482
65.1633C24.9984 65.2483 24.3645 64.8883 23.7042 64.6582C23.0475
64.4298 22.4135 64.1414 21.7726 63.8714C21.6725 63.8297 21.597 63.7347
21.4583 63.6213L21.4548 63.6196Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M40.9711 64.5799C40.3863 64.6216 39.8349 64.6766
39.2818 64.6932C38.8006 64.7082 38.3283 64.5865 37.8331
64.7416C37.4766 64.8533 37.0622 64.8049 36.6741 64.8133C36.2702
64.8233 35.8646 64.8433 35.4642 64.8149C34.4563 64.7432 33.4518
64.6482 32.4456 64.5615C32.1769 64.5399 31.9048 64.5399 31.6414
64.4899C31.032 64.3732 30.4262 64.2331 29.8204 64.0931C29.7642 64.0798
29.6852 63.9914 29.6904 63.9447C29.6992 63.8647 29.7449 63.7564
29.8116 63.7214C29.9082 63.6713 30.0381 63.648 30.1505 63.663C31.3323
63.7997 32.5123 63.9681 33.6977 64.0814C34.5072 64.1598 35.3255
64.1715 36.1403 64.1998C36.7584 64.2215 37.3783 64.2581 37.9946
64.2265C38.7076 64.1881 39.4135 64.0681 40.1247 64.0148C40.4214
63.9931 40.727 64.0398 41.0255 64.0814C41.0852 64.0898 41.1765 64.2281
41.1625 64.2881C41.1379 64.3915 41.0431 64.4782 40.9711
64.5815V64.5799Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.68655 18.8845C5.00965 19.0595 4.96048 19.5896
4.60752 19.7997C4.58118 19.8164 4.54958 19.8264 4.52148
19.8397C4.19311 19.9931 3.72776 19.9414 3.63645 19.7397C3.55918 19.573
3.83488 19.2679 4.14394 19.1129C4.28617 19.0412 4.38451 18.8911
4.55133 18.7294C4.32305 18.6544 4.1615 18.6011 3.99819 18.5477C3.83839
18.4961 3.74883 18.206 3.8419 18.0343C4.16325 17.4391 4.46704 16.834
4.81649 16.2555C4.9798 15.9855 5.18525 15.6854 5.54699 15.6454C5.78405
15.6187 6.03692 15.7088 6.27925 15.7588C6.3653 15.7771 6.44783 15.8238
6.52158 15.8705C6.80781 16.0555 6.90439 16.2489 6.68138
16.4889C6.63923 16.5339 6.59533 16.5806 6.56373 16.6323C6.29857
17.0707 6.01936 17.5042 5.77527 17.9543C5.57685 18.321 5.39422 18.6794
4.9078 18.7628C4.83054 18.7761 4.76205 18.8411 4.68655 18.8845Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.2426 65.5168C29.3058 65.0083 29.42 64.9066 29.9222
64.9566C30.4086 65.005 30.8933 65.06 31.2656 65.4201C31.32 65.4718
31.4359 65.4668 31.5219 65.4901C31.7063 65.5401 31.8872 65.6018
32.0733 65.6418C32.2524 65.6818 32.4351 65.7018 32.6212
65.7301C32.5387 65.9369 32.486 66.1669 32.3578 66.3486C32.2735 66.4703
32.0733 66.597 31.9328 66.5903C31.183 66.5553 30.4315 66.512 29.6904
66.407C29.1724 66.3319 28.6667 66.1652 28.1644 66.0152C27.671 65.8668
27.441 64.9883 27.7992 64.6516C27.8431 64.6099 27.9748 64.6166 28.0468
64.6432C28.2926 64.7366 28.542 64.8333 28.7667 64.9633C28.8879 65.0333
28.9634 65.1767 29.0582 65.2884C29.1215 65.3634 29.1812 65.4401
29.2426 65.5151V65.5168Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.9363 53.0889C64.0381 52.8689 64.0469 52.7372
63.8151 52.6588C63.5974 52.5872 63.5201 52.4421 63.6571
52.2304C63.8854 51.877 64.0855 51.5069 64.3296 51.1652C64.572 50.8234
65.6449 50.9418 65.7959 51.3285C65.8468 51.4602 65.8293 51.6703
65.7503 51.787C65.2954 52.4538 64.8196 53.1073 64.3384 53.7574C64.1014
54.0775 64.0434 54.0642 63.794 53.7658C63.7185 53.6774 63.557 53.5574
63.4815 53.5824C63.3041 53.6407 63.125 53.7541 63.0144 53.8925C62.9757
53.9425 63.1092 54.1542 63.2075 54.2542C63.4674 54.5126 63.348 55.1661
62.9828 55.2528C62.8669 55.2811 62.6439 55.1794 62.5806
55.0744C62.2101 54.4743 62.3524 53.6691 62.8827 53.179C62.9354 53.1306
62.9933 53.0839 63.0355 53.0273C63.2848 52.7055 63.3603 52.7005
63.6764 52.9589C63.7431 53.0139 63.8362 53.0389 63.9345
53.0873L63.9363 53.0889Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.2699 13.7917C45.0363 13.74 44.8274 13.7016 44.6237
13.65C44.4744 13.6116 44.3234 13.5683 44.1864 13.5033C43.3699 13.1115
42.5498 12.7431 41.6244 12.6381C41.2012 12.5897 40.7323 11.9396
40.8237 11.5445C40.8465 11.4478 40.9396 11.3678 40.9852
11.3011C41.2539 11.3044 41.5226 11.2644 41.7649 11.3211C42.0142
11.3811 42.2917 11.4911 42.4585 11.6645C42.613 11.8229 42.7869 11.7745
42.9379 11.8245C43.3611 11.9646 43.8106 12.0329 44.2444
12.1429C44.8642 12.2996 45.4508 13.1432 45.2716 13.7917H45.2699Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.90443 54.1141C9.01681 53.9908 9.12569 53.9108
9.17486 53.8074C9.26266 53.6224 9.37329 53.4873 9.60508
53.5224C9.84741 53.559 10.0827 53.604 10.2144 53.8508C10.4989 54.3892
10.3479 54.891 10.0827 55.3778C9.95453 55.6145 9.48392 55.5995 9.31358
55.3611C9.21876 55.2294 9.10988 55.0727 9.10462 54.9243C9.09759
54.6659 8.9255 54.5459 8.73585 54.5109C8.40923 54.4526 8.3109 54.2025
8.14056 54.0058C8.00711 53.8524 7.88067 53.6941 7.73492
53.5524C7.52596 53.349 7.32753 53.1173 7.43465 52.8322C7.58742 52.4254
7.82799 52.0604 8.34075 51.9803C8.3706 51.9753 8.40572 51.977 8.43382
51.987C9.19242 52.2654 9.41367 53.0722 8.87633 53.649C8.72532 53.8107
8.75868 53.9241 8.90443 54.1141Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.3629 13.4749C25.8325 13.61 25.1723 13.76 24.5261
13.9484C24.3118 14.0117 24.1029 14.1467 23.9396 14.2951C23.7552
14.4635 23.5638 14.4301 23.4303 14.3168C23.353 14.2518 23.3443 14.0301
23.3987 13.92C23.6779 13.3466 24.1889 12.9815 24.7403 12.6697C24.8773
12.5931 25.0616 12.5981 25.2214 12.553C25.7553 12.4047 26.2873 12.2513
26.8194 12.0979C27.0951 12.0179 27.7501 12.1946 27.9222 12.408C28.0205
12.5314 28.0785 12.6631 27.8783 12.7581C27.4112 12.9798 26.9423
13.2015 26.3629 13.4766V13.4749Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.5636 53.6874C24.8491 55.8363 28.5244 57.0765
32.3859 57.8851C32.3771 57.9267 32.3683 57.9667 32.3613
58.0068C31.8749 57.9801 31.3779 58.0068 30.9056 57.9167C30.1329
57.7667 29.362 57.58 28.6175 57.3366C27.6271 57.0115 26.6578 56.6248
25.6849 56.2514C25.1037 56.028 24.5207 55.8046 23.964 55.5329C23.432
55.2728 22.928 54.9594 22.4222 54.6527C22.1483 54.4876 21.8902 54.2959
21.6443 54.0942C21.5565 54.0225 21.5249 53.8908 21.467 53.7875C21.4986
53.7541 21.5302 53.7224 21.5618 53.6874H21.5636Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.6676 43.7202C12.3357 43.7702 12.125 43.6752 12.0144
43.4385C11.8722 43.1367 11.7703 42.8167 11.6298 42.5133C11.4806
42.1915 11.2786 41.8915 11.1504 41.563C10.9889 41.148 10.8712 40.7162
10.7518 40.2878C10.6359 39.8777 10.5903 39.851 10.1916 40.0027C10.0722
40.0477 9.93351 40.0477 9.80532 40.0677C9.80884 39.9343 9.76669
39.7793 9.82288 39.671C10.0319 39.2759 10.2636 38.8924 10.5095
38.5174C10.6342 38.3273 10.7922 38.3323 10.873 38.5607C11.0451 39.0558
11.2014 39.5543 11.3699 40.051C11.4788 40.3678 11.6017 40.6795 11.7141
40.9963C11.9336 41.6147 12.1514 42.2315 12.3691 42.85C12.4692 43.1317
12.5658 43.4151 12.6711 43.7202H12.6676Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37.3959 11.1127C37.3625 11.3245 37.3959 11.5578
37.2905 11.6579C37.1781 11.7629 36.934 11.7462 36.7461 11.7696C36.5951
11.7896 36.4406 11.8012 36.2896 11.7962C36.0332 11.7862 35.7786
11.7429 35.5222 11.7462C35.0884 11.7512 34.753 11.6095 34.4528
11.2995C34.3843 11.2294 34.07 11.3678 33.875 11.4228C33.8417 11.4328
33.8434 11.5312 33.8066 11.5495C33.6854 11.6095 33.5221 11.7195 33.436
11.6829C33.3131 11.6312 33.2007 11.4878 33.3482 11.3078C33.4308
11.2078 33.4694 11.0611 33.4887 10.9294C33.5414 10.5559 33.8575
10.5743 34.1191 10.5526C34.5757 10.5143 35.0358 10.4993 35.4941
10.5076C35.7698 10.5143 36.0437 10.5843 36.3177 10.631C36.5336 10.6676
36.7619 10.681 36.9586 10.761C37.1149 10.8243 37.2325 10.9744 37.3994
11.1127H37.3959Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.5362 59.2787C18.3079 59.292 18.1464 59.337 18.0076
59.3003C17.7916 59.2453 17.5282 59.1886 17.393 59.0403C16.9154 58.5268
16.278 58.2868 15.6493 58.015C15.5141 57.9567 15.414 57.8217 15.3086
57.7116C15.205 57.6016 15.1295 57.4666 15.0189 57.3666C14.9065 57.2615
14.7432 57.2032 14.6414 57.0932C14.4271 56.8564 14.2252 56.6714
13.8547 56.8231C13.7985 56.8464 13.6071 56.6981 13.5597
56.5964C13.3858 56.223 13.2453 55.8362 13.0926 55.4561C13.1329 55.4228
13.1716 55.3878 13.212 55.3544C13.3682 55.4278 13.5421 55.4811 13.6773
55.5812C14.2287 55.9829 14.7713 56.3963 15.3139 56.8081C15.8969
57.2532 16.4729 57.705 17.0576 58.1467C17.2245 58.2718 17.4194 58.3618
17.5827 58.4901C17.8953 58.7352 18.1938 58.9953 18.5344
59.2803L18.5362 59.2787Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.3831 57.2832C12.3041 57.0432 12.2356 56.8765
12.1935 56.7031C12.1496 56.5181 12.2216 56.413 12.4464 56.4264C12.7695
56.4447 13.3981 56.9515 13.428 57.2516C13.435 57.3132 13.3454 57.4216
13.277 57.4433C13.1558 57.4816 13.0188 57.4716 12.8731 57.5133C13.0891
57.6667 13.3542 57.7083 13.6071 57.7767C13.8933 57.8517 14.1585 57.92
14.3604 58.1818C14.5202 58.3901 14.8012 58.5168 14.8486
58.7319C14.6466 58.8986 14.5027 59.022 14.3534 59.142C14.1532 59.302
13.9758 59.197 13.8002 59.092C13.5702 58.9569 13.3244 58.8386 13.1136
58.6802C12.6518 58.3318 12.1988 57.9734 11.7668 57.595C11.6895 57.5266
11.6965 57.3316 11.7317 57.2132C11.744 57.1715 11.9547 57.1665 12.0741
57.1715C12.1531 57.1749 12.2286 57.2266 12.3831 57.2849V57.2832Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.9039 9.08221C15.6054 9.35561 15.2964 9.64067
14.9838 9.92241C14.9329 9.96908 14.8732 10.0041 14.8187
10.0474C14.6905 10.1508 14.5659 10.2558 14.4394 10.3608C14.4078
10.3875 14.385 10.4292 14.3499 10.4459C13.9196 10.6526 13.644 11.0193
13.3103 11.3294C12.9696 11.6495 12.6009 11.9462 12.2233
12.2246C12.0793 12.3313 11.8774 12.468 11.679 12.2796C11.5455 12.1496
11.607 11.7578 11.772 11.6111C11.9828 11.4211 12.19 11.2294 12.4025
11.0427C12.6764 10.8009 12.9591 10.5676 13.2295 10.3242C13.514 10.0674
13.7879 9.79738 14.0689 9.53898C14.1286 9.48397 14.2024 9.43729
14.2779 9.40395C14.6431 9.24058 15.0207 9.10222 15.3736
8.91551C15.6528 8.76881 15.7933 8.8855 15.9022 9.08221H15.9039Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.81235 32.9477C9.81235 32.6976 9.81586 32.4775
9.80884 32.2575C9.80182 32.0508 9.75967 31.8441 9.77548
31.6407C9.79128 31.449 9.8703 31.2639 9.91069 31.0739C9.94932 30.8855
9.99147 30.6971 9.99849 30.5071C10.0125 30.1103 9.93176 29.7186
10.0617 29.3168C10.2092 28.8584 10.2566 28.3716 10.3848 27.9065C10.513
27.4414 10.6781 26.9846 10.8572 26.5345C10.8923 26.4462 11.0697
26.4078 11.182 26.3445C11.2137 26.4645 11.2944 26.5945 11.2716
26.7046C11.1487 27.2964 10.9819 27.8798 10.8642 28.4716C10.7325
29.1435 10.6412 29.8236 10.5288 30.5004C10.4691 30.8555 10.4006
31.2089 10.3462 31.5657C10.2777 32.0041 10.225 32.4442 10.153
32.8826C10.1407 32.9543 10.0705 33.0193 10.0266 33.086C9.95283 33.0393
9.88084 32.9927 9.81235 32.9493V32.9477Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M46.406 14.2751C46.2725 14.2234 46.1742 14.1834 46.0741
14.1451C46.0565 14.1684 46.0372 14.1917 46.0196 14.2134C45.8985
13.9117 45.7668 13.6116 45.6597 13.3049C45.6017 13.1365 45.6017
13.0281 45.8809 13.0531C46.5745 13.1148 47.1558 13.4016 47.7089
13.77C47.939 13.9233 48.2006 14.0467 48.399 14.2301C48.8398 14.6335
48.8275 14.6452 48.7643 15.337C48.3393 15.3837 48.0074 15.1419 47.6404
15.0103C47.2418 14.8669 46.9328 14.6818 46.7905 14.2517C46.715 14.0234
46.5166 14.2001 46.406 14.2751Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0442 51.717C10.0301 51.7653 10.0301 51.8653 9.97922
51.9003C9.93005 51.9353 9.81415 51.9287 9.7562 51.8937C9.51738 51.757
9.32071 51.6103 9.17496 51.3452C8.96775 50.9701 8.60777 50.6734
8.33559 50.3283C7.75083 49.5848 7.13096 48.8596 6.8939 47.9294C6.87283
47.8461 6.94307 47.7427 6.96941 47.6477C7.10111 47.6927 7.29251
47.6994 7.35222 47.7894C7.72625 48.3395 8.05814 48.913 8.4269
49.4665C8.66572 49.8249 8.94317 50.1583 9.19603 50.5084C9.47524
50.8968 9.74742 51.2902 10.0442 51.717Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.8036 11.9296C43.9528 11.4028 42.102 10.881 40.2775
10.2375C40.3459 9.94747 40.5672 9.88746 40.8113 9.9558C41.6612 10.1925
42.5023 10.4543 43.3487 10.6993C43.6683 10.7927 44.0055 10.8393
44.3145 10.9577C44.7149 11.1111 45.096 11.3061 45.4788 11.4978C45.6245
11.5712 45.751 11.6829 45.8844 11.7779C45.8581 11.8296 45.83 11.8796
45.8036 11.9313V11.9296Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37.8647 9.96412C37.575 9.95245 37.287 9.94078 36.9972
9.93244C36.8673 9.92911 36.7391 9.93078 36.6109 9.93244C36.4792
9.93411 36.3458 9.94245 36.2141 9.94411C36.0894 9.94411 35.9542
9.91077 35.8435 9.94411C35.5959 10.0241 35.3694 10.0075 35.1165
9.95412C34.8812 9.9041 34.6231 9.96579 34.3755 9.95412C34.1121 9.94411
33.8505 9.89577 33.5871 9.88243C33.1902 9.86243 32.7916 9.86076
32.3578 9.85076C32.3666 9.79408 32.3596 9.68739 32.3877
9.68072C32.6511 9.6007 32.9198 9.53402 33.1884 9.47067C33.2341 9.46067
33.3061 9.51568 33.3377 9.49735C33.7539 9.26229 34.2227 9.38899
34.6635 9.31897C34.9216 9.27896 35.1903 9.28063 35.4555 9.2873C35.5152
9.28896 35.5731 9.38565 35.6363 9.36398C35.97 9.38899 36.3036 9.40732
36.6337 9.44233C36.9288 9.47234 37.2273 9.49735 37.5118 9.56903C37.661
9.60737 37.7839 9.73907 37.9191 9.82909C37.9016 9.87243 37.884 9.91744
37.8665 9.96245L37.8647 9.96412Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.50825 38.0788C3.9016 38.3872 3.89808 38.8457 4.02276
39.2508C4.06139 39.3741 4.06315 39.5091 4.11583 39.6242C4.19836
39.8042 4.27738 39.9676 4.24577 40.181C4.2247 40.3293 4.30548 40.4927
4.34411 40.6494C4.43718 41.0262 4.55835 41.3979 4.61103
41.7797C4.63034 41.923 4.4881 42.0864 4.39855 42.2898C4.30548 42.1898
4.21241 42.1281 4.1808 42.0447C3.99291 41.5763 3.84365 41.0928 3.63468
40.6327C3.42045 40.161 3.40991 39.6575 3.31509 39.1674C3.24309 38.8006
3.25714 38.4272 3.50649 38.0771L3.50825 38.0788Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.686 63.3563C28.7686 63.5963 28.5736 63.7414 28.3524
63.688C27.9292 63.588 27.5113 63.4646 27.0881 63.3646C26.5981 63.2496
26.0977 63.1746 25.6165 63.0362C25.0195 62.8662 24.375 62.7878 23.8904
62.3594C23.8482 62.3227 23.8148 62.1994 23.8289 62.191C23.9501 62.1127
24.1063 61.9743 24.2117 62.001C24.6525 62.111 25.0721 62.2894 25.5112
62.4077C26.3821 62.6411 27.1723 63.1262 28.1171 63.1429C28.3278
63.1462 28.5333 63.2963 28.6878 63.3563H28.686Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.8699 6.61501C18.8699 6.61501 18.9138 6.64835
18.9805 6.69836C19.0016 6.59333 18.9893 6.48498 19.035 6.4533C19.3756
6.21825 19.7813 6.1299 20.1834 6.04821C20.2413 6.03654 20.3608 6.12656
20.3871 6.19158C20.4117 6.25659 20.3801 6.38829 20.3256
6.42496C19.9059 6.70002 19.4564 6.93508 19.0525 7.23015C18.4625
7.66024 17.7109 7.85529 17.2034 8.39875C17.1648 8.44042 17.142 8.4971
17.0875 8.58212C16.9629 8.31206 16.8505 8.06534 16.7451
7.83695C17.1191 7.59023 17.451 7.36351 17.7935 7.15013C18.1236 6.94508
18.5521 6.89674 18.8699 6.61334V6.61501Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M52.3993 60.5122C52.1658 60.6956 51.9515 60.9123
51.6916 61.0574C51.0911 61.3891 50.4694 61.6825 49.8601 61.9992C49.609
62.1293 49.3825 62.3093 49.1208 62.4127C48.9154 62.4943 48.6748
62.5077 48.4483 62.5144C48.3815 62.516 48.2692 62.401 48.2551
62.326C48.2446 62.2643 48.3306 62.1509 48.4044 62.1176C49.616 61.5541
50.8312 60.999 52.0499 60.4489C52.1394 60.4089 52.2571 60.4205 52.3607
60.4089C52.373 60.4439 52.387 60.4806 52.3993 60.5156V60.5122Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.1675 3.47098C34.6776 3.10423 34.012 3.54433 33.4888
3.23259C33.5485 3.16091 33.5941 3.09423 33.6538 3.04088C33.7363
2.96753 33.7855 2.81917 33.9594 2.92586C34.0015 2.95253 34.1069
2.88918 34.1824 2.86418C34.4967 2.75748 34.7987 2.56577 35.1535
2.74248C35.1798 2.75582 35.2237 2.76249 35.2465 2.75082C35.6697
2.49743 36.0947 2.75082 36.5109 2.73581C36.9288 2.72081 37.1834
2.88918 37.4398 3.13257C37.4609 3.15257 37.4696 3.18425 37.5276
3.29094C37.3046 3.30761 37.1219 3.33095 36.9376 3.33095C36.7268
3.33095 36.5179 3.30928 36.3072 3.29761C36.0613 3.28594 35.8137
3.27427 35.5679 3.26593C35.3782 3.25927 35.2114 3.28927 35.1657
3.47265L35.1675 3.47098Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.26944 36.6852C3.0833 36.4601 2.99726 36.2501 3.0236
35.97C3.04116 35.7866 2.94809 35.5716 2.84624 35.4032C2.6004 34.9881
2.59688 34.5664 2.71629 34.1246C2.72683 34.0896 2.72683 34.0379
2.70576 34.0129C2.4687 33.7178 2.65659 33.4228 2.70927 33.1327C2.72332
33.051 2.81287 32.9827 2.86731 32.9077C2.95336 32.966 3.06223 33.0077
3.12018 33.0844C3.41519 33.4694 3.32212 33.9312 3.37831 34.363C3.42572
34.7197 3.42046 35.0831 3.4907 35.4349C3.54864 35.7266 3.46611 36.4901
3.26944 36.6868V36.6852Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M46.7993 12.1096C46.8959 12.138 46.9925 12.168 47.0891
12.198C47.4087 12.298 47.7336 12.388 48.0479 12.503C48.2375 12.5731
48.4114 12.6814 48.5905 12.7781C48.8521 12.9198 49.112 13.0665 49.3719
13.2115C49.4457 13.2532 49.5177 13.2949 49.5844 13.3432C49.7776
13.4866 49.9532 13.655 50.1621 13.7733C50.3992 13.9067 50.4659 14.1367
50.2921 14.3435C50.1551 14.3035 50.0146 14.2818 49.8952
14.2234C49.6529 14.1051 49.4158 13.9717 49.1858 13.8333C49.0084
13.7267 48.8504 13.5883 48.6695 13.4833C48.0935 13.1482 47.507 12.8248
46.9346 12.483C46.8468 12.4314 46.8099 12.3047 46.7484 12.213C46.766
12.178 46.7835 12.143 46.8011 12.1096H46.7993Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.5874 11.0426C39.6383 11.1677 39.7366 11.4127
39.8315 11.6511C39.3977 12.0395 39.0658 12.0979 38.5689 11.8845C38.539
11.8711 38.5109 11.8445 38.4828 11.8461C38.2247 11.8645 37.9982
11.8378 37.8928 11.5611C37.7611 11.2143 37.8226 10.9093 38.0544
10.6625C38.539 10.8009 39.0518 10.7392 39.5856 11.0443L39.5874
11.0426Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.1835 11.5861C24.9474 11.3094 25.7095 11.0343
26.4751 10.7576C26.5647 10.7259 26.6736 10.6676 26.7473
10.6926C26.8685 10.7309 26.9703 10.8293 27.0792 10.901C27.0072 10.986
26.9545 11.116 26.8614 11.1494C26.3364 11.3427 25.792 11.4911 25.2758
11.7028C24.9913 11.8178 24.7244 11.9979 24.4926 12.1946C24.2625
12.3896 24.0325 12.3646 23.7937 12.2863C23.7182 12.2613 23.655 12.1463
23.6251 12.0612C23.5759 11.9129 23.6146 11.7862 23.7954
11.7245C23.9254 11.6811 24.0483 11.6178 24.173 11.5628C24.1765 11.5711
24.18 11.5778 24.1835 11.5861Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.3006 35.7066C63.1145 35.7733 62.9301 35.89 62.7405
35.9C62.1768 35.93 61.9994 36.1417 62.0258 36.6852C62.0416 37.0119
62.0258 37.367 61.7325 37.7354C61.6517 37.562 61.5288 37.4287 61.5569
37.3353C61.6763 36.9369 61.5587 36.5518 61.5604 36.1634C61.5604
35.7099 61.441 35.2165 61.7325 34.7881C61.7782 34.7214 61.8449 34.6697
61.9063 34.6047C62.0679 34.9398 62.1381 35.3182 62.3752
35.5049C62.5684 35.6599 62.9617 35.5882 63.2655 35.6166C63.276 35.6466
63.2883 35.6766 63.2989 35.7083L63.3006 35.7066Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.6228 11.4544C28.9688 11.3477 29.3007 11.1544
29.6887 11.3227C29.9188 11.4227 30.2155 11.9445 30.1172
12.1613C30.0312 12.3546 29.8275 12.3246 29.7168 12.2313C29.5606
12.0962 29.4622 12.1562 29.3323 12.2379C28.7879 12.583 28.3594 12.433
28.1645 11.8378C28.1083 11.6645 28.1645 11.5661 28.3489 11.5278C28.442
11.5078 28.5333 11.4811 28.6246 11.4561L28.6228 11.4544Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M62.9441 50.8301C63.0618 50.8618 63.1847 50.8617
63.2426 50.9201C63.29 50.9684 63.3006 51.1118 63.2584 51.1685C62.844
51.742 62.4261 52.3137 61.9853 52.8689C61.8027 53.0989 61.5709 53.2956
61.3426 53.4873C61.2706 53.549 61.1407 53.549 61.0371 53.5774C61.0441
53.474 61.0107 53.3456 61.0652 53.274C61.2039 53.0856 61.3935 52.9306
61.5393 52.7455C61.7219 52.5121 61.8624 52.2537 62.0573 52.022C62.261
51.7803 62.391 51.4819 62.5736 51.2218C62.6702 51.0851 62.8089 50.9734
62.9459 50.8334L62.9441 50.8301Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4041 53.0289C10.4287 52.9222 10.4585 52.7922
10.4902 52.6622C10.6236 52.6972 10.7939 52.6938 10.8853
52.7722C11.3155 53.1423 11.7281 53.5307 12.1391 53.9208C12.2918
54.0642 12.4341 54.2242 12.5587 54.3909C12.6026 54.4476 12.6079
54.6109 12.5886 54.6176C12.4727 54.6576 12.2989 54.7243 12.2286
54.6743C11.9722 54.4943 11.751 54.2709 11.5157 54.0625C11.2013 53.7858
10.8853 53.5107 10.5727 53.2323C10.52 53.1856 10.4814 53.1223 10.4041
53.0289Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M50.206 15.2154C50.206 15.2154 50.2412 15.182 50.2657
15.1587C50.6222 15.4788 50.4326 15.8638 50.3992 16.2223C50.3922
16.2906 50.1375 16.4206 50.0761 16.389C49.7512 16.2156 49.3473 16.1439
49.2086 15.7155C49.1085 15.4054 49.1928 15.1787 49.393 14.9736C49.4457
14.917 49.6107 14.9103 49.6985 14.942C49.8654 15.0036 50.0146 15.1087
50.2043 15.2137L50.206 15.2154Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60.9317 40.7861C60.9194 40.6994 60.886 40.6094 60.8983
40.5244C60.9861 39.8376 61.081 39.1524 61.1775 38.4656C61.1898 38.3756
61.2004 38.2739 61.2513 38.2038C61.3075 38.1288 61.4093 38.0855
61.4919 38.0288C61.5428 38.0955 61.6236 38.1572 61.6376
38.2322C61.7693 38.9023 61.6622 39.5492 61.4023 40.176C61.3444 40.316
61.2899 40.456 61.2162 40.5894C61.1688 40.6761 61.0915 40.7494 61.0283
40.8278C60.9949 40.8128 60.9633 40.7994 60.9299 40.7844L60.9317
40.7861Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.5121 55.6196C11.5121 55.8296 11.4946 56.0063
11.5209 56.1764C11.5648 56.4531 11.4472 56.7332 11.2241
56.8049C11.0275 56.8682 10.6183 56.6998 10.5024 56.5081C10.3268
56.2164 10.4023 55.778 10.664 55.5729C10.9063 55.3829 11.254 55.4162
11.5104 55.6196H11.5121Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M59.0615 55.8646C58.8491 56.1246 58.6717 56.388 58.4469
56.6048C58.1432 56.8965 57.8499 57.2232 57.3916 57.3082C57.309 57.3249
57.216 57.2882 57.1264 57.2766C57.144 57.2049 57.137 57.1065 57.1844
57.0615C57.5847 56.6731 57.9974 56.298 58.4013 55.9146C58.5892 55.7362
58.7911 55.7529 59.0615 55.8646Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.17292 30.4154C3.48373 31.0106 3.32218 31.5724
3.05702 32.1208C3.02014 32.1975 2.85859 32.2809 2.77957 32.2608C2.7023
32.2425 2.60924 32.1008 2.60748 32.0125C2.5987 31.6457 2.56709 31.264
2.65665 30.9139C2.70582 30.7205 2.75674 30.3754 3.17292 30.4154Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M44.8326 63.1162C45.1943 63.0545 45.4735 62.9895
45.7598 62.9678C45.8651 62.9595 45.9793 63.0495 46.0899
63.0929C46.0443 63.1779 46.0126 63.2746 45.9477 63.3429C45.7264
63.5746 45.4402 63.683 45.1153 63.7213C44.9485 63.7413 44.7852 63.803
44.6184 63.8197C44.5253 63.8297 44.3866 63.8164 44.3392
63.7597C44.2935 63.7063 44.3023 63.548 44.3532 63.4963C44.5095 63.3412
44.7009 63.2162 44.8326 63.1162Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M64.644 48.7813C64.5492 48.7663 64.4368 48.778 64.3981
48.733C64.3472 48.6746 64.3156 48.5529 64.3472 48.4879C64.5843 47.9811
64.8372 47.4794 65.0865 46.9793C65.1128 46.9259 65.1567 46.8759
65.2006 46.8359C65.2779 46.7642 65.3622 46.6959 65.443 46.6275C65.4605
46.7392 65.5185 46.8659 65.4851 46.9609C65.3587 47.3227 65.2024
47.6761 65.0567 48.0312C64.9829 48.2095 64.9127 48.3896 64.8249
48.5629C64.7862 48.6396 64.7125 48.7013 64.644 48.783V48.7813Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.3245 11.9662C32.0681 11.9696 31.8012 11.9962
31.5395 11.9679C31.3077 11.9445 31.0443 11.3444 31.1655
11.1544C31.2551 11.011 31.3762 10.9226 31.5606 11.041C31.8381 11.216
32.1173 11.3878 32.3947 11.5611C32.4737 11.6111 32.551 11.6645 32.6265
11.7178C32.5334 11.7928 32.4404 11.8712 32.3227 11.9662H32.3245Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M55.3598 58.5668C55.0789 58.8452 54.7962 59.1236
54.5152 59.4037C54.3484 59.572 54.1921 59.7521 54.0165 59.9104C53.9357
59.9821 53.8251 60.0521 53.7197 60.0638C53.6319 60.0738 53.5318
60.0005 53.437 59.9638C53.4774 59.8788 53.4914 59.7671 53.5599
59.7137C54.0341 59.3403 54.5152 58.9752 55.0034 58.6185C55.0894
58.5551 55.2123 58.5385 55.3177 58.5001C55.3318 58.5218 55.3458
58.5451 55.3598 58.5668Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M43.5261 64.0014C43.1696 64.1097 42.8922 64.2181
42.6042 64.2731C42.4883 64.2931 42.346 64.1964 42.2178 64.1547C42.2969
64.0331 42.3478 63.8463 42.4602 63.8013C42.7306 63.6946 43.0274 63.633
43.3206 63.5996C43.4067 63.5913 43.5349 63.723 43.5963 63.818C43.6262
63.863 43.5401 63.9747 43.5278 64.003L43.5261 64.0014Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M54.531 8.86387C54.603 9.04558 54.5819 9.21895 54.3343
9.18061C54.0533 9.1356 53.7759 9.03725 53.516 8.92222C53.4528 8.89388
53.4106 8.67883 53.4563 8.60715C53.509 8.52713 53.6776 8.47045 53.7882
8.48045C54.0814 8.51046 54.401 8.53046 54.531 8.86221V8.86387Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.7862 54.6652C29.9275 54.7318 29.1356 54.4105 28.319
54.2307C28.3155 54.194 28.3102 54.1574 28.3067 54.1208C28.4595 54.1041
28.6333 54.0342 28.7615 54.0792C29.3515 54.2839 29.9662 54.3672
30.5772 54.4721C30.658 54.4854 30.7353 54.517 30.8143 54.5403C30.8038
54.5819 30.7932 54.6236 30.7845 54.6652H30.7862Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.4767 60.2655C20.4504 60.3506 20.4504 60.4489
20.4082 60.4689C20.3117 60.5156 20.1589 60.5756 20.0939 60.5356C19.82
60.3689 19.5566 60.1822 19.316 59.9738C19.1913 59.8671 19.2738 59.7588
19.4319 59.7654C19.5548 59.7704 19.6883 59.8004 19.7954
59.8555C20.0254 59.9755 20.2414 60.1205 20.4785 60.2639L20.4767
60.2655Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.8183 61.5854C22.0272 61.2125 22.1537 61.1609
22.5523 61.324C22.7297 61.3956 22.8736 61.5388 23.0352 61.6503C22.8368
61.6703 22.6366 61.7153 22.4382 61.7053C22.2415 61.6953 22.0483 61.632
21.8183 61.5854Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.8468 49.3348C64.0276 49.3665 64.1628 49.3548
64.2173 49.4115C64.2612 49.4565 64.2208 49.5915 64.1927
49.6782C64.1576 49.7832 64.1207 49.9016 64.0417 49.9733C63.9556
50.0533 63.8204 50.0883 63.708 50.1416C63.6606 50.0383 63.5517 49.9166
63.5781 49.8316C63.6308 49.6549 63.7537 49.4965 63.8468
49.3331V49.3348Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.2663 54.0668C27.6816 54.1401 27.1477 53.9936
26.6771 53.6523C26.8194 53.4975 26.8123 53.5124 27.448 53.7688C27.7062
53.872 28.0047 53.8887 28.2856 53.9453C28.2786 53.9852 28.2733 54.0269
28.2663 54.0685V54.0668Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.6722 48.668C16.1445 48.6813 16.1919 48.728 16.3833
49.3815C16.0216 49.2364 15.832 48.9947 15.6722 48.668Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.45233 45.7939C6.44533 45.9119 6.47686 46.0498
6.42255 46.0979C6.34545 46.1661 6.20352 46.1661 6.07912
46.1312C6.18425 46.0365 6.28938 45.9401 6.45233 45.7939Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.5685 45.1788C13.6317 45.3353 13.6949 45.4935
13.7862 45.7199C13.6387 45.6217 13.5456 45.5601 13.4491
45.4935C13.4666 45.3903 13.4824 45.2954 13.5 45.2005C13.5228 45.1938
13.5456 45.1855 13.5685 45.1788Z"
            fill="#ECECEC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.234 7.31519C14.1392 7.61899 13.9302 7.57559 13.7107
7.50548C13.8705 7.44706 14.032 7.38863 14.234 7.31519Z"
            fill="#ECECEC"
          />
        </svg>
      </div>
    </div>
    <img class="image-1" src="image-1.png" />
    <svg
      class="vector131"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7895 0L37.8424 5.30299C38.3459 5.45078 38.786 5.74602
39.0984 6.14562C39.4108 6.54522 39.5792 7.02825 39.5789
7.52419V11.6294H44.5263C45.1824 11.6294 45.8116 11.8744 46.2755
12.3106C46.7394 12.7468 47 13.3384 47
13.9552V18.607H14.8421V13.9552C14.8421 13.3384 15.1027 12.7468 15.5666
12.3106C16.0305 11.8744 16.6597 11.6294 17.3158
11.6294H34.6316V9.23371L19.7895 4.87037L4.94737
9.23371V26.4545C4.94701 27.8784 5.2943 29.2835 5.96248 30.5613C6.63066
31.8392 7.60189 32.9558 8.80137 33.8251L9.26889 34.1415L19.7895
40.8865L29.1449 34.8881H17.3158C16.6597 34.8881 16.0305 34.643 15.5666
34.2068C15.1027 33.7706 14.8421 33.1791 14.8421
32.5622V23.2587H47V32.5622C47 33.1791 46.7394 33.7706 46.2755
34.2068C45.8116 34.643 45.1824 34.8881 44.5263 34.8881L36.5611
34.8904C35.6037 36.0766 34.4411 37.1232 33.0979 37.9838L19.7895
46.5174L6.48105 37.9861C4.48361 36.7056 2.84907 34.9857 1.71956
32.976C0.590043 30.9663 -0.000250393 28.7275 7.9677e-08
26.4545V7.52419C0.000298342 7.02865 0.16892 6.54614 0.481286
6.14701C0.793651 5.74788 1.23343 5.45298 1.73653 5.30531L19.7895 0Z"
        fill="white"
      />
    </svg>

    <svg
      class="ri-customer-service-2-fill"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 16C43.0609 16 44.0783 16.4214 44.8284 17.1716C45.5786
17.9217 46 18.9391 46 20V28C46 29.0608 45.5786 30.0783 44.8284
30.8284C44.0783 31.5786 43.0609 32 42 32H39.876C39.3884 35.8666
37.5065 39.4223 34.5835 42C31.6605 44.5776 27.8972 45.9999 24
46V42C27.1826 42 30.2348 40.7357 32.4853 38.4853C34.7357 36.2348 36
33.1826 36 30V18C36 14.8174 34.7357 11.7651 32.4853 9.5147C30.2348
7.26427 27.1826 5.99998 24 5.99998C20.8174 5.99998 17.7652 7.26427
15.5147 9.5147C13.2643 11.7651 12 14.8174 12 18V32H6C4.93913 32
3.92172 31.5786 3.17157 30.8284C2.42143 30.0783 2 29.0608 2 28V20C2
18.9391 2.42143 17.9217 3.17157 17.1716C3.92172 16.4214 4.93913 16 6
16H8.124C8.61206 12.1338 10.4942 8.57853 13.4171 6.00134C16.3401
3.42414 20.1031 2.00214 24 2.00214C27.8969 2.00214 31.6599 3.42414
34.5829 6.00134C37.5058 8.57853 39.3879 12.1338 39.876 16H42ZM15.52
31.57L17.64 28.178C19.5462 29.3721 21.7507 30.0036 24 30C26.2493
30.0036 28.4538 29.3721 30.36 28.178L32.48 31.57C29.9385 33.1623
26.9991 34.0046 24 34C21.0009 34.0047 18.0614 33.1624 15.52 31.57Z"
        fill="white"
      />
    </svg>

    <div class="icon-park-solid-local">
      <div class="mask-group">
        <div class="group6">
          <svg
            class="group7"
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.858 28.757C2.238 29.843 0 31.343 0 33C0 36.314
8.954 39 20 39C31.046 39 40 36.314 40 33C40 31.343 37.761 29.843
34.142 28.757"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 31C20 31 33 22.504 33 12.682C33 5.678 27.18 0 20
0C12.82 0 7 5.678 7 12.682C7 22.504 20 31 20 31Z"
              fill="white"
              stroke="white"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M20 18C21.3261 18 22.5979 17.4732 23.5355
16.5355C24.4732 15.5979 25 14.3261 25 13C25 11.6739 24.4732 10.4021
23.5355 9.46447C22.5979 8.52678 21.3261 8 20 8C18.6739 8 17.4021
8.52678 16.4645 9.46447C15.5268 10.4021 15 11.6739 15 13C15 14.3261
15.5268 15.5979 16.4645 16.5355C17.4021 17.4732 18.6739 18 20 18Z"
              fill="black"
              stroke="black"
              stroke-width="4"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <svg
          class="vector136"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H48V48H0V0Z" fill="white" />
        </svg>
      </div>
    </div>
  </div>
  <div class="frame-7">
    <div class="tes-informations-personnelles">
      Tes informations personnelles
    </div>
    <div class="frame-6"></div>
  </div>
  <div class="promos">
    <div class="bon-de-commande">BON DE COMMANDE</div>
  </div>
  <div class="akar-icons-arrow-back">
    <svg
      class="group8"
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.3333 29.0417L30.875 20.0833L22.3333 11.125"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30.875 20.0833L17.2083 20.0833C7.77321 20.0833 0.124999
12.062 0.124999 2.16667V0.375002"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</div>
</body>
            `
        };

        // Envoyez l'e-mail
        await sgMail.send(msg);

        return res.status(200).send("E-mail de bienvenue envoyé avec succès");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur du serveur lors de l'envoi de l'e-mail de bienvenue");
    }
}
module.exports = {sendWelcomeEmail}
