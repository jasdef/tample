-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: backend
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `autho` varchar(255) DEFAULT NULL,
  `lock_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','0beb4894d1609ab48e11eb855abd83b615821f3c95bfb66e3dd78f78480e4af32c859717f4322fd7cc0aeb180673eb112ec5552dc27ef472d0e582e67e5bacda','admin','admin','N'),(2,'test','0beb4894d1609ab48e11eb855abd83b615821f3c95bfb66e3dd78f78480e4af32c859717f4322fd7cc0aeb180673eb112ec5552dc27ef472d0e582e67e5bacda','test','staff','N'),(3,'test2','0beb4894d1609ab48e11eb855abd83b615821f3c95bfb66e3dd78f78480e4af32c859717f4322fd7cc0aeb180673eb112ec5552dc27ef472d0e582e67e5bacda','test2','accounting','Y'),(4,'test3','0beb4894d1609ab48e11eb855abd83b615821f3c95bfb66e3dd78f78480e4af32c859717f4322fd7cc0aeb180673eb112ec5552dc27ef472d0e582e67e5bacda','test3','staff','N');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `behavior_log`
--

DROP TABLE IF EXISTS `behavior_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `behavior_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `modifytime` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2702 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behavior_log`
--

LOCK TABLES `behavior_log` WRITE;
/*!40000 ALTER TABLE `behavior_log` DISABLE KEYS */;
INSERT INTO `behavior_log` VALUES (2675,1,'\"call AuthList\"','2020-04-04 20:54:29'),(2676,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-04 20:54:29'),(2677,1,'\"call LightList\"','2020-04-04 20:54:32'),(2678,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-04 20:54:32'),(2679,1,'\"call LightAdd\"','2020-04-04 20:54:35'),(2680,1,'\"call AuthList\"','2020-04-05 09:51:32'),(2681,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-05 09:51:32'),(2682,1,'\"call AuthAdd\"','2020-04-05 09:51:39'),(2683,1,'\"call LightList\"','2020-04-05 09:52:02'),(2684,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-05 09:52:03'),(2685,1,'\"call FamilyList\"','2020-04-05 09:52:22'),(2686,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-05 09:52:23'),(2687,1,'\"call FamilyAdd\"','2020-04-05 09:53:15'),(2688,1,'\"call FamilyList\"','2020-04-05 09:56:33'),(2689,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-05 09:56:33'),(2690,1,'\"call AuthEdit\"','2020-04-05 09:56:42'),(2691,1,'\"select * from account where id=1;\"','2020-04-05 09:56:42'),(2692,1,'\"call LightList\"','2020-04-05 09:56:46'),(2693,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-05 09:56:46'),(2694,1,'\"call LightAdd\"','2020-04-05 09:56:49'),(2695,1,'\"call AuthList\"','2020-04-15 11:16:23'),(2696,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-15 11:16:24'),(2697,1,'\"call LightList\"','2020-04-15 11:18:19'),(2698,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-15 11:18:20'),(2699,1,'\"call LightAdd\"','2020-04-15 11:18:21'),(2700,1,'\"call LightList\"','2020-04-15 11:20:29'),(2701,1,'\"select COUNT(*) as count from account;select * from account;\"','2020-04-15 11:20:29');
/*!40000 ALTER TABLE `behavior_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `family` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(150) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `delegate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_record`
--

DROP TABLE IF EXISTS `light_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `light_id` int(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `price` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_record`
--

LOCK TABLES `light_record` WRITE;
/*!40000 ALTER TABLE `light_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_type`
--

DROP TABLE IF EXISTS `light_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_type`
--

LOCK TABLES `light_type` WRITE;
/*!40000 ALTER TABLE `light_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `birthday_1` varchar(150) DEFAULT NULL,
  `birthday_2` varchar(150) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `zodiac` varchar(45) DEFAULT NULL,
  `gan_year` varchar(45) DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-15 13:47:30
