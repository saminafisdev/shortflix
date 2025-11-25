from django.contrib import admin
from .models import *

admin.site.register(Short)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Tag)

