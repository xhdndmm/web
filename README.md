# 本仓库是 [https://xhdndmm.net/]() 的源代码

## 项目结构
```
.
├── api
│   └── main.py
├── data
│   ├── aos.css
│   ├── aos.js
│   ├── autoload.js
│   ├── index.css
│   ├── index.js
│   ├── logo.jpg
│   └── particles.min.js
├── favicon.ico
├── index.html
├── LICENSE
├── LICENSE-CODE
├── README.md
├── requirements.txt
├── robots.txt
├── sitemap.xml
└── start.sh

3 directories, 17 files
```
- `aos.js`、`aos.css`来自[https://github.com/michalsnik/aos]()
- `autoload.js`来自[https://github.com/stevenjoezhang/live2d-widget]()
- `particles.min.js`来自[https://github.com/VincentGarreau/particles.js]()

## 部署方法
- 注：以debian系linux系统为例
首先克隆存储库
```
git clone https://github.com/xhdndmm/web.git
```
然后安装依赖
```
cd /path/to/web
sudo apt update
sudo apt install python3-pip gunicorn nginx
pip install -r requirements.txt
```
然后修改nginx配置文件（模板已添加gzip和基础安全设置，可根据需要修改，此文件一般在`/etc/nginx/nginx.conf`）
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
        root /path/to/web ;
        index index.html;

        server_name example.com ;

        access_log /path/to/log combined buffer=16k;
        error_log /path/to/log warn;

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
进入网站根目录并运行以下命令以开启后端
```shell
sh start.sh
```
你也可以自行配置systemd等来实现开机自启

## 协议
### 内容许可
本仓库中的**内容部分**（包括但不限于）：

- `index.html` 中的 `meta`、`title`、`a`、`h1`、`h2`、`p` 标签内的文本内容  
- `logo.png`
- `favicon.ico`
- `sitemap.xml`

均采用 [CC BY 4.0](./LICENSE) 协议进行许可。  
使用上述内容时，需遵守 CC BY 4.0 的署名、标明修改及附带许可证链接等要求。

### 代码许可
除上述内容外，本仓库中的**其余所有文件**均采用  
[MIT](./LICENSE-CODE) 协议进行许可。

### 使用说明
如果你希望将本仓库的代码用于你自己的个人主页，  
请在使用前**删除所有受 CC BY 4.0 许可的内容文件或内容部分**，  
并自行替换为你的原创内容。