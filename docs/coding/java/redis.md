
# redis


## 安装redis 
window11 安装redis5


https://github.com/tporadowski/redis/releases

https://github.com/tporadowski/redis/releases/download/v5.0.14.1/Redis-x64-5.0.14.1.msi


## ridis.io和redis6
https://redis.io/

https://www.redis.net.cn/

yum install gcc-c++

gcc -v

/home/sofeware

tar
cd and make
make install PREFIX=/usr/local/redis


redis.conf
```
# bind 127.0.0.1 -::1

bind 0.0.0.0

# daemonize  no

deamonize yes

# 密码设置
requirepass  密码
# 日志设置
logfile ""
logfile "/usr/local/redis/redis.log"

./redis-server redis.conf

./redis-cli

AUTH 密码

6379

```


