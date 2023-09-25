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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `name_user` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(999) DEFAULT NULL,
  `ban_until` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1eda0b1f-e17d-417a-a3d8-2a3b9a741aed','phutran.jp13123','phuts2ran.jp1@gmail.com','$2b$10$vpEkzBhUww7J3mrlb.GuV.N4DA/RxpOm0FfsZnhhtCeSzySaM5ORG','0963700092','male','hna','2023-06-02 09:18:10','2023-06-15 07:24:35',0,'Trần Phú',NULL,NULL),('2bab0693-5d53-4d67-9e22-f9021ae91726','phutran.jp55','phutran.jp1daxx@gmail.com','$2b$10$UA9gX/YKXoNoQ2toTLY/keIU4W8vDPp.F77VJvgrMhNObcg4MnFNS','0963700092','female','han','2023-06-02 08:28:34','2023-06-15 06:51:58',0,'Trần Phú','https://storage.googleapis.com/md03-3efbf.appspot.com/avatars/1686811916498_457e7b73a9077caa9c35e0800?GoogleAccessId=firebase-adminsdk-x96fs%40md03-3efbf.iam.gserviceaccount.com&Expires=16446992400&Signature=tz3PlJ3caoEK9YKB6RY4Dq2%2BkQ9TUUJFgZ3pgtIzJojtOi8gNVUkq330GTcYe1JMOJTJdpXhp8YiFoEpMJl7ikoMI5tSaEbYI7jeQECHLMl5cM%2BLToxh%2F6wrI%2BxImPCx75d%2FQDTcY%2FXeVUMc00FOc8PIvFjPNsvwMv3J%2ByHJj4u7fEfp%2BrIncd8aRXExRRfJJr%2BgoO6%2BafTHsPL2005Kz3SImMMq3V%2FzhwUv576iQUYY2yegEe4zM%2B%2B65jJhIXidqa7zaASwxe83h1ToJy0nPE7%2Ff7gFCV5eXLK%2BAASXE5E6GNmfB5ahfBNHzTD4KjiSJUicMKZkkTuLU0Z8%2B8Mykw%3D%3D',NULL),('2e53114b-e9dc-4de2-922f-eb92e12dcfeb','phutran.jp16','phutrappn.jp1@gmail.com','$2b$10$VlnheuJpKrJgpm6iRdzwxeiJ.pvJ70EG7bEqKXLzSIzEj6IrSPjwe','0963700092','female','han','2023-06-02 08:26:31',NULL,0,'Trần Phú',NULL,NULL),('37e7d117-781c-4605-b427-a55b4fa6baa5','phutran111','phutran.jp1@gmail.com','$2b$10$iPW19jpnqjaSg6bjDgAmc.tsrSqg1C2ynofq8C4sFi.tukrSL7YC.','0963700092','other','43 Ngõ 53 Phố Ngọa Long','2023-05-31 07:19:12','2023-06-02 06:40:44',0,'Trần Phú',NULL,NULL),('446a163f-92b2-49cf-81be-d5ff0c8d279e','Motmy92@gmail.com','phsuts2ran.jp1@gmail.com','$2b$10$p1cbhadX3lWc9iqI8kI7LuIaCDDNW169kb/YspNU.fa6xlSyHHcm2','0963700092','male','hna','2023-06-02 09:19:22','2023-06-03 16:14:39',0,'Trần Phú',NULL,NULL),('4adb9635-b5f6-4680-99c7-118bbf53cb34','phutran1','phutran.jpllll1@gmail.com','$2b$10$9zWoY5XIpJwo8Ck08mk6/uKBj.5GXsRPpDEoqlQ9L0p0AHC49ISG.','0963700092','máa','đsad','2023-06-15 07:20:59','2023-06-19 17:49:53',0,'Trần Phú',NULL,NULL),('4af5155e-b9e5-4e6b-bdf4-7b2d8dc833f6','phutran.jp331','phutran.jp2111@gmail.com','$2b$10$fan/zPpifTUUBYfTJYAqP.9EkKCbkY3dME9y8unbWtTFb4UUetfrC','0963700092','female','han','2023-06-02 09:31:00',NULL,0,'Trần Phú',NULL,NULL),('55ba6bef-7480-49f4-9a3e-47f2173049a0','phutran.jp1h','phutranhhh.jp1@gmail.com','$2b$10$UnAwT4wCbd53Nk.UNoifkOG8LJXKk.ZMHJvwlXPTLkyi3NXRpQvY6','0963700092','female','hna','2023-06-15 03:59:10',NULL,0,'Trần Phú',NULL,NULL),('57560bb4-acae-4555-8529-f77eebb8dd3a','tokyoabcxyz','proVip@gmail.com','123456','123456789','Other','TOKYO','2023-06-21 02:22:15',NULL,0,'NEXT','https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1',NULL),('57cabbc1-6e10-4a8d-add9-b381546aecf3','phutran.jp1ddd','phus2tran.jp1@gmail.com','$2b$10$Y91X/znw4Gmhj3YGDwQ7auxjGjFDPi.P8B5HLQMHanmcEJH1aFHoe','0963700092','female','han','2023-06-02 08:31:34',NULL,0,'Trần Phú',NULL,NULL),('65e6abc0-b998-47f0-8afc-a4e26219d4d7','conheocon','12345@gmail.com','$2b$10$sq.y32S3aFOSugNY6IKCXemzXS6sbfJ1iXrEuygNlTLV5juXCSoeW','23659744','3D','Hà Nội','2023-05-31 07:38:31','2023-06-20 04:10:51',0,'abcxyzjqk','https://storage.googleapis.com/md03-3efbf.appspot.com/avatars/1686569207685_85b7cdacb1bb17f05fb635f00?GoogleAccessId=firebase-adminsdk-x96fs%40md03-3efbf.iam.gserviceaccount.com&Expires=16446992400&Signature=0ILQorM9bG0Vx3VLqOYNxeq94G6yKG%2B6i0x8jmikBsSVhtlOBG7IjlWzsY0UJAjRmz3q8iSSkGeKcNShCdAgwh6RGyHcwMksh74WUDb21wum9SZgN2V7Tm3JFbLT9LpyE3yLyIbt4mtbFeNTvokNB3nGz7mg9%2B4tGhfjsX%2B1x%2FeyfVV1QxziTPWeXrqhWfiwDkYCl%2FL3BRD3BlWR0LE6qc5pjGXCz%2FMKCh5dfon9tMiRzpOXp%2BEX%2B1gs7Rrh0r07u0uaRzfVB%2FWINy58a4zVazlJG5%2BEWz%2FsWr1re4deyjZoOjNLumr%2FC408pjPGXnSmOAKzOT9YCnQ1bBDhhLXvCw%3D%3D',NULL),('7edd2653-b369-42b1-8ff9-93ace28e3f43','phutran.jp123','phutrand.jp1@gmail.com','$2b$10$/JhqlQtjOX6uuoXkZ0aekOdc0t7RtN3BsNUg5FeTUsFJm4e.r8y1S','0963700092','female','kkkkkk','2023-06-02 08:25:04',NULL,0,'Trần Phú',NULL,NULL),('91d50a21-55e1-497b-86d2-67c6ae2f44fb','phutran.jp1sa','phutranad.jps1@gmail.com','$2b$10$q5R.KSvW1bkS/GL.e88VwuMsD6u479rypCTzhJKSbhY5xlwe90XOm','0963700092','male','hna','2023-06-02 16:11:31','2023-06-13 03:12:49',0,'Trần Phú',NULL,NULL),('94f447ab-4f5f-48da-a38d-09810995a379','admin_admin','adsasssasd@gmail.com','$2b$10$naj6dwlWA2qsgOlnTjR3D.p6JiLguEBKxJfCpanToVM0ZJtRgdNv.','223659485','other','âcbxzx','2023-06-21 07:22:50',NULL,0,'556633aaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL),('a5fb5af0-7550-43af-94e1-3b2a4b3254ce','phutran.j','phudddtran.jp1@gmail.com','$2b$10$0Dd1z8ZEYsTu/vb96V.DXe1qxn77Q5lNuwJz3zXK8SfjFwJp4MkEC','0963700092','female','han','2023-06-02 16:13:32',NULL,0,'Trần Phú',NULL,NULL),('ac659d83-7745-4315-a7ca-e5d92957b717','conheocon1','adssasssasd@gmail.com','$2b$10$lNcp1eyaEKg02LRwjg5FAOhzafa5tzT2agbYHUUTGwImczzpmHzX6','223659485','other','âcbxzx','2023-06-26 04:18:36',NULL,0,'556633aaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL),('daa742fb-e33d-40b1-9279-dd92ad57f487','conheocon22','phutran.jpaa15@gmail.com','$2b$10$SAHbHGoLW/ae0USu6g2omeyOlCG/crVY7.VyJT8eZx47rJBkRa3Me','0963700092','male','han','2023-06-02 07:34:18','2023-06-15 07:22:51',0,'Trần Phú','https://storage.googleapis.com/md03-3efbf.appspot.com/avatars/1686813769181_457e7b73a9077caa9c35e0801?GoogleAccessId=firebase-adminsdk-x96fs%40md03-3efbf.iam.gserviceaccount.com&Expires=16446992400&Signature=BU1T6IwsHLINNn%2FCYO9vYLqr0cnXvCBxiVT%2F7%2FdWu1FrI%2BaPFZu6uJx6Da0SnyPXfFQXBbuFjk%2BUtb2IS9%2F0If%2FpW1qNSTL0vlAh2X42n52wTIX5D0DhW%2FnFZmfH%2Bam2qb0xUens%2FW2cOqlJGat2iJUeo4YmxmeT8IIwBwyqt9l%2FDownRjZFZO%2FxBQGuL1Edc%2FXulpLv68eIOV4SmCYYcbNQ5KhrjH%2BpV%2BmVhnH%2FmRRm2Kfb%2BcBo7Ld%2Bi6xRpY7oA5jkzHmyN1EmcIufb29EKncEMDctM4Ir7Jks0%2Boq36mjLWuyXnQ3W3ge7LqP0BJ9gS28bPOYzIWrMF66HTYR3A%3D%3D',NULL),('f0c833a6-0b54-4172-acdb-f8d487da1229','admin','adsaasd@gmail.com','55555555','223659485','other','âcbxzx','2023-06-21 07:20:50',NULL,0,'556633','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL),('f3ed720f-85da-4dc0-ad00-aeae7aaa8fda','phutran.jp11122','phuadaatran.jp1@gmail.com','$2b$10$25SiX8CRUr62wEBh5dUxf.NXg6uf0m7kgplQPF2RDc0EKLJDlU53S','0963700092','female','han','2023-06-02 16:08:41','2023-06-12 08:55:51',0,'Trần Phú','https://storage.googleapis.com/md03-3efbf.appspot.com/avatars/1686560149367_72e5e7cc758ba2c522f1b5400?GoogleAccessId=firebase-adminsdk-x96fs%40md03-3efbf.iam.gserviceaccount.com&Expires=16446992400&Signature=skIAkTgDtD2tFWTVkYpPNi4GZhKodC1GfyR3cdNbzeKwzpG6Wh6ZeHLNVigPUcPoU%2BYM9a%2Fbni4wOvNE6p%2Fonfbij8WWpRxbJZtv9jcBsJ6OKIp70ZT0hckD5PEjOUZcZTuje7pCarZ7HQLjJwZyqCcaGQWcZfJFmZAIaVhRGFS1pKAEccXx7e2sZpcD2pPyDhu%2BmAjYC6dZWuWqsvx9WzFxna8FTr71OYz9B7LXilUwMRzyzbsTswsLaHJjMQ9VmUuc0wwrpq%2FlV9RiPCznzvfpq%2B7dWv9XaxKFHLw07KJ%2Bd7V1LbCHSxDzgwXLNF6DuFnlkxLWO3%2BMEkoZ1%2FryGg%3D%3D',NULL),('ff87a0a6-19d4-4293-9d56-1e85ba466b49','phutran','abcxyz@gmail.com','$2b$10$P8j7s1Lv9aCiL7wX9UPcauFkj5JpYah8FPrq1elGjPgvLG4nwcVAy','023666666','female','han','2023-05-31 06:54:54','2023-06-14 08:57:58',0,'abc','https://storage.googleapis.com/md03-3efbf.appspot.com/avatars/1686733076138_68fc8f0aa784803cfbb16c900?GoogleAccessId=firebase-adminsdk-x96fs%40md03-3efbf.iam.gserviceaccount.com&Expires=16446992400&Signature=yZ74zzUdOZB7VfBQfmgbEw6Qrr0DyStnbYyaBNFgmjK4wi5ZHDeqU0v86bDvSsQZ29I%2BGowBml%2FKiLjciZW3SUBob5K%2BBbltLgrv8t4gr%2FHa%2FjlLZdignI4%2BJFRjd0BPg82gZH3y2VwXlpyB21bsrJaHhlRgxLgTwdJ1vhATbF60XEcCiJIKN1xRvqcVNmIwF4xhl5xcSHOd%2BOmUBv4wdQc844UIJLdcGVP5SolIGAnL303Ob0k5YlsA4xX2OhU%2BR74M9NOJoUvSbMiBMF%2BmdWCLQ8D9zi8PfISnh8KCl0JiZ4hNpQXN73foCuUe7e7fgUyG5fNqo%2F1Y3hkuGLf%2FYA%3D%3D',NULL);
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

-- Dump completed on 2023-08-16  9:01:33
