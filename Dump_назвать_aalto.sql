-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aalto
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'музыка'),(3,'проза'),(2,'стихи');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `iditem` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `item_img` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`iditem`),
  UNIQUE KEY `iditem_UNIQUE` (`iditem`),
  UNIQUE KEY `item_name_UNIQUE` (`item_name`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (2,'Птицы СССР Определитель По Голосам',1,'pticy_sssr_opredelitel_po_golosam_various_artists_1_lp_melodiya_sssr_0503_1.jpg','2023-05-08 17:41:51'),(3,'Демьян Бедный \"Страницы Русской Поэзии XVIII-XX Веков\"',2,'stranicy_russkoy_poezii_xviii-xx_vekov_bednyy_demyan_1_melodiya_sssr_1.jpg','2023-05-08 17:49:12'),(4,'Пушкину Посвящется',2,'pushkinu_posvyashchetsya_various_artists_1_lp_melodiya_sssr_1.jpg','2023-05-08 17:49:12'),(5,'Ираклий Андроников \"Тагильская Находка\"',3,'tagilskaya_nahodka_andronikov_irakliy_1_lp_melodiya_sssr_1.jpg','2023-05-08 17:56:33'),(6,'Николай Гумилев \"Шестое Чувство\"',2,'shestoe_chuvstvo_gumilev_nikolay_1_lp_melodiya_sssr_1.jpg','2023-05-08 17:56:33'),(7,'Андрей Вознесенский \"Стихотворения\"',2,'stihotvoreniya_voznesenskiy_andrey_1_lp_melodiya_sssr_2_0_0.jpg','2023-05-08 17:56:33'),(8,'Карцев/Ильченко/Жванецкий',3,'karcevilchenkozhvaneckiy_various_artists_1_lp_melodiya_sssr_2_0.jpg','2023-05-08 17:56:33'),(9,'Федор Достоевский \"Идиот\"',3,'idiot_dostoevskiy_fedor_3_lp_melodiya_sssr_1602_1.jpg','2023-05-08 17:56:33'),(10,'Владимир Маяковский \"Страницы Русской Поэзии XVIII-XX Веков\"',2,'stranicy_russkoy_poezii_xviii-xx_vekov_mayakovskiy_vladimir_2_lp_melodiya_sssr_1.jpg','2023-05-08 17:56:33'),(11,'Николай Рубцов \"Песни и стихи\"',1,'stihi_i_pesni_rubcov_nikolay_2_lp_melodiya_sssr_2404_1.jpg','2023-05-08 17:56:33');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserves`
--

DROP TABLE IF EXISTS `reserves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserves` (
  `reserve_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `useremail` varchar(100) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reserve_id`),
  UNIQUE KEY `order_id_UNIQUE` (`reserve_id`),
  KEY `user_email_idx` (`useremail`),
  KEY `iditem_idx` (`item_id`),
  CONSTRAINT `iditem` FOREIGN KEY (`item_id`) REFERENCES `collection` (`iditem`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserves`
--

LOCK TABLES `reserves` WRITE;
/*!40000 ALTER TABLE `reserves` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `patronymic` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `pass` varchar(32) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,NULL,'admin','admin22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 23:08:02
