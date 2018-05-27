#!/bin/env python3
from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
import json

e = create_engine('sqlite:///./messages.db')

app = Flask(__name__)
api = Api(app)

class Messages(Resource):
    def get(self):
        conn = e.connect()
        query = conn.execute("select distinct data from messages")
        return_value = {'messages': [json.loads(i[0]) for i in query.cursor.fetchall()]}
        conn.execute("delete from messages")
        return return_value

class Message(Resource):
    def post(self, uid):
        parser = reqparse.RequestParser()
        args = parser.parse_args()
        conn = e.connect()

        query = conn.execute("select distinct data from messages")
        messages = [i[0] for i in query.cursor.fetchall()]
        for message in messages:
            message = json.loads(message)
            if(uid == message["uid"]):
                return "Message with uid {} already exists".format(uid), 400
        message = {
                "uid": uid,
                "firstName": request.form["firstName"],
                "lastName": request.form["lastName"],
                "status": request.form["status"],
                "description": request.form["description"],
                "tags": request.form["tags"]
        }
        print(json.dumps(message))
        conn.execute('insert into messages (data) values (?)', json.dumps(message))
        conn.close()
        return  "Message added with uid {}".format(uid), 200
      
api.add_resource(Messages, "/messages")
api.add_resource(Message, "/message/<string:uid>")
app.run(debug=True)
