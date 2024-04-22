from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from flask_bcrypt import bcrypt
import yaml

app = Flask(__name__)
CORS(app)

config = {
  'user': 'root',
  'password': "",
  'host': 'localhost',
  'database': 'memory-math',
}

@app.route('/')
def backend():
    return jsonify({
        'message' : 'Hello World!'
    })

@app.route('/users', methods=['GET'])
def get_users():
    try:
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM Users")
      users = cursor.fetchall()
      users_data = []
      for user in users:
          user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
          users_data.append(user)
      connection.close()
      return jsonify(users)
    except Exception as e:
      return jsonify({'error': str(e)})

@app.route('/login', methods=['POST'])
def login():
    try: 
        connection = mysql.connector.connect(**config)
        cur = connection.cursor()

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user = cur.fetchone()
       
        cur.close()
        connection.close()
        if user and bcrypt.checkpw(password.encode('utf-8'), user[6].encode('utf-8')):
            return jsonify({'success': True, 'message': 'Login successful', 'id': user[0], 'admin': user[1], 'username': user[5]})
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password.'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/add_user', methods=['POST'])
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

    cur.execute("INSERT INTO USERS (FIRST_NAME, LAST_NAME, USER_ADMIN, USERNAME, EMAIL, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (first_name, last_name, 0, username, email, password_hash, '00:00:00', 0))
    connection.commit()
    cur.close()
    connection.close()

    return jsonify({ 'message': 'User Added Successfully: ' + username, 'status': 200 })
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/check/username', methods=['POST'])
def check_username():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()
    data = request.get_json()

    username = data.get('username')
    cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
    result = cur.fetchone()
    
    cur.close()
   
    if result:
      return jsonify({'success': True, 'message': 'Username Exists: ' + username})
    else:
      return jsonify({'success': False, 'message': 'Username Not Found: ' + username})
  except Exception as e:
    return jsonify({'error': str(e)})
  
@app.route('/check/email', methods=['POST'])
def check_email():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor()
    data = request.get_json()
    
    email = data.get('email')
    cur.execute("SELECT * FROM Users WHERE email = %s", (email,))
    result = cur.fetchone()
    cur.close()
  
    if result:
      return jsonify({'success': True, 'message': 'Email Exists: ' + email})
    else:
      return jsonify({'success': False, 'message': 'Email Not Found: ' + email})
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/users/nonadmin', methods=['GET'])
def get_non_admin_users():
    try:
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM Users WHERE USER_ADMIN = 0")
      users = cursor.fetchall()
      users_data = []
      for user in users:
          user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
          users_data.append(user)
      connection.close()
      return jsonify(users)
    except Exception as e:
      return jsonify({'error': str(e)})

@app.route('/users/admin', methods=['GET'])
def get_admin_users():
    try:
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM Users WHERE USER_ADMIN = 1")
      users = cursor.fetchall()
      users_data = []
      for user in users:
          user['SHORTEST_TIME'] = user['SHORTEST_TIME'].total_seconds()
          users_data.append(user)
      connection.close()
      return jsonify(users)
    except Exception as e:
      return jsonify({'error': str(e)})

@app.route('/deleteUser', methods=['POST'])
def delete_user():
  try:
    connection = mysql.connector.connect(**config)
    cur = connection.cursor(dictionary=True)
    body = request.get_json()

    user_id = body.get('user_id')

    cur.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cur.fetchone()

    if user:
      cur.execute("DELETE FROM Users WHERE user_id = %s", (user_id,))
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

if __name__ == '__main__':
    app.run(debug=True)