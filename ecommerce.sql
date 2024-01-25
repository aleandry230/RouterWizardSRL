-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 25, 2024 alle 09:28
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `evidenza`
--

CREATE TABLE `evidenza` (
  `id` bigint(20) NOT NULL,
  `idProdotto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `evidenza`
--

INSERT INTO `evidenza` (`id`, `idProdotto`) VALUES
(1, 5),
(2, 1),
(3, 9),
(4, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `immagine`
--

CREATE TABLE `immagine` (
  `id` bigint(20) NOT NULL,
  `path` varchar(256) NOT NULL,
  `idProdotto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `immagine`
--

INSERT INTO `immagine` (`id`, `path`, `idProdotto`) VALUES
(1, 'photo1_1706127151068antennaMIMO.png', 1),
(2, 'photo1_1706127202413antennaParabolica(1).png', 2),
(3, 'photo2_1706127202415antennaParabolica.jpg', 2),
(4, 'photo1_1706127283204usb311.jpg', 3),
(5, 'photo1_1706127319228usb300.jpg', 4),
(6, 'photo2_1706127383382router1200(2).jpg', 5),
(7, 'photo1_1706127383382router1200.jpg', 5),
(8, 'photo3_1706127383384router1200(1).jpg', 5),
(9, 'photo3_1706127439455router1750.jpg', 6),
(10, 'photo2_1706127439455router1750(1).jpg', 6),
(11, 'photo1_1706127439455router1750(2).jpg', 6),
(12, 'photo1_1706127841907ModuloSFP1.jpg', 7),
(13, 'photo2_1706127841909ModuloSFP2.jpg', 7),
(14, 'photo3_1706127841910ModuloSFP3.jpg', 7),
(15, 'photo4_1706127841910ModuloSFP4.jpg', 7),
(16, 'photo2_1706127896624RouterArcher2.jpg', 8),
(17, 'photo1_1706127896624RouterArcher1.jpg', 8),
(18, 'photo3_1706127896624RouterArcher3.jpg', 8),
(19, 'photo5_1706127896635RouterArcher5.jpg', 8),
(20, 'photo4_1706127896625RouterArcher4.webp', 8),
(21, 'photo2_1706127955887TEG1024F2.jpg', 9),
(22, 'photo3_1706127955889TEG1024F3.png', 9),
(23, 'photo1_1706127955887TEG1024F1.jpg', 9),
(24, 'photo1_1706128005869KitAvvioNano1.jpg', 10),
(25, 'photo3_1706128005870KitAvvioNano3.jpg', 10),
(26, 'photo2_1706128005870KitAvvioNano2.jpeg', 10),
(27, 'photo4_1706128068445TPLinkM7350Router4.jpg', 11),
(28, 'photo2_1706128068444TPLinkM7350Router2.jpg', 11),
(29, 'photo1_1706128068444TPLinkM7350Router1.jpg', 11),
(30, 'photo3_1706128068444TPLinkM7350Router3.jpg', 11);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotto`
--

CREATE TABLE `prodotto` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prodotto`
--

INSERT INTO `prodotto` (`id`, `title`, `description`, `price`) VALUES
(1, 'MIMO 5GHz 12dBi a 360 Gradi Tenda ANT12-5G360', 'Descrizione: La Tenda ANT12-5G360 è un\'antenna MIMO ad alto guadagno progettata per le frequenze 5GHz. Con un guadagno di 12dBi e copertura a 360 gradi, migliora il raggio e la stabilità della tua rete wireless, ideale per applicazioni avanzate.', 144.99),
(2, 'Antenna Parabolica 30dBi Frequenza 5GHz IP-COM ANT30-5G', 'La IP-COM ANT30-5G è un\'antenna parabolica potente con guadagno di 30dBi progettata per le frequenze 5GHz. Fornisce un guadagno eccezionale per comunicazioni punto-punto a lunga distanza, ideale per collegamenti wireless in ambienti sfidanti.', 154.99),
(3, 'Adattatore USB WiFi Nano 150Mbps Tenda W311MI con Installazione Automatica', ' Il Tenda W311MI è un adattatore USB WiFi compatto e facile da installare, che offre una soluzione comoda per aggiungere connettività wireless al tuo dispositivo. Con una velocità di trasferimento dati di 150Mbps, assicura una connessione wireless affidabile e stabile.', 9.99),
(4, 'Adattatore USB Wireless 300Mbps ad Alto Guadagno Tenda U1', 'l Tenda U1 è un adattatore USB wireless ad alto guadagno, che offre una soluzione rapida e affidabile per aggiungere connettività wireless al tuo desktop o laptop. Con una velocità di trasferimento dati di 300Mbps, migliora la ricezione Wi-Fi, adatto per attività online impegnative.', 14.99),
(5, 'Router Wireless Dual Band 1200Mbps Tenda AC6', 'Il Tenda AC6 è un router wireless ricco di funzionalità, con supporto dual-band e una velocità di trasferimento dati di 1200Mbps. Ideale per gaming e streaming, fornisce una connessione internet stabile e veloce per un\'esperienza online senza interruzioni.', 44.99),
(6, 'Router Access Point Wireless AC1750 Dual Band Gigabit Tenda', 'Il Tenda AC1750 è un router dual-band versatile con velocità gigabit, che offre una connessione wireless affidabile e ad alte prestazioni. Dotato di antenne multiple, assicura una copertura ampia, rendendolo adatto a case e uffici con esigenze di rete avanzate.', 164.99),
(7, 'Modulo SFP Mini-GBIC 1000Base-SX Multimodale LC TL-SM311LM', 'Il TL-SM311LM è un modulo mini-GBIC progettato per connessioni in fibra ottica ad alte prestazioni. Con compatibilità 1000Base-SX e connettori LC, assicura una trasmissione dati affidabile e veloce su distanze brevi in ambienti di rete.', 24.99),
(8, 'Router Archer MR200 4G LTE Wi-Fi Dual-Band AC750 con Slot SIM', 'L\'Archer MR200 è un router ad alte prestazioni progettato per una connessione 4G LTE veloce e affidabile. Con Wi-Fi dual-band AC750, assicura un\'esperienza online fluida per utenti domestici e aziendali. Dotato di uno slot SIM, consente una facile configurazione e gestione delle connessioni broadband mobili.', 119.99),
(9, 'Switch Tenda TEG1024F 24 Porte Gigabit Unmanaged con 2xSFP', 'Il Tenda TEG1024F è uno switch non gestito affidabile ed efficiente con 24 porte Ethernet Gigabit e 2 porte SFP per connessioni in fibra ad alta velocità. Questo switch è ideale per espandere la capacità di rete in piccole e medie imprese senza compromettere le prestazioni.', 109.99),
(10, 'Kit di Avvio Nano Powerline, 1 Porta Ethernet, 600 Mbps (2 Pezzi)', 'Il Kit di Avvio Nano offre una soluzione comoda per estendere la tua rete utilizzando la tecnologia powerline. Con un tasso di trasferimento dati di 600 Mbps, questo kit include due adattatori con porte Ethernet, offrendo un\'alternativa affidabile e facile da installare per la rete domestica.', 49.99),
(11, 'Router Mobile Hotspot 4G LTE 150Mbps con Scheda SIM TP-Link M7350', 'Il TP-Link M7350 è un potente router mobile che supporta reti 4G LTE, fornendo un hotspot Wi-Fi rapido e sicuro in movimento. Con una velocità massima di 150Mbps, può ospitare più dispositivi, rendendolo perfetto per la condivisione dell\'accesso a Internet durante i viaggi.', 109.99);

-- --------------------------------------------------------

--
-- Struttura della tabella `sconto`
--

CREATE TABLE `sconto` (
  `id` bigint(20) NOT NULL,
  `percentuale` double NOT NULL,
  `idProdotto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `sconto`
--

INSERT INTO `sconto` (`id`, `percentuale`, `idProdotto`) VALUES
(1, 0, 1),
(2, 0, 2),
(3, 0, 3),
(4, 0, 4),
(5, 0, 5),
(6, 0, 6),
(7, 0, 7),
(8, 0, 8),
(9, 0, 9),
(10, 0, 10),
(11, 0, 11);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `cognome` varchar(64) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `password` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `nome`, `cognome`, `mail`, `password`) VALUES
(0, 'Andrea', 'Braia', 'andrix.braia@gmail.com', '$2b$10$Zm1Q3/XT7i.7W13yY9OVuuUIlgKKH4g4XGsPXF1gr2WmWIONzHCgy');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `evidenza`
--
ALTER TABLE `evidenza`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `immagine`
--
ALTER TABLE `immagine`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `prodotto`
--
ALTER TABLE `prodotto`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `sconto`
--
ALTER TABLE `sconto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `evidenza`
--
ALTER TABLE `evidenza`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `immagine`
--
ALTER TABLE `immagine`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT per la tabella `prodotto`
--
ALTER TABLE `prodotto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `sconto`
--
ALTER TABLE `sconto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
