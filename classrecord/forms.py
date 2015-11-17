from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'name': "username", 'id': "usernameinput", 'type': "text",
                                                             'class': "form-control", 'placeholder': "Username"}),
                               max_length=200)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'name': "password", 'id': "passwordinput",
                                                                 'type': "password", 'class': "form-control",
                                                                 'placeholder': "Password"}), max_length=200)