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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `body` text NOT NULL,
  `author_id` varchar(255) NOT NULL,
  `parent_question_id` varchar(255) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`answer_id`),
  KEY `author_id` (`author_id`),
  KEY `parent_question_id` (`parent_question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`parent_question_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'<p>Đây là Answer đầu tiên</p>','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-08 08:57:11',NULL),(2,'<p>đây là answer thứ 2</p>','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-08 08:58:53',NULL),(3,'<p>tao mệt quá</p>','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-08 09:03:07',NULL),(4,'<p>đâsasdasadda</p>','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-08 12:05:36',NULL),(5,'<p>đây là comt tétt</p>','65e6abc0-b998-47f0-8afc-a4e26219d4d7','2b60122b-6653-4952-90e3-c917c8769901','2023-06-09 04:31:01',NULL),(6,'<p>alo abc xyz mnv</p>','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-09 08:39:39',NULL),(7,'<p>12345698789</p>','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-09 08:45:06',NULL),(8,'<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-09 09:03:10',NULL),(9,'','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0','2023-06-09 09:05:02',NULL),(10,'<p>alo</p><p><br></p>','ff87a0a6-19d4-4293-9d56-1e85ba466b49','2b60122b-6653-4952-90e3-c917c8769901','2023-06-09 09:17:34',NULL),(11,'<p>hêlo</p>','ff87a0a6-19d4-4293-9d56-1e85ba466b49','ee5a0e95-9bfc-4841-953e-da6a3a3f3893','2023-06-12 10:26:52',NULL),(12,'<p>oddaya đây</p>','daa742fb-e33d-40b1-9279-dd92ad57f487','64ce3fff-acb3-43f2-91ba-bbf1a6ae50e8','2023-06-15 07:22:17',NULL);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
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
