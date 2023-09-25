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
-- Table structure for table `column_in_board`
--

DROP TABLE IF EXISTS `column_in_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `column_in_board` (
  `column_id` varchar(255) NOT NULL,
  `board_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `order_id` int NOT NULL DEFAULT '1',
  `owner_column` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`column_id`),
  KEY `board_id` (`board_id`),
  KEY `column_in_board_ibfk_2` (`owner_column`),
  CONSTRAINT `column_in_board_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`) ON DELETE CASCADE,
  CONSTRAINT `column_in_board_ibfk_2` FOREIGN KEY (`owner_column`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `column_in_board`
--

LOCK TABLES `column_in_board` WRITE;
/*!40000 ALTER TABLE `column_in_board` DISABLE KEYS */;
INSERT INTO `column_in_board` VALUES ('1','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','Column1',1,'702d840b48'),('2','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','Coumn2',2,'b1b0a38ad4'),('3','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Colum3',3,'9e34cdfb7f'),('column-id-223fb6d0-3fd0-4bbf-909d-176e7365848d','board-id-e60679d4-c979-4601-8730-46ea4b547582','Alex tạo hộ column này cho người khác',2,'702d840b48'),('column-id-2c8dfd1e-bafd-41b3-a92c-d5a3870d5916','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Cột mới ',7,NULL),('column-id-36d88233-e266-407e-930a-1508894fab4b','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Mid-Center Column',2,NULL),('column-id-40bc9395-c07f-41c5-8449-d2cfcdcce222','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Column to nhất !!!!!',4,NULL),('column-id-41040e1a-eae3-4d82-9436-9253b7cc45d7','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Column ngày 15',9,'fe5b2169cd'),('column-id-422165a9-3ba5-4495-90fd-6f978af22dfa','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Cột cũ',8,NULL),('column-id-9900ab05-318f-4ae2-a8d2-af594ac2dd0f','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Cột sắp cũ',5,'fe5b2169cd'),('column-id-ab51b715-e7ec-4bdf-93f6-1e380fd93a9c','board-id-e60679d4-c979-4601-8730-46ea4b547582','My Column',1,'702d840b48'),('column-id-be4f571b-b6f8-468f-ae9c-f04cfbd1dff7','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','Complete !!',3,'702d840b48'),('column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Midnight Column',1,NULL),('column-id-d57593f6-a87b-448a-abd4-4aa4bc03a4e3','board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','Kayle\'s Column !',2,'702d840b48'),('column-id-d7590871-4fff-47b6-a917-df2fbc8467c5','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','Column nhỏ nhất',6,NULL),('column-id-f0370a51-770e-41dc-b00f-2754c36076ce','board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','Alex\'s Column !!!!!!',1,'702d840b48');
/*!40000 ALTER TABLE `column_in_board` ENABLE KEYS */;
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
