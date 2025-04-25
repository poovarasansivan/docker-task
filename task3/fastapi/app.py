from flask import Flask, render_template, request, redirect
import redis

app = Flask(__name__)
r = redis.StrictRedis(host='redis', port=6379, decode_responses=True)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/vote', methods=['POST'])
def vote():
    option = request.form['option']
    print(f"[DEBUG] Received vote for: {option}", flush=True)
    r.incr(option)
    print(f"[DEBUG] New count for {option}: {r.get(option)}", flush=True)
    return redirect('/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
