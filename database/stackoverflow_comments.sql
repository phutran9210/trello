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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `body` text NOT NULL,
  `author_id` varchar(255) NOT NULL,
  `question_id` varchar(255) NOT NULL,
  `answer_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `author_id` (`author_id`),
  KEY `question_id` (`question_id`),
  KEY `answer_id` (`answer_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`answer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'aaaaaaaaaaaaaa','65e6abc0-b998-47f0-8afc-a4e26219d4d7','2b60122b-6653-4952-90e3-c917c8769901',2,'2023-06-09 04:01:49',NULL),(2,'aaaaaaaaaaaaaa','65e6abc0-b998-47f0-8afc-a4e26219d4d7','2b60122b-6653-4952-90e3-c917c8769901',2,'2023-06-09 04:08:26',NULL),(3,'dấdas','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:58:11',NULL),(4,'dsadasd','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:58:14',NULL),(5,'abcxzx','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:58:23',NULL),(6,'wtf ?\n','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:58:29',NULL),(7,'đây là cmt','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:59:27',NULL),(8,'đây là cmt thứ 2','65e6abc0-b998-47f0-8afc-a4e26219d4d7','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',1,'2023-06-09 06:59:34',NULL),(9,'abc xyzu','ff87a0a6-19d4-4293-9d56-1e85ba466b49','2b60122b-6653-4952-90e3-c917c8769901',5,'2023-06-09 08:30:08',NULL),(10,'đúng','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',3,'2023-06-09 08:37:15',NULL),(11,'ờ','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',4,'2023-06-09 08:37:19',NULL),(12,'dấ','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',6,'2023-06-09 08:44:43',NULL),(13,'123','ff87a0a6-19d4-4293-9d56-1e85ba466b49','9db6b219-24a1-4cd2-aa6d-a5e094247cc0',7,'2023-06-09 08:54:14',NULL),(14,'helo\n','ff87a0a6-19d4-4293-9d56-1e85ba466b49','2b60122b-6653-4952-90e3-c917c8769901',10,'2023-06-11 08:05:36',NULL),(15,'xin chào','ff87a0a6-19d4-4293-9d56-1e85ba466b49','ee5a0e95-9bfc-4841-953e-da6a3a3f3893',11,'2023-06-12 10:27:03',NULL),(16,'123','daa742fb-e33d-40b1-9279-dd92ad57f487','64ce3fff-acb3-43f2-91ba-bbf1a6ae50e8',12,'2023-06-15 07:22:29',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16  9:01:34
