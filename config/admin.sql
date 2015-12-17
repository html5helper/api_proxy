SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `realname` varchar(255) DEFAULT NULL COMMENT '真实姓名',
  `crypt` varchar(255) NOT NULL COMMENT '散列方式',
  `status` int(11) NOT NULL COMMENT '状态',
  `registerTime` int(11) DEFAULT NULL COMMENT '注册时间',
  `lastLogin` int(11) DEFAULT NULL COMMENT '最后登录时间',
  `role` varchar(255) NOT NULL DEFAULT 'admin' COMMENT '管理员角色(可扩展）',
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '1为超级管理员 0为普通管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
