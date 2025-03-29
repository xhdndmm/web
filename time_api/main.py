#[https://github.com/xhdndmm/web]
#[https://xhdndmm.cn/]
#python3.X

from flask import Flask, jsonify
from ntplib import NTPClient
from datetime import datetime, timezone

app = Flask(__name__)

@app.route('/time_api', methods=['GET'])
def get_ntp_time():
    try:
        client = NTPClient()
        response = client.request('time.windows.com')
        ntp_time = datetime.fromtimestamp(response.tx_time, tz=timezone.utc)
        return jsonify({"time_api": ntp_time.isoformat()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, threaded=True)