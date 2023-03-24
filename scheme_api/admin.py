from django.contrib import admin
from .models import Scheme,Image,Passage,Document,Video ,ImageBox

class ImageTable(admin.TabularInline):
    model = Image
class PassageTable(admin.TabularInline):
    model = Passage
class DocumentTable(admin.TabularInline):
    model = Document
class VideoTable(admin.TabularInline):
    model = Video

class SchemeAdmin(admin.ModelAdmin):
    readonly_fields = ['time_started','time_completed']
    list_display = ('course','topic','date_created')
    inlines = [ImageTable,PassageTable,DocumentTable,VideoTable]
    class Meta:
        model = Scheme


admin.site.register(Scheme, SchemeAdmin)
admin.site.register(Image)
admin.site.register(Passage)
admin.site.register(Document)
admin.site.register(Video)



admin.site.register(ImageBox)