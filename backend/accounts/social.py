import re

USER_FIELDS = ['name', 'email'] 


def allowed_email(email):
    return re.match('.*@acme\.com', email) or \
        re.match('.*@acme\.net', email)


def create_user(strategy, details, user=None, *args, **kwargs):
    #print(details)
    #print(kwargs)
    if user:
        return {'is_new': False}

    fields = {'email': details.get('email'), 'name': details.get('fullname')}

    if not fields:
        return

    return {
        'is_new': True,
        'user': strategy.create_user(**fields)
    }
