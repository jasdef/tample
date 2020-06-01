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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behavior_log`
--

LOCK TABLES `behavior_log` WRITE;
/*!40000 ALTER TABLE `behavior_log` DISABLE KEYS */;
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
  `address` text CHARACTER SET utf8 DEFAULT NULL,
  `delegate` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `members` text CHARACTER SET utf8 DEFAULT NULL,
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
-- Table structure for table `light_history`
--

DROP TABLE IF EXISTS `light_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name_list` text DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `gan_year` int(11) DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL,
  `is_del` smallint(6) DEFAULT 0,
  `date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_history`
--

LOCK TABLES `light_history` WRITE;
/*!40000 ALTER TABLE `light_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_record`
--

DROP TABLE IF EXISTS `light_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `light_id` int(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `price` int(11) DEFAULT NULL,
  `note` text CHARACTER SET utf8 DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL,
  `gan_year` int(11) DEFAULT NULL,
  `history_id` int(11) DEFAULT NULL,
  `is_del` smallint(6) DEFAULT 0,
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
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_type`
--

LOCK TABLES `light_type` WRITE;
/*!40000 ALTER TABLE `light_type` DISABLE KEYS */;
INSERT INTO `light_type` VALUES (1,'制化',200),(2,'禳燈',100),(3,'太歲',300),(4,'祈福',100),(5,'元辰燈',600),(6,'玉皇斗-總斗主',25000),(8,'玉皇斗-小斗',2000),(9,'北斗-總斗主',16000),(10,'北斗-小斗',1000),(11,'南斗-總斗主',16000),(12,'南斗-小斗',1000),(13,'老君斗-總斗主',16000),(14,'老君斗-小斗',1000),(15,'觀音斗-總斗主',16000),(16,'觀音斗-小斗',1000),(18,'聖母斗-總斗主',16000),(19,'聖母斗-小斗',1000),(20,'恩主斗-總斗主',16000),(21,'恩主斗-小斗',1000),(22,'紫葳斗-總斗主',16000),(23,'紫葳斗-小斗',1000),(24,'城隍斗-總斗主',16000),(25,'城隍斗-小斗',1000),(26,'文昌斗-總斗主',16000),(27,'文昌斗-小斗',1000),(28,'財神斗-總斗主',16000),(29,'財神斗-小斗',1000),(30,'平安斗-總斗主',16000),(31,'平安斗-小斗',1000),(32,'香油',0),(33,'附屬燈',0),(34,'歲破',300);
/*!40000 ALTER TABLE `light_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-29 11:03:43
