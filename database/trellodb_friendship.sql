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
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `requester_id` varchar(50) NOT NULL,
  `requested_id` varchar(50) NOT NULL,
  `status_id` int NOT NULL,
  `friendship_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`requester_id`,`requested_id`),
  UNIQUE KEY `UC_Friendship` (`requester_id`,`requested_id`),
  UNIQUE KEY `id` (`id`),
  KEY `requested_id` (`requested_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`requested_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `friendship_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `friendship_status` (`status_id`),
  CONSTRAINT `Check_User_Self_Friendship` CHECK ((`requester_id` <> `requested_id`))
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES ('19830ceff6','628230e47d',2,'2023-07-08 14:52:08',33),('2HIrE6EJnLS2Sw_LbZWyc','072434e6c2',1,'2023-07-09 11:53:13',17),('2HIrE6EJnLS2Sw_LbZWyc','1b5e4d4477',1,'2023-07-09 11:43:25',15),('2HIrE6EJnLS2Sw_LbZWyc','4b833f399d',1,'2023-07-09 11:41:43',11),('2HIrE6EJnLS2Sw_LbZWyc','628230e47d',2,'2023-07-09 11:41:44',12),('2HIrE6EJnLS2Sw_LbZWyc','66af630a8e',1,'2023-07-09 11:41:45',13),('2HIrE6EJnLS2Sw_LbZWyc','702d840b48',2,'2023-07-09 11:41:46',14),('2HIrE6EJnLS2Sw_LbZWyc','7bb5a74a5b',1,'2023-07-09 11:48:57',16),('2HIrE6EJnLS2Sw_LbZWyc','80a6e7d8f5',1,'2023-07-09 12:12:30',21),('2HIrE6EJnLS2Sw_LbZWyc','b1b0a38ad4',1,'2023-07-14 02:43:44',51),('2HIrE6EJnLS2Sw_LbZWyc','dBvX4SUq0S2a0FOhOr03z',1,'2023-07-09 11:53:22',18),('2HIrE6EJnLS2Sw_LbZWyc','e8a8c3d48b',1,'2023-07-09 11:53:34',19),('2HIrE6EJnLS2Sw_LbZWyc','fe5b2169cd',3,'2023-07-14 02:49:04',53),('2HIrE6EJnLS2Sw_LbZWyc','mzaKfaMmmk1Dlp86hl_Oo',1,'2023-07-14 02:43:45',52),('3f8d751c8f','823867eee8',1,'2023-08-15 01:37:08',55),('fe5b2169cd','072434e6c2',1,'2023-07-08 14:51:47',1),('fe5b2169cd','1b5e4d4477',1,'2023-07-08 14:51:50',2),('fe5b2169cd','3f8d751c8f',1,'2023-08-15 01:36:49',54),('fe5b2169cd','4b833f399d',1,'2023-07-08 14:52:07',3),('fe5b2169cd','628230e47d',2,'2023-07-08 14:52:08',5),('fe5b2169cd','66af630a8e',1,'2023-07-08 14:52:08',6),('fe5b2169cd','702d840b48',1,'2023-07-12 01:34:38',46),('fe5b2169cd','777da82347',1,'2023-07-11 04:32:50',40),('fe5b2169cd','79bb438cdc',2,'2023-07-11 14:04:04',47),('fe5b2169cd','7bb5a74a5b',1,'2023-07-09 12:56:24',22),('fe5b2169cd','80a6e7d8f5',1,'2023-07-11 14:04:02',44),('fe5b2169cd','879d1b0fe8',2,'2023-07-11 14:04:01',49),('fe5b2169cd','98468945dc',2,'2023-07-11 14:04:09',50),('fe5b2169cd','mzaKfaMmmk1Dlp86hl_Oo',2,'2023-07-11 10:14:07',43);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
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
