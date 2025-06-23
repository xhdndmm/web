# 这里是xhdndmm.cn的源代码 以下内容为介绍部分
## 声明
**如果你想使用本仓库代码作为你的个人主页 请删去关于我的所有内容 谢谢**
## 网站部署方法
**注：以debian系linux系统为例**
### 部署
首先克隆存储库
```
git clone https://github.com/xhdndmm/web.git
```
然后安装依赖
```
sudo apt update
sudo apt install python3-pip gunicorn nginx
pip install -r requirements.txt
```
然后修改nginx配置文件（替换括号部分，已添加gzip和基础安全设置，此文件一般在/etc/nginx/nginx.conf）
```
user root;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    server_tokens off;  

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript text/html;

    limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;

    server {
        listen 80;
        listen [::]:80;
        server_name _;

        return 444;
    }

    server {
        listen 80;
        listen [::]:80;
        root （路径）;
        index index.html;

        server_name （域名） ;

        access_log （路径） combined buffer=16k;
        error_log （路径） warn;

        location / {
            limit_req zone=one burst=3 nodelay;
        }

        location /time_api {
            limit_req zone=one burst=3 nodelay;
            proxy_pass http://127.0.0.1:5000/time_api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /counter {
            limit_req zone=one burst=3 nodelay;
            proxy_pass http://127.0.0.1:5000/counter;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /counter/increment {
            limit_req zone=one burst=3 nodelay;
            proxy_pass http://127.0.0.1:5000/counter/increment;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

            location /server_status {
            limit_req zone=one burst=3 nodelay;
            proxy_pass http://127.0.0.1:5000/server_status;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}

```
进入网站根目录并运行以下命令
```
sh start.sh
```
你也可以自行配置systemd来实现开机自启