# python3.X
# [https://github.com/xhdndmm/web]
# [https://xhdndmm.cn/]

from flask import Flask, jsonify, request
from datetime import datetime
import json
import os
import psutil

app = Flask(__name__)

COUNTER_FILE = "counter.json"

def load_counter():
    if os.path.exists(COUNTER_FILE):
        with open(COUNTER_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return {"count": 0}

def save_counter(counter):
    with open(COUNTER_FILE, "w", encoding="utf-8") as file:
        json.dump(counter, file)

counter = load_counter()

@app.route('/counter', methods=['GET'])
def get_counter():
    return jsonify(counter)

@app.route('/counter/increment', methods=['POST'])
def increment_counter():
    counter["count"] += 1
    save_counter(counter)
    return jsonify(counter)

@app.route('/time_api', methods=['GET'])
def get_local_time():
    try:
        local_time = datetime.now().astimezone()
        return jsonify({"time_api": local_time.isoformat()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/server_status', methods=['GET'])
def server_status():
    cpu_percent = psutil.cpu_percent(interval=0.5)
    mem = psutil.virtual_memory()
    mem_total = mem.total
    mem_used = mem.used
    mem_percent = mem.percent
    return jsonify({
        "cpu_percent": cpu_percent,
        "memory_total": mem_total,
        "memory_used": mem_used,
        "memory_percent": mem_percent
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, threaded=True)