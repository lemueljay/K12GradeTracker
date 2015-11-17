from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'name': "username", 'id': "usernameinput", 'type': "text",
                                                             'class': "form-control", 'placeholder': "Username"}),
                               max_length=200)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'name': "password", 'id': "passwordinput",
                                                                 'type': "password", 'class': "form-control",
                                                                 'placeholder': "Password"}), max_length=200)


class SignupForm(forms.Form):
    user_tracker_id = forms.IntegerField(widget=forms.TextInput(attrs={'name': "usertrackerid",
                                                                          'class': "form-control"}))
    username = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "username_validate()", 'name': "username",
                                                                'class': "form-control", 'placeholder': "Username"}))
    first_name = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "firstname_validate()", 'name': "firstname",
                                                               'class': "form-control", 'placeholder': "First Name"}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "lastname_validate()", 'name': "lastname",
                                                              'class': "form-control", 'placeholder': "Last Name"}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'onkeyup': "email_validate()", 'name': "email", 'type': "email",
                                                            'class': "form-control", 'placeholder': "Email"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'onkeyup': "password_validate()", 'name': "password",
                                                                 'type': "password", 'class': "form-control",
                                                                 'placeholder': "Password"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'onkeyup': "password_confirmation_validate()", 'name': "password",
                                                                 'type': "password", 'class': "form-control",
                                                                 'placeholder': "Password"}))