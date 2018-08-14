-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: anvil
-- ------------------------------------------------------
-- Server version	5.6.40

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
-- Table structure for table `album_tags`
--

DROP TABLE IF EXISTS `album_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  `album_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr21k7qu0h31ufgdix5yyacu8m` (`album_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_tags`
--

LOCK TABLES `album_tags` WRITE;
/*!40000 ALTER TABLE `album_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `album_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `image_large_url` varchar(255) DEFAULT NULL,
  `image_medium_url` varchar(255) DEFAULT NULL,
  `image_small_url` varchar(255) DEFAULT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72gqyi6l1j674radjyitcm86f` (`artist_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_tags`
--

DROP TABLE IF EXISTS `artist_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artist_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKghtq5v62fgohjn5d6tq1ffjak` (`artist_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_tags`
--

LOCK TABLES `artist_tags` WRITE;
/*!40000 ALTER TABLE `artist_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `artist_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(255) DEFAULT NULL,
  `bio_content` varchar(255) DEFAULT NULL,
  `bio_summary` varchar(255) DEFAULT NULL,
  `image_large_url` varchar(255) DEFAULT NULL,
  `image_medium_url` varchar(255) DEFAULT NULL,
  `image_small_url` varchar(255) DEFAULT NULL,
  `mbid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_mr75wex5qomg8m4gnf7r8biuh` (`artist_name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Björk',NULL,NULL,'https://lastfm-img2.akamaized.net/i/u/300x300/1e45bbeae33f4968b4474fbbb3c6bc84.png','https://lastfm-img2.akamaized.net/i/u/64s/1e45bbeae33f4968b4474fbbb3c6bc84.png','https://lastfm-img2.akamaized.net/i/u/34s/1e45bbeae33f4968b4474fbbb3c6bc84.png','87c5dedd-371d-4a53-9f7f-80522fb7f3cb');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `friend_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqhlqyd2eb3nmk9hvrfqslw918` (`friend_id`),
  KEY `FKivlhvh7odettdl818ml67apb9` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,1,2),(2,2,1),(3,2,1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendations`
--

DROP TABLE IF EXISTS `recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recommendations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_recommended` datetime DEFAULT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  `recommender_user_public_info_id` bigint(20) DEFAULT NULL,
  `user_public_info_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1o1cpesfts70lhfaq5e4q3rmr` (`artist_id`),
  KEY `FKd21fv2vdw2meknx2svjn9smpx` (`recommender_user_public_info_id`),
  KEY `FKopk4ytgpeewoa4nsjgirqgkq2` (`user_public_info_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendations`
--

LOCK TABLES `recommendations` WRITE;
/*!40000 ALTER TABLE `recommendations` DISABLE KEYS */;
INSERT INTO `recommendations` VALUES (1,'2018-08-13 15:54:21',1,1,2);
/*!40000 ALTER TABLE `recommendations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `track_tags`
--

DROP TABLE IF EXISTS `track_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `track_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  `track_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd5w53fwpn77p6pnn6ev80g37k` (`track_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track_tags`
--

LOCK TABLES `track_tags` WRITE;
/*!40000 ALTER TABLE `track_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `track_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tracks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `track_name` varchar(255) DEFAULT NULL,
  `track_number` int(11) DEFAULT NULL,
  `album_id` bigint(20) DEFAULT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdcmijveo7n1lql01vav1u2jd2` (`album_id`),
  KEY `FKkiacd31n79ksp3mnq6owsbjiu` (`artist_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `is_guest` bit(1) DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asdf@asfd.com','\0','2018-08-14 12:09:07','$2a$10$EeWvC.fVDaATqaAnNdOHpOoLXoZ0j57uO1b8tChq9QORqZ/vxFBDO','user1'),(2,'asdf@asfd.com','\0','2018-08-13 16:04:11','$2a$10$zfaQHzJXzJD6scY6Hkm05ebKoara6cs5VldrsZNcdQIR4wrEpyJKK','user2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_artist_collection_entries`
--

DROP TABLE IF EXISTS `user_artist_collection_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_artist_collection_entries` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(255) DEFAULT NULL,
  `collection_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5erm2tnow9s2w2a5teth0mums` (`artist_name`),
  KEY `FKpwj1by04ag9527qylvi93rl55` (`collection_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_artist_collection_entries`
--

LOCK TABLES `user_artist_collection_entries` WRITE;
/*!40000 ALTER TABLE `user_artist_collection_entries` DISABLE KEYS */;
INSERT INTO `user_artist_collection_entries` VALUES (1,'Björk',1);
/*!40000 ALTER TABLE `user_artist_collection_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_artist_collections`
--

DROP TABLE IF EXISTS `user_artist_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_artist_collections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collection_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg1eqd50kfx7rh000f40hgpadu` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_artist_collections`
--

LOCK TABLES `user_artist_collections` WRITE;
/*!40000 ALTER TABLE `user_artist_collections` DISABLE KEYS */;
INSERT INTO `user_artist_collections` VALUES (1,'Rock Collection',1);
/*!40000 ALTER TABLE `user_artist_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn8pl63y4abe7n0ls6topbqjh2` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,NULL,NULL,'user1',1),(2,NULL,NULL,'user2',2);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-14 12:09:56
