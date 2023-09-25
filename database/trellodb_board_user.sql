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
-- Table structure for table `board_user`
--

DROP TABLE IF EXISTS `board_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_user` (
  `board_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `permission` enum('read','write') NOT NULL DEFAULT 'read',
  PRIMARY KEY (`board_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `board_user_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`) ON DELETE CASCADE,
  CONSTRAINT `board_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_user`
--

LOCK TABLES `board_user` WRITE;
/*!40000 ALTER TABLE `board_user` DISABLE KEYS */;
INSERT INTO `board_user` VALUES ('board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','7ec4d1302c','read'),('board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','a78482c8f6','write'),('board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','fe5b2169cd','write'),('board-id-b59f51b9-11bc-48b2-9e5a-b78fc193a401','dBvX4SUq0S2a0FOhOr03z','read'),('board-id-b59f51b9-11bc-48b2-9e5a-b78fc193a401','fe5b2169cd','write'),('board-id-c7cf2a5e-4123-4e67-a53a-9bbc9ab52d7e','dBvX4SUq0S2a0FOhOr03z','read'),('board-id-c7cf2a5e-4123-4e67-a53a-9bbc9ab52d7e','fe5b2169cd','write'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','2HIrE6EJnLS2Sw_LbZWyc','write'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','702d840b48','write'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','7bb5a74a5b','write'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','80a6e7d8f5','read'),('board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','f02191e84b','read'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','702d840b48','write'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','b1b0a38ad4','write'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','dBvX4SUq0S2a0FOhOr03z','read'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','f02191e84b','write'),('board-id-e60679d4-c979-4601-8730-46ea4b547582','fe5b2169cd','read'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','702d840b48','write'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','7ec4d1302c','read'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','b1b0a38ad4','write'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','e518ba61ce','read'),('board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','fe5b2169cd','write');
/*!40000 ALTER TABLE `board_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16  9:01:32
