from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)
CORS(app)
with open('db.yaml', 'r') as file:
    db = yaml.load(file, Loader=yaml.FullLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/')
def backend():
    return jsonify({
        'message' : 'Hello World!'
    })

@app.route('/users', methods=['GET'])
def get_users():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users")
        users = cur.fetchall()
        cur.close()
        # Convert time datatype to str
        users_data = []
        for user in users:
            user_data = list(user)
            user_data[7] = str(user_data[7])
            users_data.append(user_data)
        return jsonify(users_data)
    except Exception as e:
        # Handle exceptions appropriately
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)