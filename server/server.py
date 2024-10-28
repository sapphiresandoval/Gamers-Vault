from flask_app import app
from flask_app.controllers import users, games
# Controllers go here,
# If you add a new controller file you have to also add it here
# This is where Flask's thought process starts.  The request enters here, then goes to the controller above which has a matching route

if __name__=="__main__":
    app.run(debug=True)
    # app.run(debug=True, port=5500)
    # Above is how you can change the port number.

    # Debug needs to be set to False when deployed. This will avoid giving out sensitive information that coud be used to hack your server