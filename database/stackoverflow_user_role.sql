-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: stackoverflow
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
  KEY `IDX_d0e5815877f7395a198a4cb0a4` (`user_id`),
  KEY `IDX_32a6fc2fcb019d8e3a8ace0f55` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('ff87a0a6-19d4-4293-9d56-1e85ba466b49',1),('1eda0b1f-e17d-417a-a3d8-2a3b9a741aed',2),('2bab0693-5d53-4d67-9e22-f9021ae91726',2),('2e53114b-e9dc-4de2-922f-eb92e12dcfeb',2),('37e7d117-781c-4605-b427-a55b4fa6baa5',2),('446a163f-92b2-49cf-81be-d5ff0c8d279e',2),('4adb9635-b5f6-4680-99c7-118bbf53cb34',2),('4af5155e-b9e5-4e6b-bdf4-7b2d8dc833f6',2),('55ba6bef-7480-49f4-9a3e-47f2173049a0',2),('57560bb4-acae-4555-8529-f77eebb8dd3a',2),('57cabbc1-6e10-4a8d-add9-b381546aecf3',2),('65e6abc0-b998-47f0-8afc-a4e26219d4d7',2),('7edd2653-b369-42b1-8ff9-93ace28e3f43',2),('91d50a21-55e1-497b-86d2-67c6ae2f44fb',2),('94f447ab-4f5f-48da-a38d-09810995a379',2),('a5fb5af0-7550-43af-94e1-3b2a4b3254ce',2),('ac659d83-7745-4315-a7ca-e5d92957b717',2),('daa742fb-e33d-40b1-9279-dd92ad57f487',2),('f0c833a6-0b54-4172-acdb-f8d487da1229',2),('f3ed720f-85da-4dc0-ad00-aeae7aaa8fda',2),('1eda0b1f-e17d-417a-a3d8-2a3b9a741aed',3),('91d50a21-55e1-497b-86d2-67c6ae2f44fb',3),('daa742fb-e33d-40b1-9279-dd92ad57f487',3),('ff87a0a6-19d4-4293-9d56-1e85ba466b49',3);
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

-- Dump completed on 2023-08-16  9:01:33
