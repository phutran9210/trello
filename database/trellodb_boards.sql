-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: trellodb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `board_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description_board` text,
  `type_board` enum('public','private') DEFAULT 'public',
  `owner_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `boards_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES ('board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Đây là Board thứ 2','đây là mô tả thứ 2','public','fe5b2169cd'),('board-id-b59f51b9-11bc-48b2-9e5a-b78fc193a401','Boartd ngày 15','không mô tả','public','fe5b2169cd'),('board-id-c7cf2a5e-4123-4e67-a53a-9bbc9ab52d7e','Boartd ngày 15','không mô tả','public','fe5b2169cd'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','Ekko\'s Board','Not yet!!!!','public','702d840b48'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','Alex\'s Board','Nothing to comment','public','702d840b48'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','Đây là board','không mô tả','public','fe5b2169cd');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16  9:01:31
