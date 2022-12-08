import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import dotenv_values
config = dotenv_values()


def send_email(username, useremail, department_code, course_number, section_number, course_name, old_status, new_status):
    mail_content = \
        f'''Hello {username},

The course status for {department_code} {course_number}-{section_number} {course_name} has changed from {old_status} to {new_status}.

You are receiving this email because you have added this course to your watchlist.

Albert Pro Max
'''

    # The mail addresses and password
    sender_address = config['SENDER_ADDRESS']
    sender_pass = config['SENDER_PASSWORD']
    receiver_address = useremail

    # Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    # The subject line
    message['Subject'] = 'Course Status Changes - Albert Pro Max'

    # The body and the attachments for the mail
    message.attach(MIMEText(mail_content, 'plain'))

    # Create SMTP session for sending the mail
    session = smtplib.SMTP('smtp.gmail.com', 587)  # use gmail with port
    session.starttls()  # enable security

    # login with mail_id and password
    session.login(sender_address, sender_pass)
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()
