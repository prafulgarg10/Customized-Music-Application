-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `ARTIST`
--

DROP TABLE IF EXISTS `ARTIST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ARTIST` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Bio` varchar(1000) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Name` char(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ARTIST`
--

LOCK TABLES `ARTIST` WRITE;
/*!40000 ALTER TABLE `ARTIST` DISABLE KEYS */;
INSERT INTO `ARTIST` VALUES (6,'Arijit Singh is an Indian singer and music composer. The recipient of several accolades including a National Film Award and seven Filmfare Awards, he has recorded songs in several Indian languages. He is also known for his humble personality and simple lifestyle.','1987-04-26','Arijit Singh'),(7,'Rahat Fateh Ali Khan is a Pakistani Singer, primarily of Qawwali, a form of Sufi devotional music. Khan is one of the biggest and highest paid singers in Pakistan. He is the nephew of Nusrat Fateh Ali Khan, son of Farrukh Fateh Ali Khan and grandson of Qawwali singer Fateh Ali Khan.','1974-12-09','Rahat Fateh Ali Khan'),(8,'Kedarnath Bhattacharya, professionally known as Kumar Sanu, is an Indian playback singer. He is known as the King of Melody in Bollywood. He is famous for singing thousands of Bollywood Hindi Super Hit songs. Also as one of the most successful playback singers of 90s era of Bollywood.','1957-10-20','Kumar Sanu'),(9,'Armaan Malik is an Indian singer, songwriter, record producer, voice-over, performer & actor. He is known for his singing in multiple languages, including Hindi, Telugu, English, Bengali, Kannada, Marathi, Tamil, Gujarati, Punjabi, Urdu and Malayalam.','1995-07-22','Armaan Malik'),(10,'Dhvani Bhanushali is an Indian pop singer. Born in Mumbai, she gained popularity with her single Vaaste in 2019 which has crossed 1.4 billion views on YouTube, making her the youngest Indian pop star to have the fastest 1 billion views on YouTube.','1998-03-22','Dhvani Bhanushali'),(11,'Palak Muchhal is an Indian singer and lyricist from Indore, Madhya Pradesh. She and her younger brother Palash Muchhal perform stage shows across India and abroad to raise funds for the poor children who need financial assistance for the medical treatment of heart diseases.','1992-03-30','Palak Muchhal'),(12,'Altaf Sayyed is a Music Director, Singer, and Music Composer from India. Born in Maharashtra, India. So far Altaf Sayyed has worked in the Bollywood entertainment industry and his artwork has been released in Hindi language movies.','1990-01-01','Altaf Sayyed'),(13,'Udit Narayan Jha is an Indian playback singer whose songs have been featured mainly in Hindi films. He has also sung in various other languages including Telugu, Kannada, Tamil, Bengali, Odia, Bhojpuri, Nepali, Malayalam, Assamese, Bagheli and Maithili. ','1955-12-01','Udit Narayan'),(14,'Alka Yagnik is an Indian playback singer who works predominantly in Hindi cinema. She has been described in the media as one of the most prominent and successful playback singers in Bollywood.','1966-03-20','Alka Yagnik'),(15,'Atif Aslam is a Pakistani playback singer, songwriter, composer, and actor. He has recorded many songs in both Pakistan and India','1983-03-12','Atif Aslam'),(16,'Neha Kakkar Singh, is an Indian playback singer. She is the younger sister of playback singers Tony Kakkar and Sonu Kakkar. She began performing at a very early age at religious events. In 2005, she participated in the second season of the singing reality show, Indian Idol. ','1988-06-06','Neha Kakkar');
/*!40000 ALTER TABLE `ARTIST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rate`
--

DROP TABLE IF EXISTS `Rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rate` (
  `User_Id` int NOT NULL,
  `Song_Id` int NOT NULL,
  `Rating` int DEFAULT NULL,
  PRIMARY KEY (`User_Id`,`Song_Id`),
  KEY `fk4` (`Song_Id`),
  CONSTRAINT `fk3` FOREIGN KEY (`User_Id`) REFERENCES `User` (`Id`),
  CONSTRAINT `fk4` FOREIGN KEY (`Song_Id`) REFERENCES `Song` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rate`
--

LOCK TABLES `Rate` WRITE;
/*!40000 ALTER TABLE `Rate` DISABLE KEYS */;
INSERT INTO `Rate` VALUES (13,4,5),(13,5,4),(13,6,5),(13,7,4),(13,8,5),(13,9,5),(13,10,5),(13,11,4),(13,12,3),(13,13,4),(13,14,4),(13,15,4);
/*!40000 ALTER TABLE `Rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sing`
--

DROP TABLE IF EXISTS `Sing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sing` (
  `Artist_Id` int NOT NULL,
  `Song_Id` int NOT NULL,
  PRIMARY KEY (`Artist_Id`,`Song_Id`),
  KEY `fk2` (`Song_Id`),
  CONSTRAINT `fk1` FOREIGN KEY (`Artist_Id`) REFERENCES `Artist` (`Id`),
  CONSTRAINT `fk2` FOREIGN KEY (`Song_Id`) REFERENCES `Song` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sing`
--

LOCK TABLES `Sing` WRITE;
/*!40000 ALTER TABLE `Sing` DISABLE KEYS */;
INSERT INTO `Sing` VALUES (6,4),(7,5),(8,6),(10,7),(11,8),(12,9),(13,10),(14,11),(6,12),(15,13),(16,14),(9,15);
/*!40000 ALTER TABLE `Sing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Song`
--

DROP TABLE IF EXISTS `Song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Song` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Cover` varchar(50) DEFAULT NULL,
  `DOR` date DEFAULT NULL,
  `Name` char(30) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Song`
--

LOCK TABLES `Song` WRITE;
/*!40000 ALTER TABLE `Song` DISABLE KEYS */;
INSERT INTO `Song` VALUES (4,'C:fakepathmuskurane.jpeg','2014-01-01','Muskurane Ki wajah Tum Ho'),(5,'C:fakepath tum jo aaye.jpeg','2010-01-01','Tum Jo Aaye'),(6,'C:fakepath rahmeinunse.jpeg','1994-01-02','Raah Mein Unse Mulaqat Ho Gayi'),(7,'C:fakepathVaaste.jpeg','2020-01-04','Vaaste'),(8,'C:fakepathkauntujhe.jpeg','2016-06-01','KAUN TUJHE'),(9,'C:fakepathnaino.jpeg','2018-01-06','Naino Ki Jo Baat'),(10,'C:fakepathdilbura.jpeg','2010-10-10','Ek Dilruba Hai'),(11,'C:fakepathzaratasveer.jpeg','1997-05-13','Meri Mehbooba'),(12,'C:fakepathterafitoor.jpeg','2018-11-12','Tera Fitoor'),(13,'C:fakepathmeinrang.jpeg','2013-01-12','Main Rang Sharbaton Ka'),(14,'C:fakepathdilbar.jpeg','2018-02-17','Dilbar'),(15,'C:fakepathboldo.jpeg','2018-01-01','Bol Do Na Zara');
/*!40000 ALTER TABLE `Song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(50) DEFAULT NULL,
  `Name` char(20) DEFAULT NULL,
  `Contact` varchar(50) DEFAULT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (13,'prafulgarg10@gmail.com','Praful Garg','9675793271','2023-05-14 10:31:31'),(17,'abc@gmail.com','Test','6','2023-05-14 13:25:25');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 18:38:13
