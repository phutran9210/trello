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
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('072434e6c2',1),('0ad0189c8c',1),('0ad955c851',1),('0df512332e',1),('150820ec0d',1),('19830ceff6',1),('1b5e4d4477',1),('23d51a7d07',1),('2aab0ca95c',1),('2da1a9b274',1),('2HIrE6EJnLS2Sw_LbZWyc',1),('37c22b3c83',1),('3f8d751c8f',1),('4563f741b5',1),('48aacfef93',1),('4a975e8a8d',1),('4b833f399d',1),('58cbb50cf7',1),('5af20d2056',1),('5e3fe7cf1f',1),('628230e47d',1),('66adaf9138',1),('66af630a8e',1),('689093391e',1),('6bcd15570b',1),('6e10d033ff',1),('6e50cdd54c',1),('6e74c45587',1),('702d840b48',1),('75270c2ba6',1),('777da82347',1),('79bb438cdc',1),('7bb5a74a5b',1),('7ec4d1302c',1),('80a6e7d8f5',1),('823867eee8',1),('879d1b0fe8',1),('8d673def90',1),('95d070bd72',1),('98468945dc',1),('987cbd9ed6',1),('9e34cdfb7f',1),('a48921ab79',1),('a56b73488b',1),('a78482c8f6',1),('b1b0a38ad4',1),('c457bc40cb',1),('c843b30070',1),('cbb2f295e9',1),('d0251083b2',1),('da2e7eadb7',1),('dBvX4SUq0S2a0FOhOr03z',1),('dc18c0ebcb',1),('e340773c0c',1),('e482e08342',1),('e518ba61ce',1),('e8a8c3d48b',1),('e939443a1f',1),('ebcae8a7b6',1),('ee4648e9eb',1),('eeede98d87',1),('f02191e84b',1),('f5526d8e84',1),('f8accc9685',1),('f960500bac',1),('fe5b2169cd',1),('HtXjhQ1kAOLChAqgODDTv',1),('iMOCHulum7IvCVlH8o8c6',1),('mzaKfaMmmk1Dlp86hl_Oo',1),('072434e6c2',3),('f5526d8e84',3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
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
