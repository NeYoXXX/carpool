CREATE DATABASE carpool;

CREATE TABLE IF NOT EXISTS `place`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(50) NOT NULL COMMENT '标题',
   `describe` VARCHAR(200) COMMENT '描述',
   `is_cancel` TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 关闭信息，1 开启', 
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `weixin_name` VARCHAR(50) NOT NULL COMMENT '微信名称',
   `weixin_head_portrait` VARCHAR(200) COMMENT '微信头像',
   `phone_number` VARCHAR(20) NOT NULL COMMENT '电话号码',
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 拼车信息表
CREATE TABLE IF NOT EXISTS `carpool_info`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `departure_time` DATETIME NOT NULL COMMENT '出发时间',
   `release_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
   `starting_point` VARCHAR(100) NOT NULL COMMENT '开始地点',
   `end` VARCHAR(100) NOT NULL COMMENT '终点',
   `waypoint` TEXT COMMENT '途经点',
   `info_type` TINYINT(1) DEFAULT 0 COMMENT '0 人找车，1 车找人',
   `phone_number` VARCHAR(20) NOT NULL COMMENT '联系电话',
   `is_cancel` TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 关闭信息，1 开启', 
   `release_user_id` INT COMMENT '发布人id',
   `place_id` INT COMMENT '地址信息id',
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户订阅拼车信息表
CREATE TABLE IF NOT EXISTS `subscription_user_relation`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `subscription_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '订阅时间',
   `is_cancel` TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 关闭信息，1 开启',
   `subscription_user_id` INT COMMENT '订阅用户id',
   `carpool_info_id` INT COMMENT '订阅拼车信息id',
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 根据拼车信息表 两用户直接聊天记录
CREATE TABLE IF NOT EXISTS `chat_record`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `chat_record` TEXT COMMENT '聊天内容',
   `time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '聊天信息时间',
   `carpool_info_id` INT COMMENT '拼车信息id',
   `re_sub_user_id` INT COMMENT '发送聊天内容用户id',
   `is_cancel` TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 关闭信息，1 开启',
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;








INSERT INTO carpool.place
(title, `describe`, is_cancel)
VALUES('燕郊 往返 酒仙桥', '无', 1);
INSERT INTO carpool.place
(title, `describe`, is_cancel)
VALUES('燕郊 往返 三元桥', '无', 1);
INSERT INTO carpool.place
(title, `describe`, is_cancel)
VALUES('燕郊 往返 望京', '无', 1);