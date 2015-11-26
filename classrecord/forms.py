from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'id': "usernameinput", 'class': "form-control", 'placeholder': "Username"}),
                               max_length=200)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'id': "passwordinput", 'class': "form-control",
                                                                 'placeholder': "Password"}), max_length=200)


class SignupForm(forms.Form):
    usertrackerid = forms.IntegerField(widget=forms.TextInput(attrs={'class': "form-control"}))
    username = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "username_validate()", 'class': "form-control",
                                                             'placeholder': "Username"}),
                               max_length=200)
    firstname = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "firstname_validate()", 'class': "form-control", 'placeholder': "First Name"}),
                                 max_length=200)
    lastname = forms.CharField(widget=forms.TextInput(attrs={'onkeyup': "lastname_validate()", 'class': "form-control", 'placeholder': "Last Name"}),
                                max_length=200)
    email = forms.EmailField(widget=forms.EmailInput(attrs={'onkeyup': "email_validate()", 'type': "email",
                                                            'class': "form-control", 'placeholder': "Email"}),
                             max_length=200)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'onkeyup': "password_validate()", 'type': "password",
                                                                 'class': "form-control", 'placeholder': "Password"}), max_length=200)
    passwordconf = forms.CharField(widget=forms.PasswordInput(attrs={'onkeyup': "password_confirmation_validate()",
                                                                     'type': "password", 'class': "form-control",
                                                                     'placeholder': "Confirm password"}),
                                   max_length=200)

