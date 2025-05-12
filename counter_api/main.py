#[https://github.com/xhdndmm/web]
#[https://xhdndmm.cn/]
#python3.X

from flask import Flask, jsonify
import json
import os

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

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, threaded=True)
