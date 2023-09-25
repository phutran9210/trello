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
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `card_id` varchar(255) NOT NULL,
  `board_id` varchar(255) DEFAULT NULL,
  `column_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `cover` varchar(512) DEFAULT NULL,
  `card_order` int NOT NULL DEFAULT '1',
  `owner_card` varchar(255) NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `board_id` (`board_id`),
  KEY `column_id` (`column_id`),
  KEY `cards_ibfk_3` (`owner_card`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`) ON DELETE CASCADE,
  CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`column_id`) REFERENCES `column_in_board` (`column_id`) ON DELETE CASCADE,
  CONSTRAINT `cards_ibfk_3` FOREIGN KEY (`owner_card`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES ('1','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','3','Hello','java','https://lvgames.net/lqm/wp-content/uploads/2023/06/hinh-anh-nen-drx-aatrox-hang-hieu-skin-lol-splash-art-lien-minh-huyen-thoai-6-6-lvgames.net_.jpg',1,'ee4648e9eb'),('2','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','3','Chào mọi người','Thời tiết tốt',NULL,2,'f8accc9685'),('3','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','3','World','C#','https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',1,'0df512332e'),('cardId-id-34a79b7a-e836-4c49-842f-9c71c6ccb9c7','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','3','Ngày xưa có 1 chú bò','Màu vàng',NULL,3,'fe5b2169cd'),('cardId-id-35eacc46-4dfe-49f4-9973-4bf75ed00e7b','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','Lại sắp cuối tuần rồi','Không biết lại phải làm gì ?',NULL,9,'fe5b2169cd'),('cardId-id-3b38963b-68f2-469f-a599-237e15305302','board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','column-id-f0370a51-770e-41dc-b00f-2754c36076ce','Not Modify!!!','No...............!',NULL,20,'702d840b48'),('cardId-id-40af6c42-e4e3-486f-8e8d-cffd08705fa3','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-36d88233-e266-407e-930a-1508894fab4b','How many ???','Too cheap ...........',NULL,11,'fe5b2169cd'),('cardId-id-4ad5a304-b931-47d5-ac72-4421c88c7312','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-36d88233-e266-407e-930a-1508894fab4b','Nói Tiếng Việt đi bọn mày ','zzz.............................!',NULL,14,'fe5b2169cd'),('cardId-id-4c8770a3-55f7-411b-ae3f-a7191db63ef6','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-9900ab05-318f-4ae2-a8d2-af594ac2dd0f','Hôm nay trời mưa','nothing....',NULL,22,'fe5b2169cd'),('cardId-id-5e2a8ac2-f711-4e2c-868d-2b37e9757d9a','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','Ngày mai đi xem phim','Ở CGV',NULL,5,'fe5b2169cd'),('cardId-id-66fdadd3-b821-4a12-8a8d-498339fb04d8','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-d7590871-4fff-47b6-a917-df2fbc8467c5','Nothing to Add !!!','uhm.....',NULL,15,'fe5b2169cd'),('cardId-id-747ccbb3-fe23-4afe-8bd2-c3ee3c9a9917','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-41040e1a-eae3-4d82-9436-9253b7cc45d7','Cột ngày 15','123456',NULL,25,'fe5b2169cd'),('cardId-id-796ebe15-19a3-49bb-ad4b-44a457c6f295','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','Hôm nay trời nắng','Nhưng tối lại mưa',NULL,4,'fe5b2169cd'),('cardId-id-7b148e22-2e9e-4272-9455-2e616c0478bc','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','2','Alex\'s column','Nothing to comment',NULL,19,'702d840b48'),('cardId-id-827ff771-d3a3-41b5-a329-a67b78a8eaab','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-41040e1a-eae3-4d82-9436-9253b7cc45d7','Card ngày 15','ko mô tả',NULL,23,'fe5b2169cd'),('cardId-id-88a2bf0f-822b-42f6-9d84-d764281bd59f','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','3','Con mèo màu vàng','Có tai màu đen',NULL,7,'fe5b2169cd'),('cardId-id-ac1863fc-747c-4b9c-b789-795a0e3af285','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','Đói quá !!!!','yeah......................',NULL,12,'fe5b2169cd'),('cardId-id-bc4352c1-9335-4f07-a699-52fe1c5431ba','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','3','Hôm nay tắc đường','Nên đến muộn',NULL,8,'fe5b2169cd'),('cardId-id-bdcce8d0-47bd-4c3c-9f78-7cbc9892ecc5','board-id-fd092a8c-416f-43b6-9b47-b948a12d9a70','1','Đây là card số 1','ko mô tả',NULL,18,'fe5b2169cd'),('cardId-id-cf089a7f-320e-40bc-9ab6-4305a1e404e1','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-422165a9-3ba5-4495-90fd-6f978af22dfa','cột mới','123',NULL,24,'fe5b2169cd'),('cardId-id-d185ce84-e976-47fc-acaa-cb423f458305','board-id-cbf99013-96bf-49d3-a6d8-04df1104d566','column-id-d57593f6-a87b-448a-abd4-4aa4bc03a4e3','Complete !!','Done.......',NULL,21,'702d840b48'),('cardId-id-d75b7e39-1abf-4d33-b844-b8b211b748af','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-36d88233-e266-407e-930a-1508894fab4b','Hello my friend !!!','Not comments',NULL,6,'fe5b2169cd'),('cardId-id-def65b92-51cd-403c-a20d-e1673fb76d84','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-36d88233-e266-407e-930a-1508894fab4b','How are U ????','Good !!!',NULL,10,'fe5b2169cd'),('cardId-id-e5e8af38-b4f6-4e5d-8ddc-e7df62bebda3','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-bfeddd77-af72-4556-84a0-e47ed98b878b','Tao cũng đói !!!!!','Vậy phải làm sao ?????',NULL,13,'fe5b2169cd'),('cardId-id-eed0bad4-2f15-4624-934c-fe66c543a0d0','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-40bc9395-c07f-41c5-8449-d2cfcdcce222','Lại lỗi rồi','wtf ?',NULL,17,'fe5b2169cd'),('cardId-id-f1d0eb75-7f08-4a3d-be80-71d8221e3466','board-id-ae8a03cb-9b76-4075-b18b-4c972da2ba51','column-id-2c8dfd1e-bafd-41b3-a92c-d5a3870d5916','Cột này có gì ko','????',NULL,16,'fe5b2169cd');
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
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
