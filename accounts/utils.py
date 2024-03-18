import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import User, OneTimePassword

def generateOtp():
    otp=''
    for i in range(6):
        t=random.randint(1, 9)
        otp+=str(t)

    return otp

def send_code_to_user(email):
    Subject="one time passcode for Email verification"
    otp_code=generateOtp()
    user=User.objects.get(email=email)
    current_site='myAuth.com'
    emial_body=f'Hi {user.first_name} thanks for signin up on {current_site} please verify emial with the one time OTP {otp_code}'
    from_email=settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, code=otp_code)
    d_email=EmailMessage(subject=Subject, body=emial_body, from_email=from_email)
    d_email.send(fail_silently=True)
