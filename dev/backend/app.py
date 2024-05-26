import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import mysql.connector
from flask_bcrypt import bcrypt
import yaml
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=['http://aiqbal.pythonanywhere.com', 'http://localhost:3000'])

# For local build
config = {
  'user': 'root',
  'password': "",
  'host': 'localhost',
  'database': 'memory_math',
}

# For the deployment
# config = {
#   'user': 'aiqbal',
#   'password': 'cs161proj',
#   'host': 'aiqbal.mysql.pythonanywhere-services.com',
#   'port': '3306',
#   'database': 'aiqbal$default',
# }

def create_schema():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password=""
    )
    cursor = connection.cursor()
    cursor.execute("CREATE SCHEMA IF NOT EXISTS memory_math;")
    connection.commit()  
    cursor.close()

def run_sql_script(filename):
    """
    Run SQL script.
    """
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()
        with open(filename, 'r') as f: 
            sql_script = f.read()
            print(sql_script)
            cursor.execute(sql_script, multi=True)
            connection.commit()
        cursor.close()
        connection.close()

    except mysql.connector.Error as error:
        print("Error running SQL script:", error)

# Serve static files from the build directory
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
   return send_from_directory('../frontend/build', 'index.html')

@app.route('/api')
def backend():
    return jsonify({
        'message' : 'Hello World!'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM USERS")
      users = cursor.fetchall()
      users_data = []
      for user in users:
          user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
          users_data.append(user)
      connection.close()
      return jsonify(users)
    except Exception as e:
      return jsonify({'error': str(e)})

@app.route('/api/login', methods=['POST'])
def login():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cur.execute("SELECT * FROM USERS WHERE username = %s", (username,))
    user = cur.fetchone()

    cur.close()
    connection.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user[6].encode('utf-8')):
      return jsonify({'success': True, 'message': 'Login successful', 'id': user[0], 'admin': user[3], 'username': user[5]})
    else:
      return jsonify({'success': False, 'message': 'Invalid username or password.'})
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/add_user', methods=['POST'])
def add_user():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor(dictionary=True)
    body = request.get_json()

    first_name = body.get('firstName')
    last_name = body.get('lastName')
    username = body.get('username')
    email = body.get('email')
    password = body.get('password')

    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    cur.execute("INSERT INTO USERS (FIRST_NAME, LAST_NAME, USER_ADMIN, USERNAME, EMAIL, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (first_name, last_name, 0, username, email, password_hash, '00:00:00', -1))
    connection.commit()
    cur.close()
    connection.close()

    return jsonify({ 'message': 'User Added Successfully: ' + username, 'status': 200 })
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/check/username', methods=['POST'])
def check_username():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()
    data = request.get_json()

    username = data.get('username')
    cur.execute("SELECT * FROM USERS WHERE username = %s", (username,))
    result = cur.fetchone()

    cur.close()

    if result:
      return jsonify({'success': True, 'message': 'Username Exists: ' + username})
    else:
      return jsonify({'success': False, 'message': 'Username Not Found: ' + username})
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/check/email', methods=['POST'])
def check_email():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()
    data = request.get_json()

    email = data.get('email')
    cur.execute("SELECT * FROM USERS WHERE email = %s", (email,))
    result = cur.fetchone()
    cur.close()

    if result:
      return jsonify({'success': True, 'message': 'Email Exists: ' + email})
    else:
      return jsonify({'success': False, 'message': 'Email Not Found: ' + email})
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/users/nonadmin', methods=['GET'])
def get_non_admin_users():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM USERS WHERE USER_ADMIN = 0")
    users = cursor.fetchall()
    users_data = []
    for user in users:
      user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
      users_data.append(user)
    connection.close()
    return jsonify(users)
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/users/admin', methods=['GET'])
def get_admin_users():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM USERS WHERE USER_ADMIN = 1")
    users = cursor.fetchall()
    users_data = []
    for user in users:
      user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
      users_data.append(user)
    connection.close()
    return jsonify(users)
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/deleteUser', methods=['POST'])
def delete_user():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor(dictionary=True)
    body = request.get_json()

    user_id = body.get('user_id')

    cur.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
    user = cur.fetchone()

    if user:
      cur.execute("DELETE FROM USERS WHERE user_id = %s", (user_id,))
      connection.commit()
      cur.close()
      connection.close()

      return jsonify({'success': True, 'message': f'User with ID {user_id} deleted successfully.'})
    else:
      cur.close()
      connection.close()
      return jsonify({'success': False, 'message': f'User with ID {user_id} does not exist.'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/user_data', methods=['GET'])
def get_user():
  try:
    user_id = request.args.get('userId')
    connection = mysql.connector.connect(**config)
    cur = connection.cursor(dictionary=True)
    cur.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
    user = cur.fetchone()
    user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
    connection.close()
    return jsonify(user)
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/update_user_data', methods=['POST'])
def update_user_data():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()
    data = request.get_json()

    user_id = data.get('userId')
    time = data.get('time')
    mistakes = data.get('mistakes')

    print(time)

    cur.execute("SELECT SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES FROM USERS WHERE user_id = %s", (user_id,))
    result = cur.fetchone()

    print(result)

    if result:
      db_time, db_mistakes = result

      if time is not None:
        new_time_hours = time // 3600
        new_time_minutes = (time % 3600) // 60
        new_time_seconds = time % 60
        new_time_str = "{:02d}:{:02d}:{:02d}".format(new_time_hours, new_time_minutes, new_time_seconds)

      if time and (db_time.total_seconds() == 0 or time < db_time.total_seconds()):
        cur.execute("UPDATE USERS SET SHORTEST_TIME = %s WHERE user_id = %s", (new_time_str, user_id))

      if mistakes is not None and (db_mistakes == -1 or mistakes < db_mistakes):
        cur.execute("UPDATE USERS SET LOWEST_NUMBER_OF_MISTAKES = %s WHERE user_id = %s", (mistakes, user_id))
    else:
      return jsonify({'error': 'User not found'})

    connection.commit()
    cur.close()
    connection.close()
    return jsonify({'success': True})

  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/api/update_admin', methods=['POST'])
def update_admin():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor(dictionary=True)
    body = request.get_json()

    user_id = body.get('user_id')

    cur.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
    result = cur.fetchone()

    if result:
      cur.execute("UPDATE USERS SET USER_ADMIN = %s WHERE user_id = %s", (1, user_id))
      connection.commit()
    else:
      return jsonify({'error': 'User not found'})
    cur.close()
    connection.close()
    return jsonify({'success': True, 'message': f'User with ID {user_id} changed to admin status successfully.'})

  except Exception as e:
    return jsonify({'error': str(e)})

if __name__ == "__main__":
  create_schema()
  # Run SQL scripts
  scripts_path = os.path.join(os.path.dirname(__file__), 'sqldb')
  for filename in os.listdir(scripts_path):
    if filename.endswith('.sql'):
        script_file = os.path.join(scripts_path, filename)
        run_sql_script(script_file)
  
  # Start Flask application
  app.run(debug=True, host='0.0.0.0', port=5000)