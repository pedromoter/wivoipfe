from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

app = Flask(__name__)

account_sid = 'AC5645e0814a917559321cc760734e2807'
auth_token = 'a9dbdb207a1075eb4b82ba9e8763c9a8'
client = Client(account_sid, auth_token)

def makeCall(origin):
    call = client.calls.create(
        twiml='<Response><Say>Ahoy, World!</Say></Response>',
        to=origin,
        from_='+12054305793'
        )
    print(call)

@app.route("/answer", methods=['POST'])
def answer_call():
    origin = request.form['From']
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("I will be calling soon")
    makeCall(origin)
    return str(resp)




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port)
