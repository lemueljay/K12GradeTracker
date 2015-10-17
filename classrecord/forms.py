__author__ = 'Lemmeister'


from django import forms


class SignUpForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}), max_length=200)
    grading_system = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), max_length=20)


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), max_length=20)


class AddClassForm(forms.Form):
    class_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
    section = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=20)
