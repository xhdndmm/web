#[https://github.com/xhdndmm/web]
#[https://xhdndmm.cn/]
#python3.X
from flask import Flask, jsonify
import psutil

app = Flask(__name__)

@app.route('/server_status')
def server_status():
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()
    memory_usage = memory_info.percent

    return jsonify({
        'cpu_usage': cpu_usage,
        'memory_usage': memory_usage
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
