# Building The Project

**Deployed Website** - http://aiqbal.pythonanywhere.com (Ensure http is being used, since https won’t work)

# Building The Project Locally

## Frontend: 
1. Open the terminal and clone the repository: https://github.com/4reebah/memory-math.git.
2. Navigate to the cloned project and go to dev/frontend. 
3. Once in the folder, run npm i.
4. Then, run npm start.
5. Go to http://localhost:3000 to interact with the front-end.

Back-end:
1. Open the terminal and clone the repository: https://github.com/4reebah/memory-math.git.
2. Navigate to the cloned project and go to the dev/backend.
3. Install Dependencies: pip3 install -r requirements.txt. If there is an error with installing any of the dependencies, try removing the version from the requirements.txt file. If that doesn't work, try removing the dependency from the requirements.txt file all together.
4. After installing, run python3 server.py.
5. Go to http://localhost:5000 to interact with the back-end.

Optional Steps: Use the Back-end with a Virtual Environment: 
1. Open the terminal and clone the repository:https://github.com/4reebah/memory-math.git.
2. Navigate to the cloned project and go to dev/backend.
3. Run python3 -m venv venv in the backend folder
4. Navigate to source venv/bin/activate.
5. Run the installation command: pip3 install -r requirements.txt. If there is an error with installing any of the dependencies, try removing the version from the requirements.txt file. If that doesn't work, try removing the dependency from the requirements.txt file all together.
6. After installing, run python3 server.py.
7. Go to http://localhost:5000 to interact with the back-end.
